import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';

const DrawerComponet = () => {
  const disptch = useDispatch();
  const { visible, action, placement, width } = useSelector(selectDrawer);

  const handleClose = () => {
    disptch(drawerClose());
  };

  return <Drawer title={action} placement={placement} width={width} onClose={handleClose} visible={visible}></Drawer>;
};

export default DrawerComponet;
