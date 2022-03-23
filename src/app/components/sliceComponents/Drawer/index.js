import { Button, Drawer, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';

const DrawerComponet = () => {
  const disptch = useDispatch();
  const { visible, action, placement, width } = useSelector(selectDrawer);

  const handleClose = () => {
    disptch(drawerClose());
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
            OK
          </Button>
        </Space>
      }
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ex nisi, quam ea consectetur eius earum veritatis eos
        quos architecto possimus nam omnis tenetur culpa nihil? Saepe iusto repudiandae quod.
      </p>
    </Drawer>
  );
};

export default DrawerComponet;
