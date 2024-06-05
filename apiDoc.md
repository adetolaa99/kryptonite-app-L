# Kryptonite App API Documentation

## Introduction

This API documentation provides a detailed explanation and usage of the endpoints for user registration, login, file upload services, and accessing the files uploaded. The Kryptonite app ensures secure registration and login, associates files uploaded with users, and allows image uploads only by an API key.
This documentation is useful for developers or individuals interested in integrating and testing the functionalities the app provides.

## Features

- **Registration and Authentication**

  - User Registration: Each user registers and gets sent a confirmation email.
  - 2FA Login: Each user gets sent an OTP after successful login.
  - OTP Verification: Each user verifies the OTP gotten and gets a token for certain activities in the app.

- **File Upload and Retrieval Service**
  - API Key: Each user has a unique API key which can be retrieved.
  - File Upload: Each user can upload images which is stored as Base64 strings.
  - File upload constraint: Only image files can be uploaded.
  - File Retrieval: Each user can retrieve a particular image or all images uploaded.

## Base URL

http://localhost:1000

## Endpoints

### Get the API Homepage

Returns a greeting message from the server once it's running

#### Request:

- **URL**: `/api`
- **Method**: `GET`
- **Headers**: None
- **Parameters**: None

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "message": "Hello from Kryptonite App API!"
  }
  ```

### Register a new user

A new user registers and a confirmation mail is sent to their e-mail address.

#### Request:

- **URL**: `/auth/register`
- **Method**: `POST`
- **Headers**: None
- **Parameters**: None
- **Request body**:
  ```json
  {
    "email": "donniedarko@gmail.com",
    "password": "bunny2862412!"
  }
  ```

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "message": "You've successfully registered, Please check your e-mail for confirmation."
  }
  ```

## User logs in

A user logs in after receiving the confirmation email.

#### Request:

- **URL**: `/auth/login`
- **Method**: `POST`
- **Headers**: None
- **Parameters**: None
- **Request body**:
  ```json
  {
    "email": "donniedarko@gmail.com",
    "password": "bunny2862412!"
  }
  ```

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "message": "An OTP has been sent to your e-mail"
  }
  ```

## User verifies OTP

A user verifies the OTP sent to his/her e-mail and receives an authentication token.

#### Request:

- **URL**: `/auth/verify-otp`
- **Method**: `POST`
- **Headers**: None
- **Parameters**: None
- **Request body**:
  ```json
  {
    "email": "donniedarko@gmail.com",
    "otp": "{otp}"
  }
  ```

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "token": "{token}"
  }
  ```

## User retrieves API key

A user retrieves his/her API key with the authentication token gotten upon successful OTP verification.

#### Request:

- **URL**: `/user/apikey`
- **Method**: `GET`
- **Headers**: `Authorization`: `Bearer {token}`
- **Parameters**: None
- **Request body**: None

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "apiKey": "{apiKey}"
  }
  ```

## User uploads an image file

A user uploads an image file with the api key retrieved.

#### Request:

- **URL**: `/file/upload`
- **Method**: `POST`
- **Headers**: `apiKey`: `{apiKey}`
- **Content-Type**: `multipart/form-data`
- **Parameters**: None
- **Request body**: `file`: The file to be uploaded.

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "message": "File uploaded successfully",
    "imageId": "{imageId}"
  }
  ```

## User retrieves an image

A user sends a request with the imageId in the URL and retrieves the image uploaded as a Base64 string.

#### Request:

- **URL**: `/access/images/:id`
- **Method**: `GET`
- **Headers**: None
- **Parameters**: None
- **Request body**: None

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:
  ```json
  {
    "base64": {base64}
  }
  ```

## User retrieves all images

A user retrieves all images uploaded as Base64 strings.

#### Request:

- **URL**: `/access/images`
- **Method**: `GET`
- **Headers**: None
- **Parameters**: None
- **Request body**: None

#### Response:

- **Status Code**: 200 OK
- **Content-Type**: text/plain
- **Body**:

```json
[
 {
   "base64": {base64}
 },
  {
   "base64": {base64}
 }
]
```

## Technology Stack Used

- **Node.js with Express.js**
- **MongoDB** for database storage
- **JWT** for user authentication
- **Bcrypt** for password hashing
- **Nodemailer** for sending e-mail to users
- **Redis** for OTP storage
- **Multer** for handling file uploads
- **Base64 Encoding** for image storage

## To setup and use the app:

1. **Clone the Repository**
2. **Install Dependencies by running the code below in the terminal:**
   ```sh
   npm install
   ```
3. **Set all Environment Variables below in a .env file:**

```
PORT
MONGO_DB_CONNECTION_URL
EMAIL
EMAIL_PASSWORD
JWT_SECRET
```

4. **Run the Server by running the code below in the terminal:**

```sh
  npm start
```
