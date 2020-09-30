const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "Hassan",
    password: "236932",
    database: "socialnetwork",
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
  });

  module.exports = { pool  };