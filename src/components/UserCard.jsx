import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    about,
    age = 25,
    gender = "Male",
  } = user;

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="w-96 h-72 overflow-hidden">
        <img
          src={photoUrl}
          alt="Profile Photo"
          className="object-fill w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{fullName}</h2>
        <p>{`${age ? `${age}, ` : ``}${gender ? `${gender}` : ``}`}</p>
        <p>{about}</p>
        <div className="card-actions justify-center my-8">
          <button className="btn btn-secondary">{`Ignore`}</button>
          <button className="btn btn-accent">{`Interested`}</button>
        </div>
      </div>
    </div>
  );
};

// Prop validation
UserCard.prototype = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    about: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
};

export default UserCard;
