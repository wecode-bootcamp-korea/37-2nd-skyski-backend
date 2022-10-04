-- migrate:up
CREATE TABLE users (
    id int not null auto_increment primary key,
    kakao_id bigint not null UNIQUE,
    email varchar(100) not null UNIQUE,
    admin varchar(10) null
)

-- migrate:down
DROP TABLE users;
