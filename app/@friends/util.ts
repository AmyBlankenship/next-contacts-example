export const getUsers = async () => {
  await fetch(`${process.env.HOSTNAME}api/checkDraftMode`)
  const result = await fetch(
    `${process.env.HOSTNAME}api/users`,
    { method: 'GET', cache: 'no-store', }
  );
  if (result.ok) {
    return result.json();
  }
  return [];
}