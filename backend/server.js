import express from 'express';
import data from './tempdata.js';

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
  res.send(data.books);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
