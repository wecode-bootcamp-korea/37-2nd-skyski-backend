-- migrate:up
CREATE TABLE airlines (
    id int not null auto_increment primary key,
    name varchar(100) not null UNIQUE,
    image varchar(1000) not null
)

-- migrate:down
DROP TABLE airlines;
