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

 let statementWhere = 'WHERE po.stock != 0';

  if (size !== undefined)
    statementWhere += ` AND s.foot_size IN(` + String(size) + `)`;
  if (color !== undefined)
    statementWhere += ` AND c.id IN(` + String(color) + `)`;
  if (brand !== undefined)
    statementWhere += ` AND b.id IN(` + String(brand) + `)`;
  if (size === undefined && color === undefined && brand === undefined) {
    statementWhere = '';
  }

  if (sort !== undefined) {
    sort += ` ,p.id desc`;
  } else sort = `releaseDate desc ,p.id desc`;
