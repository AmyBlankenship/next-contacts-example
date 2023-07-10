import postgres from 'postgres';
const sql = postgres(
  process.env.DATABASE_URL as string,
  {
    idle_timeout: 5,
    max_lifetime: 60 * 5,
    max: 10,
  }
)

export default sql
