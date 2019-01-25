import React from 'react';
import { Link } from 'react-router-dom';

const ProfileButtons = () => {
  return (
    <div>
      <div className="btn-group mt-4 mr-3">
        <Link to="/edit-profile" className="btn btn-dark">
          <i className="fas fa-heart" /> Edit Profile
        </Link>
      </div>

      <div className="btn-group mt-4 mr-3">
        { /* <Link to="/delete-profile" className="btn btn-danger">
          <i className="fa fas-pen-fancy text-info mr-1" /> Delete Account
        </Link> */ }
      </div>
    </div>

  )
}

export default ProfileButtons;
