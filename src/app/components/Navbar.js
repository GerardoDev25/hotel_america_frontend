import { Layout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout, selectAuth } from '../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';

const { Header } = Layout;

const HeaderMain = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const AvatarContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff } = useSelector(selectAuth);

  console.log(staff);

  const handleClick = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <HeaderMain className="site-layout-background">
      <AvatarContainer>
        <div style={{ color: 'red', display: 'flex' ,flexDirection:'column', height:'100%'}}>
          <span>{staff.name}</span>
          <span>{staff.role}</span>
        </div>
        <Avatar style={{ backgroundColor: 'red' }}>Um</Avatar>
      </AvatarContainer>

      <Button danger onClick={handleClick}>
        Logout
      </Button>
    </HeaderMain>
  );
};

export default Navbar;
