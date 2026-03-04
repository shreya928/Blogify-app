# Blogify 📝

Blogify is a full-stack blogging platform where users can create, edit, and manage blog posts.  
It is built using **Node.js, Express.js, MongoDB, and EJS**, following the MVC architecture for better code organization.

---

# 🚀 Features

- User authentication (Signup & Login)
- Create, edit, and delete blog posts
- Comment system for posts
- Flash messages for alerts
- Server-side rendering using EJS
- Organized MVC project structure

---

# 🛠 Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Frontend**
- EJS
- CSS
- JavaScript

**Authentication**
- Passport.js

**Version Control**
- Git
- GitHub

---

# 📂 Project Structure
Blogify-app
│
├── classroom
│ ├── server.js
│ └── views
│ └── page.ejs
│
├── controllers
│ ├── comment.js
│ ├── post.js
│ └── user.js
│
├── init
│ ├── data.js
│ └── index.js
│
├── models
│ ├── comment.js
│ ├── post.js
│ └── user.js
│
├── public
│ ├── css
│ │ └── style.css
│ └── js
│ └── script.js
│
├── routes
│ ├── comment.js
│ ├── post.js
│ └── user.js
│
├── utils
│ ├── expressError.js
│ └── wrapAsync.js
│
├── views
│ ├── error.ejs
│ │
│ ├── includes
│ │ ├── flash.ejs
│ │ ├── footer.ejs
│ │ └── navbar.ejs
│ │
│ ├── layouts
│ │ └── boilerplate.ejs
│ │
│ ├── listings
│ │ ├── edit.ejs
│ │ ├── index.ejs
│ │ ├── new.ejs
│ │ └── show.ejs
│ │
│ └── users
│ ├── login.ejs
│ └── signup.ejs
│
├── middleware.js
├── cloudConfig.js
├── schema.js
├── app.js
├── package.json
└── package-lock.json


---

# ⚙️ Installation

### 1️⃣ Clone the repository


git clone https://github.com/shreya928/Blogify-app.git


### 2️⃣ Navigate to project directory


cd Blogify-app


### 3️⃣ Install dependencies


npm install


### 4️⃣ Create a `.env` file

Add environment variables such as:


MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key


### 5️⃣ Start the server


node app.js


Open in browser:


http://localhost:3000


---

# 💡 Future Improvements

- Add image upload for blog posts
- Add likes and bookmarks
- Improve UI with React frontend
- Add blog categories and search functionality

---

# 👩‍💻 Author

**Shreya**

GitHub:  
https://github.com/shreya928
