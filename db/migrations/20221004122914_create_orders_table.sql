-- migrate:up
CREATE TABLE orders (
    id int not null auto_increment primary key,
    number int not null UNIQUE,
    product_id int not null,
    user_id int not null,
    CONSTRAINT userr_id_fkey foreign key (user_id) references users (id),
    CONSTRAINT productt_id_fkey foreign key (product_id) references products (id)
)

-- migrate:down
DROP TABLE orders;
