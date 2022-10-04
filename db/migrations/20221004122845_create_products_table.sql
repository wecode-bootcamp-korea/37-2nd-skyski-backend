-- migrate:up
CREATE TABLE products (
    id int not null auto_increment primary key,
    agency_id int not null,
    price decimal(10, 0) not null,
    eco boolean,
    CONSTRAINT agency_id_fkey foreign key (agency_id) references agencies (id)
)

-- migrate:down
DROP TABLE products;
