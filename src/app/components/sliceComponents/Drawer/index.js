import styled from 'styled-components';
import { Button, Drawer, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { drawerActions } from '../../../helpers/settings';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';

import GoestForm from './GoestForm';
import AmountForm from './AmountForm';
import MakeChekOut from './MakeChekOut';
import LodgingForm from './LodgingForm';
import RegisterForm from './RegisterForm';
import NotFoundForm from './NotFoundForm';

const ViewContainer = styled.div`
  width: 100%;
  overflow: auto;
  min-width: 390px;
  min-height: 600px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  /* outline: 2px dotted black; */
`;

const DrawerComponet = () => {
  const disptch = useDispatch();
  const { visible, action, placement, width } = useSelector(selectDrawer);

  const handleClose = () => {
    disptch(drawerClose());
  };

  const View = () => {
    if (action === drawerActions.checkOut) return <MakeChekOut />;
    else if (action === drawerActions.updateLodging) return <LodgingForm />;
    else if (action === drawerActions.addGoest || action === drawerActions.updateGoest) return <GoestForm />;
    else if (action === drawerActions.addAcount || action === drawerActions.updateAcount) return <AmountForm />;
    else if (action === drawerActions.checkIn || action === drawerActions.updateRegister) return <RegisterForm />;
    else return <NotFoundForm />;
  };

  return (
    <Drawer
      title={action}
      placement={placement}
      width={width}
      onClose={handleClose}
      visible={visible}
      extra={
        <Space>
          <Button type="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Space>
      }
    >
      <ViewContainer>
        <View />
      </ViewContainer>
    </Drawer>
  );
};

export default DrawerComponet;
