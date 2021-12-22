const { Pool } = require('pg');

let cfg = require('./config.json');

let pool = new Pool(cfg.database);

module.exports = pool;