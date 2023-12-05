# examReact23
ReactJS - October 2023

# Blog

Blog is application for blogers and readers.

## Tech

Blog uses:

- ReactJS
- vite
- React-router-dom v6
- React-dom
- node.js 
- formik 
- yup 
- react-toastify 
- caniuse-lite

## Installation

Using SoftUni practice server. Start the server.

```sh
cd server
node server.js

```
Install the dependencies in client and start.
```sh
cd client
npm i
npm run dev
```

## REST_API Endpoints:
>baseUrl: http://localhost:3030

#### Login
Login by sending a **POST** request with email and password to /users/login. 

#### Register
Create a new user by sending a **POST** request to /users/register with properties username, email, password. The service automatically creates a session and returns an authorization token, that can be used for requests.

#### Logout
Send an authorized **GET** request to /users/logout. The service returns an empty response - if you attempt to parse it as JSON, you will receive an error! You can check for this type of response by looking at the status (204 instead of 200) and the content-type header (will not be present).

#### Authorized Requests
To make an authorized request, add the following header, where {token} is the access token, returned by the service upon successful login or registration:
>X-Authorization: {token}

## CRUD

#### Read
An end point is revealed at /data/post, which grants access to information, stored on the service. GET requests to the service will return the following responses:

- **GET** /data/post/ - array of all entries in the collection 
- **GET** /data/post/ - array of latest 3 entries in the collection

#### Create
*This request requires authorization and content-type headers*
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send POST request to /data/post/ to create new entry. Request body must contain, title, category, summary, image . ID will be generated automatically and will be included in the returned object. If the collection does not exist, it will be created.

#### Update 
*This request requires authorization and content-type headers. Only the owner of the resource can edit it.*
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send PUT request to /data/post/:id to update a single entry. Note that the existing entry will be replaced!

#### Delete
*This request requires authorization headers. Only the owner of the resource can delete it.*
>Content-Type: application/json
>
>X-Authorization: {token}
>
>[Request body]
- Send DELETE request to /data/post/:id to delete a single entry.
