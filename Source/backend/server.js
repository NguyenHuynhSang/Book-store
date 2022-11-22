import express from 'express';
import data from './tempdata.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
const app = express();
// app.use(express.json());

const swaggerOption = {
  swaggerDefinition: {
    info: {
      title: 'Doc',
      description: 'api doc',
      contact: {
        name: 'NHS',
      },
      server: 'http://localhost:5000',
    },
  },
  apis: ['server.js'],
};
const swaggerDocument = swaggerJsDoc(swaggerOption);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
/**
 * @swagger
 * /Books
 * get
 *  description: bla bla bla
 *  responses:
 *    '200':
 *      description: done
 */
app.get('/api/books', (req, res) => {
  res.send(data.books);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
