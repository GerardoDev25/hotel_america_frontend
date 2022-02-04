import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import { selectAuth } from '../../redux/reducers/auth';

import Admin from '../../views/Admin';
import Laundry from '../../views/Laundry';
import NotFound from '../../views/NotFound';
import Cafeteria from '../../views/Cafeteria';
import Reception from '../../views/Reception';

const { Content } = Layout;

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
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: '100vh',
        height: 'auto',
        backgroundColor:'blue !important'
      }}
    >
      <View />
    </Content>
  );
};

export default ContentComponent;
