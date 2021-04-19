# My Assets Kanban Server
My Assets App is an application to manage your assets. It performs standard CRUD actions based on RESTful concept.

This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Sequelize JS
* Vue JS
* JWT JS
* Bcrypt JS
* Axios JS



&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal Server Error)_
```
{
  "message": "<your message for 400>"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "<your message for 401>"
}
```


&nbsp;

## RESTful endpoints
---
---
---
# USER

### POST /user/register

> Get single asset as defined by the id provided

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
        "fullname": "<fullname to get insert into>",
        "email": "<email to get insert into>",
        "password": "<password to get insert into>",
}
```

_Response (201)_
```
    {
        "id": <given id by system>,
        "fullname": "<asset fullname>",
        "email": "<asset email>",
        "password": "<asset password>",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
    }
```

_Respone (401 - Bad Request)_
```
[
    {
        "message": "fullname cannot empty"
    },
    {
        "message": "email cannot empty"
    },
    {
        "message": "Password cannot empty"
    },
    {
        "message": "Email must be today"
    },
    {
        "message" : "Password must be more than 6 character"
    }
]
```

---
### POST /user/login

> Create new asset

_Request Header_
```
not needed
```

_Request Params_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<pasword to get insert into>"
}
```

_Response (200 - OK)_
```
 {
        "id": <given id by system>,
        "fullname": "<asset fullname>",
        "email": "<asset email>",
        "password": "<asset password>",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
    }
```


_Respone (400 - Bad Request)_
```
[
    {
        "message": "Eamil cannot empty"
    },
    {
        "message": "Password cannot empty"
    }
]
```


---
### POST /user/googlelogin

> Update an asset defined by the id provided

_Request Header_
```
{
  "googleToken": "<your access token>"
}
```

_Request Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (201 - CREATED)_
```
{
    "id": <given id by system>,
    "fullname": "<asset fullname>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2021-03-01T07:15:12.149Z",
    "updatedAt": "2021-03-01T07:15:12.149Z",
}
```

_Response (200 - OK)_
```
{
    "id": <given id by system>,
    "fullname": "<asset fullname>",
    "email": "<asset email>",
    "password": "<asset password>",
    "createdAt": "2021-03-01T07:15:12.149Z",
    "updatedAt": "2021-03-01T07:15:12.149Z",
}
```


# TASKS
---
### GET /tasks

> Get single asset as defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <given id by system>,
        "title": "<asset title>",
        "category": "<asset title>",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
    }
]
```

---
### POST /tasks

> Create new asset

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>"
}
```

_Response (201 - Created)_
```
{
        "id": <given id by system>,
        "title": "<asset title>",
        "category": "<asset title>",
        "createdAt": "2021-03-01T07:15:12.149Z",
        "updatedAt": "2021-03-01T07:15:12.149Z",
}
```


_Respone (401 - Bad Request)_
```
[
    {
        "message": "Title cannot empty"
    },
    {
        "message": "Category cannot empty"
    }
]
```


---
### PUT /tasks/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<asset title>",
  "category": "<asset category>",
  "createdAt": "2021-03-01T07:15:12.149Z",
  "updatedAt": "2021-03-01T07:15:12.149Z",
}
```

_Respone (401 - Bad Request)_
```
[
    {
        "message": "Title cannot empty"
    },
    {
        "message": "Category cannot empty"
    },
]
```


---
### PATCH /tasks/:id

> Update an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```


_Request Body_
```
{
  "status": "<status to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "id": <given id by system>,
  "title": "<asset title>",
  "category": "<asset category>",
  "createdAt": "2021-03-01T07:15:12.149Z",
  "updatedAt": "2021-03-01T07:15:12.149Z",
}
```

---
### DELETE /todos/:id

> Delete an asset defined by the id provided

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{
  "id": <given id by system>
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "todo successfully deleted"
}
```