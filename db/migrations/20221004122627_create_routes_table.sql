-- migrate:up
CREATE TABLE routes (
    id int not null auto_increment primary key,
    departure int not null,
    arrival int not null,
    CONSTRAINT departure_fkey foreign key (departure) references regions (id),
    CONSTRAINT arrival_fkey foreign key (arrival) references regions (id)
)

-- migrate:down
DROP TABLE routes;
