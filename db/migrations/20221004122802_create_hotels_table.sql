-- migrate:up
CREATE TABLE hotels (
    id int not null auto_increment primary key,
    name varchar(100) not null UNIQUE,
    image varchar(1000) not null,
    rate decimal(3, 2),
    latitude decimal(8, 5) not null,
    longitude decimal(8, 5) not null,
    region_id int not null,
    user_id int not null,
    CONSTRAINT user_id_fkey foreign key (user_id) references users (id),
    CONSTRAINT regionn_id_fkey foreign key (region_id) references regions (id)
)

-- migrate:down
DROP TABLE hotels;
