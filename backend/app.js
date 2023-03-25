require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const authRouter = require('./routes/authRouter');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT = process.env.PORT || 3000;

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));

app.use('/api/auth', authRouter);

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server listening port ${PORT}`);
  })
  .on('error', (error) => {
    console.log(`Connecting error: ${error.message}`);
  });
