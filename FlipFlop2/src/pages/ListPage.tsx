import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';

interface User {
  id: number;
  name: string;
}

interface Data {
  users: User[];
}

const ListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result: Data = await invoke('get_users');
        setUsers(result.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
      <Link to="/">Back home</Link>
    </div>
  );
};

export default ListPage;
