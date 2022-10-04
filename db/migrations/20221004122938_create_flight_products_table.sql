-- migrate:up
CREATE TABLE flight_products (
    id int not null auto_increment primary key,
    flight_id int not null,
    product_id int not null,
    CONSTRAINT flight_id_fkey foreign key (flight_id) references flights (id),
    CONSTRAINT product_id_fkey foreign key (product_id) references products (id)
)

-- migrate:down
DROP TABLE flight_products;
