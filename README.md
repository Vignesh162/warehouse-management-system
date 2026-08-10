# Warehouse Management System

A modern and responsive **Warehouse Management System** built with **Angular 17**, **TypeScript**, **RxJS**, and **Tailwind CSS**, with a RESTful backend powered by **Fastify** and **MongoDB**.

The application provides a complete interface for managing warehouse products, stock operations, users, dashboard statistics, and transaction history. It communicates with the backend through authenticated REST APIs using **JWT-based authentication**.

---

## Live Demo

### Frontend

https://wharehouse-management.vercel.app/login

### Backend API

https://simple-warehouse-tracker.onrender.com

### API Documentation

https://simple-warehouse-tracker.onrender.com/documentation

---

## Features

### Authentication

- User Registration
- User Login
- JWT-based authentication
- Password hashing using bcrypt
- JWT token storage using `localStorage`
- Automatic authentication for protected API requests
- Automatic navigation after login/register
- Logout functionality
- Protected frontend routes

---

### Dashboard

The dashboard provides an overview of warehouse activity:

- Total Products
- Total Orders
- Received Orders
- Issued Orders
- Total Transactions

Dashboard statistics are retrieved from a dedicated backend endpoint.

```http
GET /api/dashboard
````

---

### Product Management

Complete CRUD functionality for warehouse products.

* Add Product
* View Products
* View Product Details
* Update Product
* Delete Product
* Search Products
* Search by Product Name
* Search by SKU
* Filter Products
* Pagination

Each product contains:

* Product Name
* SKU
* Category
* Quantity
* Rack Location
* Description
* Created Date
* Updated Date
* Created By

---

### Stock Management

Warehouse staff can perform stock operations through a dedicated stock API.

Supported operations:

* Receive Stock
* Issue Stock
* Automatic stock quantity updates
* Transaction remarks
* Transaction history creation
* Insufficient stock validation

Stock operations are performed using:

```http
PATCH /api/products/:id/stock
```

The system prevents issuing more stock than is currently available.

If insufficient stock is available, the API returns:

```http
409 Conflict
```

---

### Transaction History

Every stock operation creates a transaction record.

Transactions contain:

* Transaction ID
* Product ID
* Product Name
* Product SKU
* Transaction Type
* Quantity
* Remarks
* Performed By
* Transaction Date

Supported transaction types:

```text
RECEIVE
ISSUE
```

Transactions can be paginated and filtered by:

* Transaction Type
* Product ID
* User ID
* Product SKU
* Product Name

---

## Tech Stack

### Frontend

| Technology   | Usage                |
| ------------ | -------------------- |
| Angular 17   | Frontend framework   |
| TypeScript   | Programming language |
| RxJS         | Reactive programming |
| Tailwind CSS | UI styling           |
| ngx-toastr   | Notifications        |
| HTML5        | Structure            |
| CSS3         | Styling              |

### Backend

| Technology          | Usage                       |
| ------------------- | --------------------------- |
| Node.js             | Runtime environment         |
| Fastify             | REST API framework          |
| MongoDB             | Database                    |
| `@fastify/mongodb`  | MongoDB integration         |
| JWT                 | Authentication              |
| bcrypt              | Password hashing            |
| Fastify JSON Schema | Request/response validation |
| Swagger / OpenAPI   | API documentation           |
| CORS                | Cross-origin requests       |

### Deployment

| Platform      | Usage               |
| ------------- | ------------------- |
| Vercel        | Frontend deployment |
| Render        | Backend deployment  |
| MongoDB Atlas | Cloud database      |

---

# Application Routes

| Route                | Description           |
| -------------------- | --------------------- |
| `/login`             | User Login            |
| `/register`          | User Registration     |
| `/dashboard`         | Warehouse Dashboard   |
| `/products`          | Product List          |
| `/products/add`      | Add Product           |
| `/products/edit/:id` | Edit Product          |
| `/receive/:id`       | Receive / Issue Stock |
| `/transactions`      | Transaction History   |

---

# Backend API

## Base URL

```text
https://simple-warehouse-tracker.onrender.com
```

## Swagger Documentation

Interactive API documentation is available at:

```text
https://simple-warehouse-tracker.onrender.com/documentation
```

---

# Authentication

Protected API endpoints require a JWT token.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Register

```http
POST /api/users/register
```

### Request

```json
{
  "name": "User Name",
  "username": "username",
  "password": "Password@123"
}
```

### Response

```json
{
  "message": "User created successfully!"
}
```

---

## Login

```http
POST /api/users/login
```

### Request

```json
{
  "username": "username",
  "password": "Password@123"
}
```

### Response

```json
{
  "token": "<JWT_TOKEN>"
}
```

The frontend stores the JWT token and uses it when accessing protected endpoints.

---

# Products API

All product endpoints require authentication.

---

## Get All Products

```http
GET /api/products
```

### Pagination

```http
GET /api/products?page=1&limit=10
```

### Search

```http
GET /api/products?search=Dell
```

### Filter by Category

```http
GET /api/products?category=Laptops
```

### Combined Search and Pagination

```http
GET /api/products?search=Dell&category=Laptops&page=1&limit=10
```

### Example Response

```json
{
  "total": 8,
  "page": 1,
  "limit": 10,
  "products": [
    {
      "_id": "6a744b0e60fafb3414ee3b10",
      "name": "Dell Latitude 5440",
      "sku": "LAP-001",
      "category": "Laptops",
      "quantity": 35,
      "rackLocation": "A-01",
      "description": "14-inch business laptop with Intel Core i5",
      "createdAt": "2026-08-06T08:51:26.558Z",
      "updatedAt": "2026-08-06T12:43:16.521Z",
      "createdBy": "6a743810cc3ae8820582d908"
    }
  ]
}
```

---

## Get Product by ID

```http
GET /api/products/:id
```

Example:

```http
GET /api/products/6a744b0e60fafb3414ee3b10
```

---

## Create Product

```http
POST /api/products
```

### Request

```json
{
  "name": "Dell Latitude 5440",
  "sku": "LAP-001",
  "category": "Laptops",
  "quantity": 35,
  "rackLocation": "A-01",
  "description": "14-inch business laptop with Intel Core i5"
}
```

### Response

```json
{
  "message": "Product added successfully",
  "product": {
    "_id": "6a744b0e60fafb3414ee3b10",
    "name": "Dell Latitude 5440",
    "sku": "LAP-001",
    "category": "Laptops",
    "quantity": 35,
    "rackLocation": "A-01",
    "description": "14-inch business laptop with Intel Core i5"
  }
}
```

---

## Update Product

```http
PUT /api/products/:id
```

### Request

```json
{
  "name": "Dell Latitude 5440",
  "sku": "LAP-001",
  "category": "Laptops",
  "quantity": 40,
  "rackLocation": "A-02",
  "description": "Updated product description"
}
```

---

## Delete Product

```http
DELETE /api/products/:id
```

Example:

```http
DELETE /api/products/6a744b0e60fafb3414ee3b10
```

---

# Stock Operations

Stock changes are handled using:

```http
PATCH /api/products/:id/stock
```

---

## Receive Stock

```json
{
  "transactionType": "RECEIVE",
  "quantity": 10,
  "remarks": "New stock received from supplier"
}
```

The product quantity is increased by the specified amount.

---

## Issue Stock

```json
{
  "transactionType": "ISSUE",
  "quantity": 5,
  "remarks": "Issued to IT department"
}
```

The product quantity is decreased by the specified amount.

---

## Transaction Types

```text
RECEIVE
ISSUE
```

### Insufficient Stock

If an issue operation attempts to remove more stock than is available, the API returns:

```http
409 Conflict
```

Example:

```json
{
  "message": "Insufficient stock"
}
```

---

# Transactions API

## Get Transactions

```http
GET /api/transactions
```

### Pagination

```http
GET /api/transactions?page=1&limit=10
```

### Filter by Transaction Type

```http
GET /api/transactions?type=ISSUE
```

```http
GET /api/transactions?type=RECEIVE
```

### Filter by Product

```http
GET /api/transactions?productId=<PRODUCT_ID>
```

### Filter by User

```http
GET /api/transactions?performedBy=<USER_ID>
```

---

## Transaction Response

```json
{
  "total": 148,
  "page": 1,
  "limit": 10,
  "transactions": [
    {
      "_id": "transaction-id",
      "productId": "product-id",
      "productName": "Dell Latitude 5440",
      "productSKU": "LAP-001",
      "type": "ISSUE",
      "quantity": 5,
      "remarks": "Issued to IT department",
      "performedBy": "user-id",
      "performedByName": "username",
      "transactionDate": "2026-08-10T10:30:00.000Z"
    }
  ]
}
```

---

# Dashboard API

## Get Dashboard Statistics

```http
GET /api/dashboard
```

### Response

```json
{
  "totalProducts": 25,
  "totalOrders": 148,
  "issuedOrders": 63,
  "receivedOrders": 85
}
```

### Response Fields

| Field            | Description                    |
| ---------------- | ------------------------------ |
| `totalProducts`  | Total number of products       |
| `totalOrders`    | Total number of transactions   |
| `issuedOrders`   | Number of ISSUE transactions   |
| `receivedOrders` | Number of RECEIVE transactions |

---

# API Status Codes

The API uses standard HTTP status codes.

| Status Code | Meaning                                       |
| ----------- | --------------------------------------------- |
| `200`       | Request successful                            |
| `201`       | Resource created                              |
| `400`       | Invalid request / validation error            |
| `401`       | Authentication required / invalid token       |
| `403`       | Forbidden                                     |
| `404`       | Resource not found                            |
| `409`       | Conflict / duplicate SKU / insufficient stock |
| `500`       | Internal server error                         |

---

# Authentication Flow

```text
┌─────────────────┐
│      User       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Login / Register│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AuthService   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Fastify API   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MongoDB Atlas  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│    JWT Token    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   localStorage  │
└─────────────────┘
```

For protected requests:

```text
Angular
   │
   │ Authorization: Bearer JWT
   ▼
Fastify
   │
   ▼
JWT Authentication
   │
   ▼
Controller
   │
   ▼
MongoDB
```

---

# Product Management Flow

```text
Product Form
     │
     ▼
ProductService
     │
     ▼
REST API
     │
     ▼
Fastify Controller
     │
     ▼
MongoDB
     │
     ▼
Product Response
     │
     ▼
Angular Product List
```

---

# Stock Management Flow

```text
Select Product
      │
      ▼
Choose Operation
(RECEIVE / ISSUE)
      │
      ▼
Enter Quantity
      │
      ▼
Add Remarks
      │
      ▼
PATCH /products/:id/stock
      │
      ▼
Check Available Stock
      │
      ├───────────────┐
      │               │
      ▼               ▼
   RECEIVE          ISSUE
      │               │
      ▼               ▼
Increase Stock    Decrease Stock
      │               │
      └───────┬───────┘
              ▼
      Create Transaction
              │
              ▼
      Transaction History
```

---

# Validation

The application provides client-side and backend validation.

Backend request and response validation is implemented using Fastify JSON Schema.

---

## Registration Validation

The password must:

* Contain at least one uppercase letter
* Contain at least one special character
* Be between 6 and 12 characters

Example:

```text
Password@123
```

---

## Product Validation

Products validate:

* Product Name
* SKU
* Category
* Quantity
* Rack Location
* Description

Quantity cannot be negative when creating or updating a product.

---

## Stock Validation

Stock operations validate:

* Product ID
* Transaction Type
* Quantity
* Remarks

Stock cannot be issued when the requested quantity exceeds the available quantity.

---

# Services

## AuthService

Responsible for:

* User registration
* User login
* JWT token handling
* Authentication state

---

## ProductService

Responsible for:

* Product listing
* Product creation
* Product update
* Product deletion
* Single product retrieval
* Product search
* Product filtering
* Dashboard data

---

## TransactionService

Responsible for:

* Stock receive operations
* Stock issue operations
* Transaction history
* Transaction filtering

---

# Project Structure

A simplified structure of the application:

```text
src/
│
├── app/
│   ├── components/
│   ├── guards/
│   ├── interceptors/
│   ├── services/
│   └── ...
│
├── pages/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── products/
│   ├── receive/
│   └── transactions/
│
└── ...
```

Backend:

```text
backend/
│
├── controllers/
│   ├── product.js
│   ├── transactions.js
│   └── ...
│
├── routes/
│   ├── product.js
│   ├── transactions.js
│   ├── users.js
│   └── dashboard.js
│
├── schemas/
│   ├── product/
│   ├── transaction/
│   └── dashboard/
│
├── plugins/
│   ├── mongodb.js
│   └── jwt.js
│
├── serializers/
│   ├── serializeProduct.js
│   └── serializeTransaction.js
│
└── server.js
```

---

# Installation

## Frontend

### 1. Clone the Repository

```bash
git clone https://github.com/aashishprajapati99679/wharehouse-management.git
```

### 2. Navigate to the Project

```bash
cd wharehouse-management
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
ng serve
```

Or:

```bash
npm start
```

### 5. Open in Browser

```text
http://localhost:4200
```

---

# Backend Setup

The backend requires Node.js and MongoDB.

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

SALT_ROUNDS=10
```

### Start Backend

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

Swagger documentation:

```text
http://localhost:3000/documentation
```

---

# Deployment

## Frontend

The Angular frontend is deployed using **Vercel**.

## Backend

The Fastify backend is deployed using **Render**.

## Database

The application uses **MongoDB Atlas** as the cloud database.

---

# Future Improvements

Possible improvements for future versions include:

* Role-based access control
* Admin and Staff roles
* Advanced product filtering
* Advanced dashboard charts
* Low-stock alerts
* Product image upload
* Barcode / QR code scanning
* Export transactions to CSV/PDF
* Automated testing
* API rate limiting
* API security headers
* Refresh token authentication
* Email notifications
* Inventory reports
* Stock movement analytics
* Audit logs
* Soft deletion
* Automated database backups

---

# Screenshots

Add application screenshots here:

```text
Dashboard
Products
Add Product
Stock Management
Transaction History
Swagger Documentation
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)

![Products](screenshots/products.png)

![Transactions](screenshots/transactions.png)
```

---

# API Documentation

Interactive API documentation is available through Swagger/OpenAPI:

[https://simple-warehouse-tracker.onrender.com/documentation](https://simple-warehouse-tracker.onrender.com/documentation)

The documentation provides:

* Available API endpoints
* Request schemas
* Response schemas
* Authentication requirements
* Request parameters
* Request examples
* Response examples
* Interactive API testing

---

# Error Handling

The backend returns consistent error responses.

Example:

```json
{
  "message": "Product not found"
}
```

Duplicate SKU:

```json
{
  "message": "SKU already exists"
}
```

Insufficient stock:

```json
{
  "message": "Insufficient stock"
}
```

---

# Security

The application implements several security mechanisms:

* JWT authentication
* bcrypt password hashing
* Protected API routes
* Request validation
* Response validation
* MongoDB Atlas authentication
* CORS configuration
* Environment variables for sensitive configuration
* Stock validation to prevent negative inventory

---

# License

This project is created for **educational and development purposes**.

---

# Authors

**1. Aashish Prajapati**

B.Sc. Information Technology

````

````
**2. Vignesh Pai**

B.E. Information Technology


