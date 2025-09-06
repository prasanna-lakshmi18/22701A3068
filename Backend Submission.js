const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // REMEMBER TO CHANGE THIS IN PRODUCTION
const users = [];
const shortenedUrls = {}; 


app.use(express.json());

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

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const userExists = users.some(u => u.username === username);
  if (userExists) {
    return res.status(409).send('Username already exists.');
  }

  const userId = users.length + 1;
  const newUser = { id: userId, username, password };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }

  
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  
  res.json({ token });
});

app.get('/my-urls', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userUrls = shortenedUrls[userId] || [];

  res.json({
    message: `Here are the URLs you've shortened, ${req.user.username}:`,
    urls: userUrls
  });
});

app.post('/shorturls', authenticateToken, (req, res) => {
  const { url, shortcode } = req.body;
  const userId = req.user.id;

  if (!url) {
    return res.status(400).send('Original URL is required.');
  }

  const finalShortcode = shortcode || Math.random().toString(36).substring(2, 8);
  
  
  const isShortcodeTaken = Object.values(shortenedUrls).flat().some(item => item.shortcode === finalShortcode);
  
  if (isShortcodeTaken) {
    return res.status(409).send('Custom shortcode is already taken. Please try another.');
  }

  const newUrl = {
    originalUrl: url,
    shortcode: finalShortcode,
    createdAt: new Date().toISOString()
  };

  
  if (!shortenedUrls[userId]) {
    shortenedUrls[userId] = [];
  }
  shortenedUrls[userId].push(newUrl);

  res.status(201).json({
    message: 'URL shortened successfully.',
    shortcode: finalShortcode,
    fullUrl: `http://localhost:${PORT}/${finalShortcode}`
  });
});


app.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  
  const urlEntry = Object.values(shortenedUrls).flat().find(item => item.shortcode === shortcode);

  if (!urlEntry) {
    return res.status(404).send('Shortened URL not found.');
  }

  res.redirect(urlEntry.originalUrl);
});

app.get('/', (req, res) => {
  res.send('This is a public route. You can access it without a token.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
