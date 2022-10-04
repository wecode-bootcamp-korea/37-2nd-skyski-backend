-- migrate:up
CREATE TABLE agencies (
    id int not null auto_increment primary key,
    name varchar(100) not null UNIQUE,
    rate decimal(3, 2) not null
)

-- migrate:down
DROP TABLE agencies;
