# 🎓 EdTech - Full Stack EdTech Platform

A modern Learning Management System (LMS) built using the MERN stack that enables instructors to create and manage courses while allowing students to purchase, access, and track their learning progress.

---

## 🚀 Live Demo

🔗 https://your-live-demo.vercel.app](https://edtech-frontend.onrender.com/

---

## 📖 About the Project

I built EdTech to understand how production-grade learning platforms work beyond simple CRUD applications. The project focuses on authentication, secure payments, media management, role-based access, and scalable backend architecture.

Instead of following a tutorial, I designed the application from scratch, implementing features commonly found in commercial learning platforms.

---

## ✨ Features

### Authentication
- JWT Authentication
- OTP Email Verification
- Forgot Password & Reset Password
- Secure Password Hashing using bcrypt

### Student Features
- Browse Courses
- Purchase Courses
- Watch Course Videos
- Track Learning Progress
- Edit Profile
- Wishlist Courses

### Instructor Features
- Instructor Dashboard
- Create & Edit Courses
- Upload Course Videos
- Manage Course Content
- View Student Enrollments

### Admin Features
- User Management
- Course Management
- Platform Monitoring

### Payments
- Razorpay Payment Gateway Integration
- Secure Order Verification
- Purchase History

### Media Management
- Cloudinary Image Upload
- Video Storage
- Optimized Media Delivery

### User Experience
- Responsive Design
- Protected Routes
- Loading Skeletons
- Toast Notifications
- Search & Filtering

---

# 🏗️ Architecture

```
Client (React)
       │
REST APIs
       │
Node.js + Express
       │
MongoDB
       │
Cloudinary
       │
Razorpay
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt
- Nodemailer

## Database

- MongoDB
- Mongoose

## Cloud Services

- Cloudinary
- Razorpay

---

# 📂 Project Structure

```
client/
│── src/
│── components/
│── pages/
│── redux/

server/
│── controllers/
│── routes/
│── middleware/
│── models/
│── config/
```

---

# 🔐 Authentication Flow

- User Registration
- OTP Verification
- Login
- JWT Token Generation
- Protected Routes
- Refresh Session

---

# 💳 Payment Flow

1. Student selects a course
2. Razorpay Order is created
3. User completes payment
4. Payment signature is verified
5. Course is added to student's account

---

# 📊 Database Design

Collections include:

- Users
- Courses
- Categories
- Sections
- SubSections
- Ratings & Reviews
- Orders

---

# 📸 Screenshots

## Home Page

<img width="938" height="447" alt="image" src="https://github.com/user-attachments/assets/65a14053-ccfb-40cd-96b6-32987f4e8b92" />


## Student Dashboard

<img width="944" height="447" alt="image" src="https://github.com/user-attachments/assets/a969cf2e-5c60-4c5d-9f8e-86b5b709de52" />


## Instructor Dashboard

<img width="938" height="420" alt="image" src="https://github.com/user-attachments/assets/ef5e9cc7-2177-4ae9-bd43-dfffd3b3fea1" />


## Course Player

<img width="932" height="442" alt="image" src="https://github.com/user-attachments/assets/48dca846-c5b3-41bc-8807-4fbbde13045a" />



---

# ⚡ Performance Optimizations

- Lazy Loading
- Image Optimization using Cloudinary
- Optimized MongoDB Queries
- Component Reusability
- Efficient State Management using Redux Toolkit

---

# 🚧 Challenges Faced

- Designing role-based authentication
- Integrating Razorpay securely
- Managing nested course structures
- Uploading and optimizing media
- Keeping Redux state synchronized with backend APIs

---

# 📚 What I Learned

Through this project I gained practical experience in:

- Designing REST APIs
- Authentication & Authorization
- Payment Gateway Integration
- Database Modeling
- State Management
- Backend Architecture
- Error Handling
- Production Deployment

---

# 🚀 Future Improvements

- Live Classes
- Course Certificates
- Discussion Forums
- AI Course Recommendations
- Instructor Analytics
- Real-time Notifications

---

# 👨‍💻 Author

**Mohammad Hamza**

GitHub: https://github.com/Hamza9-86

LinkedIn: https://linkedin.com/in/hamza013

Email: hamzazafar013@gmail.com
