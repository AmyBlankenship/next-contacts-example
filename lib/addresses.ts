import sql from './db'

export interface Address {
  id: number;
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zip: string;
  user_id: number;
}

export async function list(user_id: string) {
  return sql<Address[]>`
    SELECT id, line_1, line_2, city, state, zip, user_id FROM Address
    WHERE user_id=${user_id}
    ORDER BY id
  `;
}
export async function pick(id: string) {
  return sql<Address[]>`
    SELECT id, line_1, line_2, city, state, zip, user_id FROM Address
    WHERE id=${id}
    ORDER BY id
  `;
}

export async function create(address: Address) {
  return sql<Address[]>`
    INSERT INTO Address (line_1, line_2, city, state, zip, user_id) 
    VALUES (
      ${address.line_1},
      ${address.line_2},
      ${address.city},
      ${address.state},
      ${address.zip},
      ${address.user_id}
    )
    RETURNING id, line_1, line_2, city, state, zip, user_id
  `;
}

export async function update(address: Address) {
  return sql<Address[]>`
    UPDATE Address SET (line_1, line_2, city, state, zip, user_id) =
    (
      ${address.line_1},
      ${address.line_2},
      ${address.city},
      ${address.state},
      ${address.zip},
      ${address.user_id}
    )
    WHERE id=${address.id}
    RETURNING id, line_1, line_2, city, state, zip, user_id
  `;
}

export async function remove(id: string) {
  return sql<Address[]>`
    DELETE FROM Address WHERE id=${id}
    RETURNING id, line_1, line_2, city, state, zip, user_id
  `;
}
