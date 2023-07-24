'use server';
import {update} from '../../../../lib/users';
import {revalidatePath} from "next/cache";
export const updateFriend = async(data:FormData) => {
  const f_name = data.get('first_name')?.valueOf() || '';
  const l_name = data.get('last_name')?.valueOf() || '';
  const user_id = data.get('id')?.valueOf() || '';
  // it always will be a string, this is for typescript
  const first_name = f_name.toString();
  const last_name = l_name.toString();
  const id = parseInt(user_id as string);
  await update({first_name, last_name, id, avatar_url: ''});
  revalidatePath('/');
}