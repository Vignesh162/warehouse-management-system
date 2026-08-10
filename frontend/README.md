# Warehouse Management System

A modern and responsive **Warehouse Management System** built with **Angular 17**, **TypeScript**, **RxJS**, and **Tailwind CSS**.

The application provides a complete interface for managing warehouse products, stock operations, users, and transaction history. It communicates with a RESTful backend API using JWT-based authentication.

---

## Live Link 
    https://wharehouse-management.vercel.app/login
    
## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Token storage using `localStorage`
* Password validation
* Automatic navigation after login/register
* Logout functionality

### Dashboard

The dashboard provides key warehouse statistics:

* Total Products
* Received Products
* Issued Products
* Total Transactions

### Product Management

Complete CRUD functionality for warehouse products:

* Add Product
* View Products
* Edit Product
* Delete Product
* Search Products
* Search by Product Name
* Search by SKU

Each product contains:

* Product Name
* SKU
* Category
* Quantity
* Rack Location
* Description

### Stock Management

Warehouse staff can manage product stock through:

* Receive Stock
* Issue Stock
* Transaction Quantity
* Transaction Remarks
* Automatic stock updates

### Transaction History

The application maintains a complete transaction history containing:

* Transaction Type
* Product Name
* Product SKU
* Quantity
* Date
* Performed By
* Remarks

---

## Tech Stack

| Technology   | Usage                 |
| ------------ | --------------------- |
| Angular 17   | Frontend framework    |
| TypeScript   | Programming language  |
| RxJS         | Reactive programming  |
| Tailwind CSS | UI styling            |
| ngx-toastr   | Notifications         |
| REST API     | Backend communication |
| JWT          | Authentication        |
| LocalStorage | Token storage         |

---

## Application Routes

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

## API

The application uses the following backend API:

```text
https://simple-warehouse-tracker.onrender.com
```

### Authentication

#### Login

```http
POST /api/users/login
```

Request:

```json
{
  "username": "username",
  "password": "password"
}
```

#### Register

```http
POST /api/users/register
```

Request:

```json
{
  "name": "User Name",
  "username": "username",
  "password": "password"
}
```

---

### Products

#### Get Products

```http
GET /api/products
```

#### Get Single Product

```http
GET /api/products/:id
```

#### Create Product

```http
POST /api/products
```

Request:

```json
{
  "name": "Laptop",
  "sku": "LAP001",
  "category": "Electronics",
  "quantity": 10,
  "rackLocation": "A-01",
  "description": "Office Laptop"
}
```

#### Update Product

```http
PUT /api/products/:id
```

#### Delete Product

```http
DELETE /api/products/:id
```

---

### Stock Operations

```http
PATCH /api/products/:id/stock
```

Request:

```json
{
  "transactionType": "RECEIVE",
  "remarks": "New stock received",
  "quantity": "10"
}
```

Transaction types:

```text
RECEIVE
ISSUE
```

---

### Transactions

```http
GET /api/transactions
```

Returns the warehouse transaction history.

---

### Dashboard

```http
GET /api/dashboard
```

Returns dashboard statistics such as:

```json
{
  "totalProducts": 100,
  "totalOrders": 50,
  "issuedOrders": 20,
  "receivedOrders": 30
}
```

---

## Installation

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

### 4. Start the Development Server

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

## Authentication Flow

```text
User
  │
  ▼
Login / Register
  │
  ▼
AuthService
  │
  ▼
Backend API
  │
  ▼
JWT Token
  │
  ▼
localStorage
  │
  ▼
Dashboard
```

---

## Product Management Flow

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
Database
     │
     ▼
Product List
```

---

## Stock Management Flow

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
PATCH /stock API
      │
      ▼
Update Product Stock
      │
      ▼
Transaction History
```

---

## Validation

The application includes client-side validation for important form fields.

### Registration Password

The password must:

* Contain at least one uppercase letter
* Contain at least one special character
* Be between 6 and 12 characters

Example:

```text
Password@123
```

### Product Form

Product information includes validation for:

* Name
* SKU
* Category
* Quantity
* Rack Location
* Description

---

## Services

### AuthService

Responsible for:

* User registration
* User login
* JWT token handling

### ProductService

Responsible for:

* Product listing
* Product creation
* Product update
* Product deletion
* Single product retrieval
* Dashboard data

### TransationService

Responsible for:

* Stock receive operations
* Stock issue operations
* Transaction history
* Product stock information

---

## Dashboard

The dashboard provides a quick overview of warehouse activity.

```text
┌─────────────────┐
│ Total Products  │
└─────────────────┘

┌─────────────────┐
│ Received Stock  │
└─────────────────┘

┌─────────────────┐
│ Issued Stock    │
└─────────────────┘

┌─────────────────┐
│ Transactions    │
└─────────────────┘
```

---

## Future Improvements

Possible improvements for future versions:

* Pagination
* Advanced product filtering
* Role-based access control
* Admin and Staff roles
* Product image upload
* Export transactions to CSV/PDF
* Advanced dashboard charts
* Low-stock alerts
* Barcode/QR code scanning
* Improved API error handling
* Automated testing

---

## Author

**Ashish Prajapati**

B.Sc. Information Technology

---

## License

This project is created for **educational and development purposes**.
