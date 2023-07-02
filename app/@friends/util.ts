export const getUsers = async () => {
  const result = await fetch(
    `${process.env.HOSTNAME}api/users`,
    { method: 'GET', cache: 'no-store', }
  );
  if (result.ok) {
    return result.json();
  }
  return [];
}