import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuth } from '../redux/reducers/auth';
import { loginAsync } from '../redux/ActionsAsync/authAA';

// * styled components
const Title = styled.h1`
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  background-color: #eee;
  padding: 2.5rem;
  border-radius: 0.5rem;
`;

const LoginPage = () => {
  //

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { login } = useSelector(selectAuth);

  const [fields, setFields] = useState({
    username: '',
    password: '',
  });

  const [click, setClick] = useState(false);

  useEffect(() => {
    if (login) navigator('/dashboard', { replace: true });
  }, [login, navigator]);

  const { username, password } = fields;

  const handleChange = ({ target }) => {
    setFields({ ...fields, [target.name]: target.value });
  };

  const handleSubmit = () => {
    dispatch(loginAsync(fields));
  };

  const handleClick = () => setClick(true);

  return (
    <Container>
      <Main>
        <Title>login</Title>
        <Form
          name="login"
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input value={username} name="username" onChange={handleChange} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password value={password} name="password" onChange={handleChange} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleClick}
              disabled={!username || !password}
              icon={click && <LoadingOutlined />}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Main>
    </Container>
  );
};

export default LoginPage;
