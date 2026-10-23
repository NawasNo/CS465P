const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.urlencoded({ extended: false }));

app.get('/form', (req, res) => {
  res.sendFile(`${__dirname}/form.html`);
});

app.post('/submit', (req, res) => {
  const {
    username,
    email,
    comments,
    newsletter,
  } = req.body;

  const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const newsletterStatus = newsletter === 'yes' ? 'Yes' : 'No';

  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send(`
    <h1>Form Submission Results</h1>
    <p>Username: ${escapeHtml(username)}</p>
    <p>Email: ${escapeHtml(email)}</p>
    <p>Comments: ${escapeHtml(comments)}</p>
    <p>Newsletter Signup: ${newsletterStatus}</p>
  `);
});

app.use((req, res) => {
  res.status(404);
  res.set({ 'Content-Type': 'text/html' });
  res.send('<h1>404 - page not found</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
