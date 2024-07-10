const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost/socialDB';

connect(connectionString);

module.exports = connection;