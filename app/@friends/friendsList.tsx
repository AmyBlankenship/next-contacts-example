import {User} from '../../lib/users';

type FriendsListParams = {friends: User[]}

export default function FriendsList({ friends }: FriendsListParams) {
  return (<ul></ul>);
}