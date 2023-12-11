## ShortLink Api

### Requirements
- Express.Js
- PostgreSQL
- Sequelize

### Installation
- Clone this repository
- Go to the backend folder
- Copy .env.example to .env
- Install dependencies
- Create database
- Run migration
- Run the app

## Api Endpoints
| Endpoint | HTTP | Description |
| -------- | ---- | ----------- |
| /v1/auth/login | POST | For Login |
| /v1/auth/register | POST | For New User Register |
| /v1/auth/logout | POST | For Logout
| /v1/link/create | POST | Create shortLink |
| /v1/link/all | GET | Get all shortlink |
| /v1/link//:id | GET | Access the orignal Link |
| /v1/link/:id/analytics | GET | Get Specific link Analytics |

## Specific json of each endpoint
### /v1/auth/login
```json
{
    "email": "email",
    "password": "password"
}
```
### /v1/auth/register
```json
{
    "name": "name",
    "email": "email",
    "password": "password"
}
```

#### /v1/link/create
```json
{
    "originalUrl": "link"
}
```
### /v1/link/:id
```json
{
    "linkId": "id"
}
```

### /v1/link/:id/analytics
```json
{
    "linkId": "id",
    "userId": "id"

}
```


## Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands:
```
$ npm install
$ node app.js or nodemon app.js
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
```
