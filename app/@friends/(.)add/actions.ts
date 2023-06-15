'use server';
import { create } from '../../../lib/users';
export const addMe = async (data: FormData) => {
  'use server';
  const f_name = data.get('first_name')?.valueOf() || '';
  const l_name = data.get('last_name')?.valueOf() || '';
  // it always will be a string, this is for typescript
  const first_name = (typeof f_name) === 'string' ? f_name : JSON.stringify(f_name);
  const last_name = (typeof l_name) === 'string' ? l_name : JSON.stringify(l_name);
  const user = { first_name,  last_name };
  create(user);
};