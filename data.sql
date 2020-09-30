
CREATE TABLE users
(
    id  uuid DEFAULT uuid_generate_v4 (),
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT Now()
);

CREATE TABLE posts
(
    id uuid DEFAULT uuid_generate_v4 (),
    userId VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    text VARCHAR(255) NOT NULL,
    created_At TIMESTAMPTZ DEFAULT Now()

);