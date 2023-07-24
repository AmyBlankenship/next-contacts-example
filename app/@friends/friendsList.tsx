import {User} from '../../lib/users';
import './friends.css'
import FriendCard from "./friendCard";

type FriendsListParams = {friends: User[]; id?: string};

export default function FriendsList({ friends, id }: FriendsListParams) {
  return (<ul className="friends-list">
    {friends.map((friend) => {
      const className = friend.id.toString() === id ? 'selected': '';
      return (
        <li key={friend.id} className={className} >
          <FriendCard friend={friend}/>
        </li>
      )})
    }
  </ul>);
}