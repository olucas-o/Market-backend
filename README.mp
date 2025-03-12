# Market Backend

This is the backend for a marketplace where users can list their products. Only the owner of a product can modify or delete it. The project provides full CRUD operations for users and products, as well as product search functionality by name and category.

## Features
- User and product CRUD operations
- Product search by name and category
- Authentication and authorization using JWT
- Secure password handling with bcrypt
- Uses SQLite as the database

## Technologies Used
- **bcrypt**: For password hashing
- **dotenv**: To manage environment variables
- **express**: Web framework for Node.js
- **jsonwebtoken**: To handle authentication
- **nodemon**: For automatic server restarts during development
- **sqlite3**: Database management
- **zod**: Schema validation

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/olucas-o/Market-backend
   ```
2. Navigate to the project folder:
   ```sh
   cd Market-backen
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and configure the necessary environment variables.
5. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Delete a user

### Products
- `POST /products` - Create a new product
- `GET /products/:id` - Get product details
- `PUT /products/:id` - Update product details
- `DELETE /products/:id` - Delete a product
- `GET /products?name={name}` - Search products by name
- `GET /products?category={category}` - Search products by category

## Contact
For any questions or issues, please reach out to me at: **lucas.ornelas.dev@gmail.com**

