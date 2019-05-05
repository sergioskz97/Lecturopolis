const mongoose = require('mongoose');

// DB connection 

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://admin:usabilidadsyj@cluster0-gwrdx.mongodb.net/lecturopolis?retryWrites=true', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('db connected'))
  .catch(err => console.error(err));