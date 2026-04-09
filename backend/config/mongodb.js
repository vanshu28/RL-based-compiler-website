const mongodb = require('./MongoDBConnection');

const mongodbConfig = {
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DATABASE || 'rl-compiler',
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/rl-compiler'
};

module.exports = mongodbConfig;
