# Library Management System

## Overview

The **Library Management System** is a full-stack web application to manage a digital library, enabling users to browse, borrow, add, update, and return books across multiple categories.

- **Live Site:** [https://assignment-11-e2b7f.web.app/](https://assignment-11-e2b7f.web.app/)
- **Backend API:** [https://library-server-alpha.vercel.app](https://library-server-alpha.vercel.app)

---

## Features

- Browse books by category or all books.
- Detailed book information (title, author, category, rating, quantity, description).
- Borrow and return books with real-time quantity updates.
- Add and update books (admin/authenticated users).
- Secure user authentication.
- Responsive design with real-time data updates.
- User-friendly error handling with SweetAlert2.

---

## Tech Stack

| Frontend           | Backend           | Database      | Hosting/Deployment  |
| ------------------ | ----------------- | ------------- | ------------------- |
| React              | Node.js / Express | MongoDB Atlas | Firebase (frontend) |
| React Router       |                   |               | Vercel (backend)    |
| React Rating Stars | CORS              |               |                     |
| SweetAlert2        | Dotenv            |               |                     |
| Tailwind CSS       |                   |               |                     |
| Firebase Auth      |                   |               |                     |

---

## API Endpoints

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/fiction`              | Get all fiction books           |
| GET    | `/science`              | Get all science books           |
| GET    | `/history`              | Get all history books           |
| GET    | `/nonfiction`           | Get all non-fiction books       |
| GET    | `/allbooks`             | Get all books                   |
| GET    | `/allbooks/:id`         | Get a book by ID                |
| PUT    | `/allbooks/:id`         | Update book details             |
| POST   | `/allbooks`             | Add a new book                  |
| GET    | `/borrow`               | Get all borrowed books          |
| POST   | `/borrow`               | Borrow a book (update quantity) |
| PATCH  | `/:category/:id/borrow` | Decrease quantity when borrowed |
| PATCH  | `/:category/:id/return` | Increase quantity when returned |
| DELETE | `/borrow/:id`           | Delete borrowed record          |

---

## Setup Instructions

### Prerequisites

- Node.js v16+
- MongoDB Atlas or local MongoDB
- Firebase account
- Vercel account
- Git

### Backend Setup

```bash
git clone https://github.com/your-username/library-server-alpha.git
cd library-server-alpha
npm install
```
