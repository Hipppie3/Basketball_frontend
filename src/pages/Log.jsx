import { useRef, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Log = () => {
  const { setLoggedIn } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]); // Empty dependency array to check on component mount and refresh

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
    setSuccess(true);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://agile-reef-32463-2ad3559c3e00.herokuapp.com/login', {
      username,
      password
    });

    const { success } = response.data;
    if (success) {
      const accessToken = response.headers['access-token'];
      localStorage.setItem('token', accessToken);
      handleLoginSuccess(accessToken); // Call handleLoginSuccess with the accessToken
      setSuccess(true);
    } else {
      setErrMsg('Login Failed');
      errRef.current.focus();
    }
  } catch (err) {
    if (!err?.response) {
      setErrMsg('No Server Response');
    } else if (err.response.status === 400) {
      setErrMsg('Missing Username or Password');
    } else if (err.response.status === 401) {
      setErrMsg('Unauthorized');
    } else {
      setErrMsg('Login Failed');
    }
    errRef.current.focus();
  }
};


  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* put router link here */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Log;
