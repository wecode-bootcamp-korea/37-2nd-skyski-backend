-- migrate:up
CREATE TABLE regions (
    id int not null auto_increment primary key,
    name varchar(100) not null UNIQUE
)

-- migrate:down
DROP TABLE regions;
