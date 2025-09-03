const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered
app.use(express.urlencoded({ extended: true }));

app.get('/form', (req, res) => {
    res.status(200);
    res.send(`
      <h1>Contact Form</h1>
      <form method="POST" action="/submit">
        <label>Name:</label><br/>
        <input type="text" name="name" required /><br/><br/>
  
        <label>Email:</label><br/>
        <input type="email" name="email" required /><br/><br/>
  
        <label>Comments:</label><br/>
        <textarea name="comments" rows="4" cols="30"></textarea><br/><br/>
  
        <label>
          <input type="checkbox" name="subscribe" value="yes" />
          Subscribe to newsletter
        </label><br/><br/>
  
        <button type="submit">Submit</button>
      </form>
    `);
  });


app.post('/submit', (req, res) => {
    const {name, email, comments, subscribe} = req.body;

    res.send(`
        <h1>Form Submitted!</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Comments:</strong> ${comments}</p>
        <p><strong>Subscribe to news letter?:</strong> ${subscribe ? "Yes" : "No"}</p>
        `);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

