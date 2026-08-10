Intern Assignment: Simple Warehouse Stock Tracker
Goal: Build a small but complete application where one warehouse user can manage products, receive stock, issue stock, and view transaction history.
1. Objective
Create a functional warehouse stock application that demonstrates basic frontend, backend, database, authentication, validation, and API integration skills. Keep the implementation simple and readable. Advanced warehouse features are not required.
2. Suggested Technology
Frontend	Backend	Database
Angular with Reactive Forms	Node.js with Fastify or Express	MongoDB, MySQL, or PostgreSQL
3. Required Modules
A. Login
•	Use one predefined warehouse user.
•	Allow login and logout.
•	Protect application pages and backend APIs.
•	Store the password as a hash, not plain text.
B. Product Management
•	Add, view, edit, delete, and search products.
•	Search by product name or SKU.
•	Product fields: name, SKU, category, quantity, rack location, and optional description.
•	SKU must be unique. Rack location is a simple text field such as A-01.
•	Do not build a separate rack management module.
C. Material Receiving
•	Select an existing product and enter the received quantity.
•	Received quantity must be greater than zero.
•	Increase the product quantity and save a RECEIVE transaction.
•	Allow optional remarks.
D. Material Issue
•	Select an existing product and enter the issued quantity.
•	Issue quantity must be greater than zero.
•	Issue quantity must not exceed available stock.
•	Reduce the product quantity and save an ISSUE transaction.
•	Allow optional remarks.

E. Transaction History
•	Use one stock transaction table or collection.
•	Store product, transaction type, quantity, remarks, and transaction date.
•	Transaction type must be RECEIVE or ISSUE.
•	Display all transactions in a simple table.
4. Required Screens
1. Login   2. Product List   3. Add/Edit Product   4. Receive Material   5. Issue Material   6. Transaction History
5. Core Validations
•	Required fields cannot be empty.
•	SKU must be unique.
•	Product quantity cannot become negative.
•	Receiving quantity must be greater than zero.
•	Issue quantity must be greater than zero and cannot exceed available stock.
•	Show clear success and error messages.
6. Deliverables
•	Angular frontend and Node.js backend source code.
•	Database models or schema and sample data.
•	README with setup steps, run commands, test login credentials, and API summary.
•	Postman collection or equivalent API documentation.
7. Evaluation Criteria
•	Login and protected routes work.
•	Product CRUD and search work end to end.
•	Receiving correctly increases stock.
•	Issuing correctly decreases stock and prevents over-issue.
•	Transaction history is stored and displayed.
•	Code is clean, modular, and understandable.
•	Validation and error handling are correct.
•	README instructions are complete.

