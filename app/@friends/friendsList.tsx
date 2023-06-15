import {User} from '../../lib/users';
import './friends.css'
import FriendCard from "./friendCard";

type FriendsListParams = {friends: User[]}

export default function FriendsList({ friends }: FriendsListParams) {
  return (<ul className="friends-list">
    {friends.map((friend) => {
      return (
        <li key={friend.id} >
          <FriendCard friend={friend}/>
        </li>
      )})
    }
  </ul>);
}