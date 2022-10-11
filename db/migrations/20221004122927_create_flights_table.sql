-- migrate:up
CREATE TABLE flights (
    id int not null auto_increment primary key,
    duration int not null,
    seat varchar(100) not null,
    departure_date datetime not null,
    arrival_date datetime not null,
    route_id int not null,
    airline_id int not null,
    price int not null,
    eco varchar(100) null,
    CONSTRAINT route_id_fkey foreign key (route_id) references routes (id),
    CONSTRAINT airline_id_fkey foreign key (airline_id) references airlines (id)
)

-- migrate:down
DROP TABLE flights;
