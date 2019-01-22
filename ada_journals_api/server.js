const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');

const app = express();

// Body parser stuff
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Configuration:
const database = require('./config/keys').mongoURI;

// Connect to MongoDB
// mongoose.set('useFindAndModify', true);
// mongoose.set('useCreateIndex', true);
mongoose
  .connect(database, { useNewUrlParser: true })
  .then(() => console.log('MongoDB is connected!'))
  .catch(err => console.log(err));
// mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds155714.mlab.com:55714/capstonec10', {
//   useNewUrlParser: true
// }, function(error){
//   if(error){
//     console.log(error);
//   } else{
//     console.log('MongoDB is connected!');
//   }
// });

// app.get('/', (req, res) => res.send('This is my server. Yay it is running! Look at it goooo!!!!!'));

// Passport configurations, Jwt Strategy
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);


const port = process.env.PORT || 3100;

app.listen(port, () => console.log(`My server is running on ${port}`));
