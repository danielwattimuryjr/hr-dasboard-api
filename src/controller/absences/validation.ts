import AbsenceService from "../../services/absence-service";

class AbsenceValidation {
  static isDataExist = async <TRes>(fields: Record<string, any>) => {
    const result = await AbsenceService.GET<TRes>(fields);

    if (
      result?.rowCount !== undefined &&
      result?.rowCount !== null &&
      result?.rowCount > 0
    ) {
      // Data exist
      return result.rows;
    }

    // Data does not exist
    return false;
  };

  static validateAbsenceRequest = async (
    userId: number,
    date: Date,
    type: 'WFH' | 'AL' | 'SL'
  ) => {
    const requestDate = new Date(date)
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    const result = await AbsenceService.GET<{
      count: number;
      wfhCount: number;
      leavesCount: number;
    }>({
      fields: [
        `COUNT(*) AS count`,
        `SUM(CASE WHEN type = 'WFH' THEN 1 ELSE 0 END) AS wfhCount`,
        `SUM(CASE WHEN type IN('AL', 'SL') THEN 1 ELSE 0 END) AS leavesCount`
      ],
      conditions: {
        'user_id=$1': userId,
        "date >= date_trunc('day', $2::timestamp) AND date < date_trunc('day', $2::timestamp) + interval '1 day'": requestDate
      },
      groupBy: ['date']
    })

    const count = result?.rows.at(0)?.count
    const wfhCount = result?.rows.at(0)?.wfhCount
    const leavesCount = result?.rows.at(0)?.leavesCount

    if (count > 0) {
      return `You already applied ${type} on ${requestDate.toLocaleDateString(undefined, options).split('/').join('-')}`;
    }

    if (type === 'WFH' && wfhCount >= 3) {
      return `You have already reached the WFH limit for this week.`;
    }

    if (type === 'AL' || type === 'SL') {
      const yearlyLimitResult = await AbsenceService.GET<{
        count: number;
      }>({
        fields: [
          `COUNT(id)`,
        ],
        conditions: {
          'user_id=$1': userId,
          "a.date >= date_trunc('year', current_timestamp)": undefined,
          "a.date < date_trunc('day', current_timestamp) + interval '1 day'": undefined,
          "type IN ('AL', 'SL')": undefined
        },
        groupBy: ['date']
      })

      if (
        yearlyLimitResult?.rowCount !== undefined &&
        yearlyLimitResult?.rowCount !== null &&
        yearlyLimitResult?.rowCount >= 12
      ) {
        return `You have reached the annual limit of 12 AL and SL leaves.`;
      }
    }

    const dayOfWeek = requestDate.getDay();
    if ((dayOfWeek === 6) || (dayOfWeek === 0)) {
      return `You cannot take leaves at weekend`
    }

    return null
  }
}
export default AbsenceValidation