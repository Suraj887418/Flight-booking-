# ✈️ Airplane Ticket Booking System

An advanced, full-stack flight booking web application designed to provide a seamless ticket reservation experience. Built with a modern tech stack, this platform offers comprehensive features for both regular users and administrators.

## 🚀 Key Features

### For Users (Travelers)
- **Flight Search & Booking**: Intuitive interface to search for flights based on source, destination, and dates.
- **Secure Authentication**: User registration and login powered by JWT and bcrypt for secure password hashing.
- **Stripe Payment Integration**: Secure, fast, and reliable checkout process using Stripe.
- **Downloadable E-Tickets**: Automatically generate and download flight tickets in PDF format upon successful booking.
- **QR Code Integration**: Every ticket includes a unique QR code for quick verification at the airport.
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS.

### For Administrators
- **Admin Dashboard**: Comprehensive dashboard to manage flights, bookings, and users.
- **QR Code Scanner**: Built-in QR scanner to quickly verify passenger tickets at the boarding gate.
- **Flight Management**: Add, update, or remove available flights.

## 💻 Tech Stack

### Frontend
- **React.js (Vite)** - Fast, modern UI library.
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development.
- **React Router** - For seamless single-page application navigation.
- **Stripe.js** - Secure payment gateway integration.
- **jsPDF** - Client-side PDF generation for tickets.
- **React QR Scanner** - For scanning and verifying ticket QR codes.

### Backend
- **Node.js & Express.js** - Robust server-side framework.
- **MongoDB & Mongoose** - NoSQL database for flexible and scalable data storage.
- **JSON Web Tokens (JWT)** - Secure, stateless user authentication.
- **Multer** - Middleware for handling file uploads.
- **Bcrypt** - Password hashing algorithm.
- **Stripe API** - Server-side payment intent creation and validation.

## 🛠️ Installation & Setup

Follow these instructions to run the project on your local machine.

### Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)
- Stripe API Keys (Public and Secret)

### 1. Clone the repository
```bash
git clone https://github.com/Suraj887418/Flight-booking-.git
cd "flightbooking web/Airplane-Ticket-Booking"
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## 💼 Why Choose This Project? (For Freelancing & Clients)
This project demonstrates my ability to build **end-to-end, production-ready web applications**. It showcases:
1. **Complex System Architecture**: Handling interactions between frontend, backend, database, and third-party APIs.
2. **Security Best Practices**: Implementing JWT auth, password hashing, and secure payment handling.
3. **Modern UI/UX**: Utilizing Tailwind CSS to create a beautiful, responsive, and user-friendly interface.
4. **Advanced Features**: Integrating device-level features like QR code scanning and dynamic PDF generation.

Whether you need a booking platform, an e-commerce site, or a custom SaaS application, I possess the full-stack skills to bring your vision to life.

## 📄 License
This project is licensed under the MIT License.
