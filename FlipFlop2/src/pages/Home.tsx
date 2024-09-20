import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/list">Go to List Page</Link>
      <Link to="/add">Go to Add Page</Link>
    </div>
  );
};

export default Home;
