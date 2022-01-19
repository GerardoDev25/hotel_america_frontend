import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Login } from '../components/buttons';
import { loginAsync, selectAuth } from '../redux/reducers/auth';

const LoginPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    console.log(auth);
  }, [auth]);


  const handleClick = () => {
    dispatch(loginAsync());
  };

  return (
    <>
      <h1>Login page</h1>
      <br />
      <Login color="red" onClick={handleClick}>
        {' '}
        Login
      </Login>
    </>
  );
};

export default LoginPage;
