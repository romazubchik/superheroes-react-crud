const Pool  = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'superheroes',
    password: '1532',
    port: 5432,
});

module.exports = pool;