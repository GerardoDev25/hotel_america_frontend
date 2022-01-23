import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../redux/reducers/auth';

const NotFoundPage = () => {
  const auth = useSelector(selectAuth);
  const navigator = useNavigate();

  useEffect(() => {
    if (!auth.login) navigator('/login', { replace: true });
    else navigator('/dashboard', { replace: true });
  }, [auth, navigator]);

  return <></>;
};

export default NotFoundPage;
