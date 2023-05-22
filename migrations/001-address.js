exports.up = async function (sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS Address (
      id serial primary key,
      line_1 VARCHAR(100),
      line_2 VARCHAR (100),
      city VARCHAR(50),
      state VARCHAR(2),
      zip VARCHAR(10),
      user_id INT REFERENCES orders ON DELETE CASCADE,
      FOREIGN KEY (user_id) references Users(id)
    )
  `
}

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS Address
  `
}
