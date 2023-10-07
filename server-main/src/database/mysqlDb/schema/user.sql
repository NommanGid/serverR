CREATE TABLE users (
    id VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    university VARCHAR(255),
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL
)