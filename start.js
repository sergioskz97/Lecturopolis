require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Express is running on port ${server.address().port}`);
});