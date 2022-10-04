-- migrate:up
CREATE TABLE routes (
    id int not null auto_increment primary key,
    departure int not null,
    arrival int not null,
    UNIQUE KEY (departure, arrival),
    CONSTRAINT departure_fkey foreign key (departure) references airports (id),
    CONSTRAINT arrival_fkey foreign key (arrival) references airports (id)
)

-- migrate:down
DROP TABLE routes;
