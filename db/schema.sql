\c postgres;
-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

\c ecommerce_db;

-- Since using Sequelize, don't need to write tables manually now:

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(250) NOT NULL UNIQUE,
--     password VARCHAR(250) NOT NULL
-- );

-- CREATE TABLE meals (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(250) NOT NULL,
--     serving_size INT NOT NULL,
--     type VARCHAR(100) NOT NULL,
--     day_of_week VARCHAR(100) NOT NULL,
--     user_id INT NOT NULL,
--     FOREIGN KEY (user_id)
--         REFERENCES users(id)
--         ON DELETE CASCADE
-- );

