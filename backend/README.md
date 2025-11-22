# Backend API

This is the backend API for the MERN E-commerce platform. It's a Node.js application built with Express.js that provides a RESTful API for managing products, users, orders, reviews, and website content.

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Image Uploads**: Multer and Cloudinary
- **Payment Processing**: Stripe

## API Endpoints

-   `/api/user`: User authentication (register, login).
-   `/api/product`: Manage products (list, add, update, remove).
-   `/api/order`: Manage orders (place order, view orders).
-   `/api/review`: Manage product reviews.
-   `/api/content`: Manage dynamic website content. ( still in working )

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm
-   A MongoDB connection string.
-   API keys for Stripe and Cloudinary.

### Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=4000
MONGO_URL=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_JWT_Secret>
STRIPE_SECRET_KEY=<Your_Stripe_Secret_Key>
CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
```

## Available Scripts

-   `npm start`: Start the server.
-   `npm run server`: Start the server in development mode with `nodemon`.
