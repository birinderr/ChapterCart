---

📚 Book Buying Website (Express.js + Sequelize + MySQL)

Project Overview

This is a book-buying website built using Node.js, Express.js, Sequelize ORM (MySQL2), and Express Sessions for authentication. It follows the MVC structure with optimized security and performance.

Features

✅ User authentication using Express Sessions
✅ Role-based access control (Admin, Customer, etc.)
✅ Manage books, categories, and publishers
✅ Customers can place orders, add items to cart/wishlist
✅ Secure payments and order management
✅ Apply discounts and write book reviews
✅ Notifications and subscriptions system


---

🛠 Tech Stack

Backend

Node.js + Express.js

Sequelize ORM + MySQL2

Express Sessions for authentication


Libraries & Tools

express, sequelize, mysql2

express-session, dotenv, cors

bcryptjs, body-parser, morgan



---

📂 Project Structure

/book-buying-website
│── /controllers          # Handles business logic
│── /models               # Sequelize models (database tables)
│── /routes               # API endpoints
│── /middlewares          # Authentication & error handling
│── /config               # Database config
│── /migrations           # Sequelize migrations
│── /seeders              # Sample data
│── server.js             # Main Express app
│── README.md             # Documentation
│── .env                  # Environment variables


---

🚀 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-repo/book-buying-website.git
cd book-buying-website

2️⃣ Install Dependencies

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=bookstore
SESSION_SECRET=your-secret-key

4️⃣ Run Database Migrations

npx sequelize db:migrate

5️⃣ Start the Server

npm start

Server runs on http://localhost:5000/ 🎉


---

📌 API Endpoints

Authentication (Express Sessions)

Books & Categories

Orders & Payments


---

🔐 Authentication with Express Sessions

1️⃣ User logs in → A session is created
2️⃣ Session is stored in the database
3️⃣ User stays logged in across requests
4️⃣ Logout destroys the session


---

🤝 Contributing

1. Fork the repository


2. Create a feature branch (git checkout -b feature-name)


3. Commit your changes (git commit -m "Add feature")


4. Push to GitHub (git push origin feature-name)


5. Submit a pull request 🎉




---

📜 License

This project is open-source under the MIT License.


---