import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const AppBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-primary shadow-sm">
      <div className="flex items-center justify-between w-full p-4">
        <h1 className="text-white text-xl font-bold">My App</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user.username}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppBar;
