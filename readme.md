# Vuejs Fastify Docker

In this repo I've created simple application using the technologies in the title. Backend is more boilerplate-like and using modular structure for extendibility.

## Installation & Run

1. Have a MySQL server running on your device
2. Create a database
3. Enter your database, user, password information to below parts
4. Follow Setup and next titles to complete

Connection string part names, change the parts you need:

```
mysql://[username]:[password]@[host]:[port]/[database_name]
```

Env name is `DATABASE_URL` and for local located at `backend/.env` for Docker located at `./docker-compose.yml`

Note: Keep the `host.docker.internal` value in docker, that way docker can connect the database on host.

### Setup

Run `npm install` in `backend` and `frontend`

On `backend` also run `prisma:migrate-dev`

Now you can either run on Docker or Local

### Local Run

Run `npm run dev` in `backend` and `frontend` separately

### Docker Run

With Docker installed run these at the base path

`docker-compose build`

`docker-compose up`

Frontend will be running at http://localhost:5300<br/>
Backend will be running at http://localhost:5500

## Information

### Database

To fill some category data to database

In backend run `npm run prisma:seed`

### Postman

Also on the base path there is a Postman collection file, you can import to check backend api's.
