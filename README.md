# e-commerce-mern
Building and Deploying Full Stack E-commerce Website using React JS, MongoDB, Express JS, Node JS, Stripe and Razorpay. MERN Stack eCommerce project

## CI/CD

This project uses GitHub Actions for continuous integration and continuous deployment to Vercel.

There are two workflows:

-   `.github/workflows/backend.yaml`: Deploys the backend to Vercel.
-   `.github/workflows/frontend.yaml`: Deploys the frontend to Vercel.

Both workflows will automatically deploy to production on pushes to the `main` branch and create preview deployments for pushes to any other branch.