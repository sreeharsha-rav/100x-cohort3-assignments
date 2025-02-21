import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const UserCard = ({ imgURL, name }) => {
  return (
    <div className="card bg-base-200 flex flex-col gap-4 p-4 w-48 rounded-lg border-2 border-base-300">
      <figure>
        <img
          src={imgURL}
          alt="random user"
          className="rounded-full w-32 h-32 mx-auto mt-4 border-2 border-neutral"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title">
          {name.title + " " + name.first + " " + name.last}
        </h2>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.object.isRequired,
};

const RandomUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://randomuser.me/api/?results=5&&page=${page}`
      );
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreUsers = () => {
    console.log(`Loading more users...`);
    setPage((prevPage) => prevPage + 1);
    handleFetchUsers();
  };

  useEffect(() => {
    console.log(`Component mounted, fetching users...`);
    handleFetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {users.map((user, index) => (
          <UserCard key={index} imgURL={user.picture.large} name={user.name} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="btn btn-primary"
          onClick={loadMoreUsers}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More Users"}
        </button>
      </div>
    </>
  );
};

export default RandomUser;
