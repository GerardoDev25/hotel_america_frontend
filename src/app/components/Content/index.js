import { Layout } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuth } from '../../redux/reducers/auth';
import { clesedPanel, selectNavbar } from '../../redux/reducers/navbar';

import Admin from './views/Admin';
import Laundry from './views/Laundry';
import NotFound from './views/NotFound';
import Cafeteria from './views/Cafeteria';
import Reception from './views/Reception';
import { useCallback } from 'react';

const { Content } = Layout;

const ContentStyled = styled(Content)`
  width: 100%;
  height: 86%;
  max-width: 1450px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentComponent = () => {
  const dispach = useDispatch();
  const { staff } = useSelector(selectAuth);
  const { panel } = useSelector(selectNavbar);
  const { role } = staff;

  const handleClick = (e) => {
    e.stopPropagation();
    panel && dispach(clesedPanel());
  };

  console.log('me volvi a llamar index view');

  const View = useCallback(() => {
    switch (role) {
      case 'role_admin':
        return <Admin />;

      case 'role_laundry':
        return <Laundry />;

      case 'role_reception':
        return <Reception />;

      case 'role_Cafeteria':
        return <Cafeteria />;

      default:
        return <NotFound />;
    }
  }, [role]);

  return (
    <ContentStyled className="site-layout-background" onClick={handleClick}>
      <View />
    </ContentStyled>
  );
};

export default ContentComponent;
