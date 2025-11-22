# MERN Stack E-Commerce Platform

This is a full-stack e-commerce website built with the MERN stack (MongoDB, Express.js, React, Node.js). It features a customer-facing frontend, a separate admin panel for managing the store, and a robust backend API.

## Live Demo

https://e-com.ybenihoud.com

## Features

### Customer Frontend

- **User Authentication**: Secure user registration and login with JWT.
- **Product Catalog**: Browse and search for products.
- **Product Details**: View detailed information and customer reviews for each product.
- **Shopping Cart**: Add products to the cart and manage cart items.
- **Checkout**: Seamless checkout process with Stripe and Razorpay integrations.
- **Order History**: View past orders and their status.
- **Responsive Design**: Fully responsive and mobile-friendly user interface.

### Admin Panel

- **Dashboard**: An overview of sales, orders, and products.
- **Product Management**: Add, update, and remove products from the store.
- **Order Management**: View and manage customer orders.
- **User Management**: View and manage registered users.

### Backend API

- **RESTful API**: A well-structured API for managing products, users, orders, and reviews.
- **Authentication & Authorization**: Secure API endpoints with JWT-based authentication and middleware.
- **Image Uploads**: Product image uploads handled with Multer and hosted on Cloudinary.
- **Payment Gateway Integration**: Server-side integration with Stripe and Razorpay.

## Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS
- **Admin Panel**: React, React Router, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, Mongoose, JWT, Bcrypt, Multer, Stripe, Cloudinary
- **Database**: MongoDB (Atlas)
- **Build Tool**: Vite
- **DevOps**: GitHub Actions, Vercel

## Project Structure

This project is a monorepo with the following structure:

```
/
├── admin/        # React application for the admin panel
├── backend/      # Node.js/Express.js backend API
├── frontend/     # React application for the customer-facing storefront
├── Bruno-Api/    # Bruno collection for API testing
└── .github/      # GitHub Actions workflows for CI/CD
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- A MongoDB connection string (you can get one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- API keys Cloudinary.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/e-commerce-mern.git
    cd e-commerce-mern
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    npm run server
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Install admin dependencies:**
    ```bash
    cd admin
    npm install
    npm run dev
    ```

### Configuration

The backend requires a `.env` file with the following environment variables. Create a file named `.env` in the `backend` directory:

```
MONGO_URL=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_JWT_Secret>
STRIPE_SECRET_KEY=<Your_Stripe_Secret_Key>
CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
```

## Available Scripts

### Backend (`/backend`)

- `npm start`: Start the server in production mode.
- `npm run server`: Start the server in development mode with `nodemon`.

### Frontend (`/frontend`) & Admin (`/admin`)

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Lint the codebase.
- `npm run preview`: Preview the production build locally.

## API Reference

The API endpoints can be explored and tested using the Bruno collection located in the `/Bruno-Api` directory. You can use the [Bruno API client](https://www.usebruno.com/) to import and use this collection.

## Deployment

This project uses GitHub Actions for continuous integration and continuous deployment to Vercel.

- `.github/workflows/backend.yaml`: Deploys the backend to Vercel.
- `.github/workflows/frontend.yaml`: Deploys the frontend to Vercel.

Both workflows will automatically deploy to production on pushes to the `main` branch and create preview deployments for pushes to any other branch.
