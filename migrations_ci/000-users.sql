CREATE TABLE IF NOT EXISTS Users (
  id serial primary key,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  avatar_url VARCHAR(150)
)