import { useState } from 'react';
import { Link } from 'react-router-dom';
import { invoke } from '@tauri-apps/api/tauri';

const AddPage = () => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');

  const handleAddUser = async () => {
    try {
      await invoke('add_user', { id, name });
      setId(0);
      setName("");
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <input
        type="number"
        placeholder="Enter user ID"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>
      <br />
      <Link to="/">Back home</Link>
    </div>
  );
};

export default AddPage;
