# MERN Auth Template (JWT)

Starter MERN stack app using **JWT**, TypeScript, Express, MongoDB, React, Chakra UI, React Query, and **Resend** for sending emails. JWTs are stored in secure HTTP-only cookies. Includes a Postman collection for API testing. Features include register, login, logout, profile, account verification, password reset, sending emails, session management, frontend forms, and custom React hooks for auth and app state.

## Features

- Authentication: register, login, logout, profile
- Email: account verification and password reset
- Sessions: get and remove sessions
- Frontend: login, register, reset password forms
- Custom React hooks to manage auth state and app data

## API Architecture

The API is built using routes, controllers, services, and models. Routes handle incoming requests and forward them to controllers. Controllers validate requests, call the appropriate service, and send responses. Services handle business logic, interact with the database and external services, and may call other services. Models define database schema and utilities. For simple GET or DELETE requests without business logic, controllers may interact directly with models.

## Error Handling

Controllers are wrapped with `errorCatch()` to ensure errors are caught and passed to the custom error handler middleware, which handles all errors occurring in the application.

## Authentication Flow

When a user logs in, the server generates two JWTs: AccessToken (short-lived, 15 minutes) and RefreshToken (long-lived, 30 days), both sent in secure HTTP-only cookies. The AccessToken is passed on every request to authenticate the user, while the RefreshToken is sent only to the `/refresh` endpoint to generate a new AccessToken. The frontend detects 401 AccessTokenExpired errors, requests a new AccessToken via `/refresh`, and retries the original request. If refresh fails, the user is logged out and redirected to the login page.
