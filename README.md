# Backend Project Submission: URL Shortener with Authentication and Middleware  

## 1. Introduction  
This project demonstrates the development of a **web-based backend service** using **Node.js** and **Express.js**. The system incorporates **user authentication** through JSON Web Tokens (JWT), a **URL shortening service**, and the application of **middleware functions** for access control and request management.  

---

## 2. System Overview  
The project consists of two main components:  

1. **Backend Submission**  
   - Implements a user management system (registration and login)  
   - Provides a personalized URL shortener service  
   - Allows retrieval of user-specific shortened links  
   - Redirects shortened URLs to their original addresses  
   - Demonstrates secure route access using JWT  

2. **Logging Middleware**  
   - Illustrates middleware-based access control  
   - Provides example users (regular and admin)  
   - Restricts access to a dashboard route without authentication  
   - Serves as a simplified example of JWT-protected routes  

---

## 3. Technologies Used  
- **Node.js** – Runtime environment for backend development  
- **Express.js** – Framework for building HTTP APIs  
- **jsonwebtoken (JWT)** – Library for token-based authentication  

---

## 4. Functional Requirements  

### 4.1 Backend Submission  
- **Register New User**: Accepts username and password, checks for duplicates, and stores user information.  
- **Login**: Validates credentials and issues a signed JWT valid for one hour.  
- **Shorten URL**: Creates a shortened URL with either a user-defined or auto-generated shortcode.  
- **View User URLs**: Returns all URLs shortened by the logged-in user.  
- **Redirect**: Resolves a shortcode to the corresponding original URL.  
- **Public Route**: Accessible without authentication.  

### 4.2 Logging Middleware  
- **Login**: Issues JWT for test or admin accounts.  
- **Dashboard Access**: Restricted to authenticated users.  
- **Public Route**: Accessible without authentication.  

---

## 5. Installation and Execution  

1. Install required dependencies:  
   ```bash
   npm install express jsonwebtoken
   ```
2. Run the server files individually:  
   ```bash
   node Backend\ Submission.js
   ```
   or  
   ```bash
   node Logging\ Middleware.js
   ```
3. Access the service via `http://localhost:3000`  

---

## 6. Example API Workflow  
I have used POSTMAN for API Testing.
1. **User Registration**  
   ```json
   POST /register
   {
     "username": "student1",
     "password": "securepass"
   }
   ```

2. **Login Request**  
   ```json
   POST /login
   {
     "username": "student1",
     "password": "securepass"
   }
   ```
   Response:  
   ```json
   {
     "token": "generated.jwt.token"
   }
   ```

3. **Shorten a URL**  
   ```json
   POST /shorturls
   Authorization: Bearer <token>
   {
     "url": "https://example.org"
   }
   ```

![Register demonstration screeshot](https://github.com/prasanna-lakshmi18/22701A3068/blob/main/Api_test_outputs_images/Screenshot%20(76).png)
![Login demonstration screeshot](https://github.com/prasanna-lakshmi18/22701A3068/blob/main/Api_test_outputs_images/Screenshot%20(78).png)
![shorturls demonstration screeshot](https://github.com/prasanna-lakshmi18/22701A3068/blob/main/Api_test_outputs_images/Screenshot%20(79).png)
![my-urls demonstration screeshot](https://github.com/prasanna-lakshmi18/22701A3068/blob/main/Api_test_outputs_images/Screenshot%20(80).png)

---

## 7. Security Considerations  
- The current implementation stores passwords in plain text. In a real-world system, passwords must be **hashed** using secure algorithms such as bcrypt.  
- The `SECRET_KEY` is hardcoded for demonstration but should be managed securely through environment variables in production systems.  
- JWT expiration is limited to **1 hour** to reduce risks of token misuse.  

---

## 8. File Structure  
```
|-- Backend Submission.js     # Main URL shortener implementation
|-- Logging Middleware.js     # Middleware demonstration with JWT
|-- README.md                 # Documentation
```

---

## 9. Conclusion  
The developed system successfully integrates **authentication, middleware, and API design** into a single backend service. It highlights the importance of **secure access management** in modern web applications and demonstrates practical implementation of **RESTful APIs** with JWT-based security.  

