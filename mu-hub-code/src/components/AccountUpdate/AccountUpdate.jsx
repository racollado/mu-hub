/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AccountUpdate.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AccountUpdate({
  setLoading, setError, loggedIn,
}) {
  // **********************************************************************
  // CONSTANTS/VARIABLES
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [college, setCollege] = useState();
  const [otherInput, setOtherInput] = useState();

  // **********************************************************************
  // AXIOS FUNCTIONS (GET/POST)
  // **********************************************************************

  // TODO: Store account info in database
  // TODO: Write function comment
  async function postAccountUpdate() {
    try {
      const { data } = await axios.post(`/api/account_update?college=${college}&other=${otherInput}`);
      // console.log('response: ', data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS
  // **********************************************************************

  const handleOnAccountUpdateSubmit = async () => {
    setLoading(true);
    await postAccountUpdate();
    navigate('/');
  };

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************

  // TODO: Get old values from account database
  // TODO: Display old values in their respective input fields
  return (
    <div className="AccountUpdate">
      <form
        onSubmit={(e) => { e.preventDefault(); handleOnAccountUpdateSubmit(); }}
      >
        <br />
        <label htmlFor="college">
          {'College: '}
          <br />
          <input
            type="text"
            id="college"
            name="college"
            onChange={(e) => setCollege(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="otherInput">
          {'Other Input: '}
          <br />
          <input
            type="text"
            id="otherInput"
            name="otherInput"
            onChange={(e) => setOtherInput(e.target.value)}
          />
        </label>
        <br />
        <input
          className="action-button"
          type="submit"
          value="Submit"
          onClick={handleOnAccountUpdateSubmit}
        />
      </form>
      {loggedIn ? (
        <button
          className="action-button"
          type="button"
          onClick={() => navigate('/')}
        >
          Return Home
        </button>
      ) : null}
    </div>
  );
}

export default AccountUpdate;
