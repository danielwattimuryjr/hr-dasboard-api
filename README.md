#### Bar Chart

<details>
 <summary><code>GET</code> <code><b>192.168.18.30:3000/api/charts/bar</b></code> </summary>

##### Responses

```json
{
  "status": 200,
  "success": true,
  "data": {
    "option": ["2024-08-01", "2024-08-02"],
    "series": [11, 8]
  }
}
```

</details>

#### Pie Chart

<details>
 <summary><code>GET</code> <code><b>192.168.18.30:3000/api/charts/pie</b></code> </summary>

##### Responses

```json
{
  "status": 200,
  "success": true,
  "data": {
    "weeklyHours": 19,
    "monthlyHours": 31
  }
}
```

</details>

#### Tasks

<details>
 <summary><code>POST</code> <code><b>192.168.18.30:3000/api/tasks</b></code> <code>(Add an array of tasks to a user)</code></summary>

##### Request

```json
{
  "data": [
    {
      "project": "Project A",
      "description": "Deskripsi A",
      "start": "2024-08-02 17:00:00",
      "end": "2024-08-02 18:00:00"
    },
    {
      "project": "Project B",
      "description": "Deskripsi B",
      "start": "2024-08-03 07:00:00",
      "end": "2024-08-03 17:00:00"
    }
  ]
}
```

##### Response

```json
{
  "status": 201,
  "success": true,
  "message": "Report created succesfully for user 1",
  "data": [
    {
      "id": 7,
      "project": "Project A",
      "description": "Deskripsi A",
      "user_id": 1,
      "start": "2024-08-02T09:00:00.000Z",
      "end": "2024-08-02T10:00:00.000Z",
      "created_at": "2024-08-15T00:27:47.497Z"
    },
    {
      "id": 8,
      "project": "Project B",
      "description": "Deskripsi B",
      "user_id": 1,
      "start": "2024-08-02T23:00:00.000Z",
      "end": "2024-08-03T09:00:00.000Z",
      "created_at": "2024-08-15T00:27:47.497Z"
    }
  ]
}
```

</details>

#### Authentication

<details>
 <summary><code>POST</code> <code><b>192.168.18.30:3000/api/auth</b></code> <code>(Send a login Request)</code></summary>

##### Request

```json
{
  "email": "daniel.wattimury@mogin.net",
  "password": "password"
}
```

##### Response

```json
{
  "status": 200,
  "success": true,
  "message": "Login Successfull",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImRhbmllbC53YXR0aW11cnlAbW9naW4ubmV0IiwiZnVsbF9uYW1lIjoiRGFuaWVsIFdhdHRpbXVyeSIsInVzZXJuYW1lIjoiZGFuaWVsLWF0LW1vZ2luIiwicm9sZV9uYW1lIjoiZnJvbnQtZW5kIiwiZGlzcGxheV9uYW1lIjoiRnJvbnQgRW5kIn0sImlhdCI6MTcyMzcxMDU5NywiZXhwIjoxNzIzNzE0MTk3fQ.NcDe8-71TKPtBw9tnGJ4_7jonvQ2xCodtm5if-s9Ku4"
}
```

</details>

<details>
 <summary><code>POST</code> <code><b>192.168.18.30:3000/api/auth/logout</b></code> <code>(Sign out)</code></summary>

##### Response

```json
{
  "status": 200,
  "success": true,
  "message": "Logout Successfull"
}
```

</details>

#### Employees

<details>
 <summary><code>GET</code> <code><b>192.168.18.30:3000/api/employees</b></code> <code>(Get employees data)</code></summary>

##### Parameters

| name   | type     | description                                                            |
| ------ | -------- | ---------------------------------------------------------------------- |
| search | optional | Search data based on the keyword provided (name, username, email, etc) |
| limit  | optional | Set a limit for the pagination. **Default is 10**                      |
| page   | optional | Indicate the current page for pagination                               |

##### Response

```json
{
  "status": 200,
  "success": true,
  "data": {
    "totalItems": 56,
    "employees": [
      {
        "id": 1,
        "email": "daniel.wattimury@mogin.net",
        "full_name": "Daniel Wattimury",
        "username": "daniel-at-mogin",
        "role_name": "front-end",
        "display_name": "Front End"
      },
      {
        "id": 6,
        "email": "yudha.arista@mogin.net",
        "full_name": "Ydha Arista",
        "username": "y",
        "role_name": "back-end",
        "display_name": "Back End"
      },
      {
        "id": 42,
        "email": "nanda@mogin.net",
        "full_name": "Ananda",
        "username": "nanda-at-mogin",
        "role_name": "mobile",
        "display_name": "Mobile"
      },
      {
        "id": 43,
        "email": "test@mogin.net",
        "full_name": "Test",
        "username": "test-at-mogin",
        "role_name": "front-end",
        "display_name": "Front End"
      },
      {
        "id": 44,
        "email": "test@mogin.nett",
        "full_name": "Test",
        "username": "test-at-mogin",
        "role_name": "front-end",
        "display_name": "Front End"
      },
      {
        "id": 45,
        "email": "new.user@mogin.net",
        "full_name": "New User",
        "username": "user-at-mogin",
        "role_name": "front-end",
        "display_name": "Front End"
      },
      {
        "id": 46,
        "email": "user1@example.com",
        "full_name": "User One",
        "username": "user1",
        "role_name": "front-end",
        "display_name": "Front End"
      },
      {
        "id": 47,
        "email": "user2@example.com",
        "full_name": "User Two",
        "username": "user2",
        "role_name": "back-end",
        "display_name": "Back End"
      },
      {
        "id": 48,
        "email": "user3@example.com",
        "full_name": "User Three",
        "username": "user3",
        "role_name": "mobile",
        "display_name": "Mobile"
      },
      {
        "id": 49,
        "email": "user4@example.com",
        "full_name": "User Four",
        "username": "user4",
        "role_name": "front-end",
        "display_name": "Front End"
      }
    ],
    "totalPages": 6,
    "currentPage": 1,
    "limit": 10,
    "search": null
  }
}
```

</details>

<details>
 <summary><code>POST</code> <code><b>192.168.18.30:3000/api/employees</b></code> <code>(Add new employee)</code></summary>

##### Request

```json
{
  "email": "new.user@mogin.net",
  "password": "password",
  "full_name": "New User",
  "username": "user-at-mogin",
  "role_id": 1
}
```

##### Response

```json
{
  "status": 201,
  "success": true,
  "message": "User is created successfully",
  "data": {
    "id": 45,
    "email": "new.user@mogin.net",
    "password": "password",
    "full_name": "New User",
    "username": "user-at-mogin",
    "role_id": 1,
    "profile_pic": null
  }
}
```

</details>

<details>
 <summary><code>PUT</code> <code><b>192.168.18.30:3000/api/employees/{user_id?}</b></code> <code>(Update An Employee)</code></summary>

##### Request

```json
{
  "email": "user2@example.com",
  "full_name": "User Two Edited",
  "username": "user2",
  "password": "password"
}
```

##### Response

```json
{
  "status": 200,
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 47,
    "email": "user2@example.com",
    "password": "password",
    "full_name": "User Two Edited",
    "username": "user2",
    "role_id": 2,
    "profile_pic": null
  }
}
```

</details>

<details>
 <summary><code>DELETE</code> <code><b>192.168.18.30:3000/api/employees/{user_id}</b></code> <code>(Delete an Employee)</code></summary>

##### Response

```json
{
  "status": 200,
  "success": true,
  "message": "User with id 47 has been deleted"
}
```

</details>

#### Absence

<details>
 <summary><code>GET</code> <code><b>192.168.18.30:3000/api/absences</b></code> <code>(Get absences data, grouped per user)</code></summary>

##### Response

```json
{
  "status": 200,
  "success": true,
  "data": [
    {
      "user_id": 126,
      "name": "User One",
      "absences": [
        {
          "date": "2024-08-01T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-02T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-03T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 127,
      "name": "User Two",
      "absences": [
        {
          "date": "2024-08-04T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-05T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-06T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 128,
      "name": "User Three",
      "absences": [
        {
          "date": "2024-08-07T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-08T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-09T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 129,
      "name": "User Four",
      "absences": [
        {
          "date": "2024-08-10T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-11T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-12T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 130,
      "name": "User Five",
      "absences": [
        {
          "date": "2024-08-13T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-14T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-15T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 131,
      "name": "User Six",
      "absences": [
        {
          "date": "2024-08-16T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-17T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-18T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 132,
      "name": "User Seven",
      "absences": [
        {
          "date": "2024-08-19T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-20T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-21T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 133,
      "name": "User Eight",
      "absences": [
        {
          "date": "2024-08-22T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-23T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-24T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 134,
      "name": "User Nine",
      "absences": [
        {
          "date": "2024-08-25T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-26T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-27T08:00:00",
          "type": "WFH"
        }
      ]
    },
    {
      "user_id": 135,
      "name": "User Ten",
      "absences": [
        {
          "date": "2024-08-28T08:00:00",
          "type": "AL"
        },
        {
          "date": "2024-08-29T08:00:00",
          "type": "SL"
        },
        {
          "date": "2024-08-30T08:00:00",
          "type": "WFH"
        }
      ]
    }
  ]
}
```

</details>

<details>
 <summary><code>POST</code> <code><b>192.168.18.30:3000/api/absences</b></code> <code>(Add new absences data for an employee)</code></summary>

##### Request

```json
{
  "user_id": 126,
  "date": "2024-08-10T08:00:00Z",
  "type": "AL"
}
```

##### Response

```json
{
  "status": 201,
  "success": true,
  "message": "Absence data has been created successfully",
  "data": {
    "id": 94,
    "user_id": 126,
    "date": "2024-08-10T00:00:00.000Z",
    "type": "AL"
  }
}
```

</details>
