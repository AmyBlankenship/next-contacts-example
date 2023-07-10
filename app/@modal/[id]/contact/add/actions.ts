import {create} from "../../../../../lib/addresses";
import {formHelper} from "../../../../../lib/util";
import {revalidatePath} from "next/cache";

const contactKeys = [
  'line_1',
  'line_2',
  'city',
  'state',
  'zip',
  'user_id',
] as const;

export const addContact = async (data: FormData) => {
  const request = formHelper(data, contactKeys);
  await create(request);
  revalidatePath(`/${request.user_id}`);
}