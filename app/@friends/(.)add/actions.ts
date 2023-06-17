'use server';
import { create } from '../../../lib/users';
import {revalidatePath} from "next/cache";
export const addMe = async (data: FormData) => {
  const f_name = data.get('first_name')?.valueOf() || '';
  const l_name = data.get('last_name')?.valueOf() || '';
  // it always will be a string, this is for typescript
  const first_name = f_name.toString();
  const last_name = l_name.toString();
  const user = { first_name,  last_name };
  await create(user);
  revalidatePath('/');
};