import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="mb-4">You are logged in as: {user.username}</p>
      <p>This is protected content that only authenticated users can see.</p>
    </div>
  );
};

export default Home;
