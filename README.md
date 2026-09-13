# Extrack

Extrack is a full-stack MERN expense tracker that helps users manage their income and expenses, filter transactions, and visualize their financial data through analytics.

## Features

- User signup and login
- JWT-based authentication using HTTP-only cookies
- Protected transaction routes
- Add, edit, and delete transactions
- Track both income and expenses
- Transaction categories such as Food, Bill, Medical, and Other
- Filter transactions by:
  - Today
  - Week
  - Month
  - Year
  - Custom date range
  - Transaction type
  - Category
  - Minimum amount
  - Maximum amount
- Summary of total income, total expenses, and balance
- Transaction table with sorting and pagination
- Analytics view with charts
- Responsive frontend UI using Ant Design
- MongoDB database integration

## Tech Stack

### Frontend

- React
- React Router
- Redux
- Axios
- Ant Design
- Ant Design Charts
- Day.js

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie Parser
- CORS
- Morgan
- dotenv

## Project Structure

```text
extrack/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
│
├── config/                 # Database configuration
├── controllers/            # Backend controllers
├── middlewares/             # Authentication middleware
├── models/                  # Mongoose models
├── routes/                  # API routes
├── services/                # Authentication and other services
├── server.js                # Express server entry point
├── package.json
├── .env.example
└── .gitignore
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Create a new account |
| POST | `/api/v1/user/login` | Log in a user |
| GET | `/api/v1/user/logout` | Log out the user |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/transaction/add-transaction` | Add a transaction |
| PUT | `/api/v1/transaction/edit-transaction/:id` | Edit a transaction |
| DELETE | `/api/v1/transaction/delete-transaction/:id` | Delete a transaction |
| GET | `/api/v1/transaction/all-transaction` | Get transactions with filters |

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd extrack
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

Do not commit your `.env` file to GitHub.

### 5. Start the application

Run both the backend and frontend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run server
```

and in another terminal:

```bash
npm run client
```

The frontend runs on:

```text
http://localhost:3000
```

The backend runs on:

```text
http://localhost:8080
```

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used for JWT signing and verification |
| `PORT` | Backend server port |

## Security

Sensitive environment variables are stored in `.env` and excluded from version control using `.gitignore`.

The application uses JWT authentication and stores the authentication token in an HTTP-only cookie.

## Future Improvements

- Deploy the frontend and backend
- Add recurring transactions
- Add monthly budgets
- Add export to CSV/PDF
- Add more detailed financial reports
- Add password reset functionality
- Improve mobile responsiveness
- Add automated tests

## License

This project is currently for learning and portfolio purposes.
