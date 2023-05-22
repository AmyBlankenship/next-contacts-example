exports.up = async function (sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS Users (
      id serial primary key,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      avatar_url VARCHAR(150)
    )
  `
}

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS Users
  `
}
