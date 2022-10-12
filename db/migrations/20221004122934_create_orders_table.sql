-- migrate:up
CREATE TABLE orders (
    id int not null auto_increment primary key,
    number int not null UNIQUE,
    flight_id int not null,
    user_id int not null,
    CONSTRAINT userr_id_fkey foreign key (user_id) references users (id),
    CONSTRAINT flight_id_fkey foreign key (flight_id) references flights (id)
)

-- migrate:down
DROP TABLE orders;

