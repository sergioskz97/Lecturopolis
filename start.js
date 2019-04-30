require('dotenv').config();

const app = require('./app');

const server = app.listen(process.env.PORT, () => {
  console.log(`Express is running on port ${server.address().port}`);
});