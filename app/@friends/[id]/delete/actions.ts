'use server';
import {remove} from '../../../../lib/users';
import {revalidatePath} from "next/cache";

export const eradicateFriend = async(data:FormData) => {
  const user_id = data.get('id')?.valueOf() || '';
  await remove(user_id.toString());
  revalidatePath('/');
}