-- migrate:up
CREATE TABLE users (
    id int not null auto_increment primary key,
    email varchar(100) not null UNIQUE,
    password varchar(500) not null,
    admin varchar(10) null
)

-- migrate:down
DROP TABLE users;
