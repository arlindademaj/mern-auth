# MERN Auth Template (JWT)

Starter MERN stack app with **JWT**, TypeScript, Express, MongoDB, React, Chakra UI, React Query, and **Resend** for emails. JWTs stored in secure HTTP-only cookies. Includes Postman collection for testing. Features: register, login, logout, profile, account verification, password reset, session management, frontend forms, and custom React hooks.

## Features

- Auth: register, login, logout, profile
- Email: account verification & password reset
- Sessions: get/remove sessions
- Frontend: login/register/reset password forms
- Custom React hooks for auth & app state

## API Architecture

- **Routes:** handle requests, forward to controllers
- **Controllers:** validate, call services, send responses
- **Services:** business logic, DB & external API calls
- **Models:** DB schema & utilities
- Error handling via `errorCatch()` and custom middleware

## Auth Flow

- On login, server generates **AccessToken** (15 min) & **RefreshToken** (30 days) in HTTP-only cookies
- AccessToken sent on requests for authentication
- RefreshToken used at `/refresh` to get a new AccessToken
- Frontend retries requests on AccessToken expiration, logs out if refresh fails
