require('dotenv').config();


const required = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
required.forEach(key => {
  if (!process.env[key]) throw new Error(`Missing env variable: ${key}`);
});

module.exports = {
  PORT:        process.env.PORT || 8080,
  MONGO_URI:   process.env.MONGO_URI,
  JWT_SECRET:  process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
  NODE_ENV:    process.env.NODE_ENV || 'development',
};