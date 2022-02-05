import { Layout } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectAuth } from '../../redux/reducers/auth';

import Admin from './views/Admin';
import Laundry from './views/Laundry';
import NotFound from './views/NotFound';
import Cafeteria from './views/Cafeteria';
import Reception from './views/Reception';

const { Content } = Layout;

const ContentStyled = styled(Content)`
  width: 100%;
  height: 86%;
`;

const ContentComponent = () => {
  const { staff } = useSelector(selectAuth);
  const { role } = staff;

  const View = () => {
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
  };

  return (
    <ContentStyled className="site-layout-background">
      <View />
    </ContentStyled>
  );
};

export default ContentComponent;
