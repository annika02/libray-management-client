Library Management System

Overview
The Library Management System is a web application designed to manage a digital library, allowing users to browse, borrow, add, update, and return books across various categories. Built with a React frontend and a Node.js/Express backend, it integrates with MongoDB for data storage and provides a user-friendly interface for book management. The application supports user authentication, book categorization, and real-time updates, making it ideal for educational or personal library use.
Live Site: https://assignment-11-e2b7f.web.app/
Backend API: https://library-server-alpha.vercel.app

Features

Browse Books: View books by category (Fiction, Science, History, Non-Fiction) or all books together.
Book Details: Access detailed information about each book, including title, author, category, rating, quantity, and description.
Borrow Books: Authenticated users can borrow books, specifying a return date, with real-time quantity updates.
Return Books: Users can return borrowed books, updating the library’s inventory.
Add Books: Admins or authenticated users can add new books with details like image URL, title, author, category, quantity, rating, and description.
Update Books: Modify existing book details, including quantity to maintain availability.
User Authentication: Secure login system to restrict borrowing and management features to authenticated users.
Responsive Design: Grid-based layout for book listings, optimized for desktop and mobile devices.
Real-Time Updates: Periodic API polling (every 15 seconds) to refresh book data.
Skeleton Loading: Placeholder UI during data fetching for improved user experience.
Error Handling: User-friendly error messages using SweetAlert2 for failed operations.

Tech Stack
Frontend

React: JavaScript library for building the user interface.
React Router: For client-side routing and navigation.
React Rating Stars: For displaying book ratings.
SweetAlert2: For user-friendly alerts and notifications.
Tailwind CSS: For styling and responsive design (assumed based on class names).
Firebase: For frontend hosting and authentication.

Backend

Node.js/Express: For building the RESTful API.
MongoDB: NoSQL database for storing books and borrowed records.
Mongoose: For MongoDB object modeling (assumed based on MongoDB usage).
CORS: Configured to allow cross-origin requests from the frontend.
Dotenv: For environment variable management.

Deployment

Frontend: Hosted on Firebase Hosting (https://assignment-11-e2b7f.web.app/).
Backend: Deployed on Vercel (https://library-server-alpha.vercel.app).
Database: MongoDB Atlas for cloud-hosted data storage.

API Endpoints
The backend provides the following RESTful API endpoints:

GET /fiction: Fetch all fiction books.
GET /science: Fetch all science books.
GET /history: Fetch all history books.
GET /nonfiction: Fetch all non-fiction books.
GET /allbooks: Fetch all books across categories.
GET /allbooks/:id: Fetch a specific book by ID.
PUT /allbooks/:id: Update a book’s details (image, name, author, category, rating, quantity).
POST /allbooks: Add a new book to AllBooks and its category collection.
GET /borrow: Fetch all borrowed books.
POST /borrow: Borrow a book, updating quantity.
PATCH /:category/:id/borrow: Decrease book quantity when borrowed.
PATCH /:category/:id/return: Increase book quantity when returned.
DELETE /borrow/:id: Remove a borrowed book record.

Setup Instructions
Prerequisites

Node.js (v16 or higher)
MongoDB Atlas account or local MongoDB instance
Firebase account for frontend hosting
Vercel account for backend deployment
Git for version control

Backend Setup

Clone the Repository:
git clone https://github.com/your-username/library-server-alpha.git
cd library-server-alpha

Install Dependencies:
npm install

Configure Environment Variables:Create a .env file in the server/ directory:
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

Run the Backend:
npm start

The server will run on http://localhost:3000.

Deploy to Vercel:

Push the backend code to a GitHub repository.
Import the repository into Vercel via the Vercel dashboard.
Set environment variables (DB_USER, DB_PASS) in Vercel.
Deploy the backend. The deployed URL will be something like https://library-server-alpha.vercel.app.

Frontend Setup

Navigate to the Frontend Directory:
cd client

Install Dependencies:
npm install

Configure Firebase:

Create a Firebase project and enable Hosting and Authentication.
Update firebaseConfig in your frontend code (likely in src/firebase.js).
Install Firebase CLI:npm install -g firebase-tools

Run the Frontend Locally:
npm run dev

The app will run on http://localhost:5173.

Deploy to Firebase:

Log in to Firebase:firebase login

Initialize Firebase Hosting:firebase init hosting

Build and deploy:npm run build
firebase deploy

The live site will be available at https://assignment-11-e2b7f.web.app.

Usage

Browse Books:

Visit the homepage or category pages (Fiction, Science, History, Non-Fiction) to view available books.
Click "Details" to see more information or borrow a book.

Borrow a Book:

Log in using your credentials.
On the book details page, click "Borrow," select a return date, and confirm.
View borrowed books on the "Borrowed Books" page.

Add a Book:

Navigate to the "Add Book" page.
Fill in the form (image URL, title, author, category, quantity, rating, description) and submit.

Update a Book:

Go to the "All Books" page, click "Update" for a book, modify details, and submit.

Return a Book:

On the "Borrowed Books" page, click "Return" for a book to update its availability.

Troubleshooting

CORS Errors:

Ensure the frontend URL (https://assignment-11-e2b7f.web.app) is included in the backend’s allowedOrigins in index.js.
If x-kl-ajax-request headers cause issues, verify fetch is used instead of axios in all API calls.

Quantity Becomes 0:

Ensure quantity is included in the update form (UpdateBooks.jsx) and sent in the PUT request.

UNSAFE_componentWillMount Warning:

Disable React Strict Mode in main.jsx:ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<App />
</BrowserRouter>
);

Update dependencies (react-router-dom, sweetalert2, react-rating-stars-component).

MongoDB Connection Issues:

Verify DB_USER and DB_PASS in the .env file.
Check MongoDB Atlas connection string and network access.

License
This project is licensed under the MIT License.
Contact
For questions or feedback, contact your-email@example.com or open an issue on the GitHub repository.
