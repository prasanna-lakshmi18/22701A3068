// server.js
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT =3000;
const SECRET_KEY = 'your_secret_key'; // REMEMBER TO CHANGE THIS IN PRODUCTION
app.use(express.json());

const users = [
  { id: 1, username: 'testuser', password: 'password123' },
  { id: 2, username: 'admin', password: 'adminpassword' },
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid or expired token.');
    }
    req.user = user;
    next(); 
  });
};
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome to the dashboard, ${req.user.username}!`,
    userId: req.user.id,
  });
});
app.get('/', (req, res) => {
  res.send('This is a public route.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});