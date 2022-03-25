CREATE TABLE user_roles (
    role_id INTEGER PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    role_id INTEGER REFERENCES user_roles(role_id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    deleted BOOLEAN

);

CREATE TABLE asessions (
    session_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    date_start DATE NOT NULL
);


INSERT INTO user_roles(role_id, role_name)
VALUES (1, 'admin'), (2, 'ord_user');