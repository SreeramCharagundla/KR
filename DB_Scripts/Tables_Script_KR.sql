-- create DATABASE KammaniRuchulu;

CREATE TABLE user_profile (
    name VARCHAR(25) NOT NULL,
    country_code VARCHAR(5) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    PRIMARY KEY (phone_number)
);