import slugify from "slugify"

const transformText = (text: string): string => {
  return slugify(text, {
    lower: true,
    trim: true
  })
}

function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}


export { transformText, isEmptyObject }