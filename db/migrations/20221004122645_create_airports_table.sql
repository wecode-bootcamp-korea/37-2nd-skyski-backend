-- migrate:up
CREATE TABLE airports (
    id int not null auto_increment primary key,
    name varchar(100) not null UNIQUE,
    region_id int not null,
    latitude decimal(8, 5) not null,
    longitude decimal(8, 5) not null,
    CONSTRAINT region_id_fkey foreign key (region_id) references regions (id)
)

-- migrate:down
DROP TABLE airports;
