import sql from './db'

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export async function list() {
  return sql<User[]>`
    SELECT id, first_name, last_name, avatar_url FROM Users
    ORDER BY id
  `;
}

export async function pick(userId: string) {
  const id = parseInt(userId);
  return sql<User[]>`
    SELECT id, first_name, last_name, avatar_url FROM Users
    WHERE id=${id}
  `;
}

export async function create(user: Partial<User>) {
  return sql<User[]>`
    INSERT INTO Users (first_name, last_name, avatar_url) 
    VALUES (${user.first_name ?? ''}, ${user.last_name ?? ''}, '')
    RETURNING id, first_name, last_name, avatar_url
  `;
}

export async function update(user: User) {
  return sql<User[]>`
    UPDATE Users SET
      first_name=${user.first_name},
      last_name=${user.last_name},
      avatar_url=''
    WHERE id=${user.id}
    RETURNING id, first_name, last_name, avatar_url
  `;
}

export async function remove(userId: string) {
  const id = parseInt(userId);
  return sql<User[]>`
    DELETE FROM Users WHERE id=${id}
    RETURNING id, first_name, last_name, avatar_url
  `;
}
