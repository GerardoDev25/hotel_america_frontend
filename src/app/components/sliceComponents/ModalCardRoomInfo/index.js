import { Popconfirm, Modal, Button } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { drawerActions, minZise } from '../../../helpers/settings';

import { getByIdRoomAsync } from '../../../redux/ActionsAsync/roomAA';

import ViewUsed from './ViewUsed';
import ViewFree from './ViewFree';
import { calculateWidth } from '../../../helpers';
import { drawerOpen } from '../../../redux/reducers/drawer';

const ModalComponent = styled(Modal)`
  min-width: ${minZise} !important;
`;

const ModalCardRoomInfo = ({ ids, handleOk, modalVisible, setModalVisible }) => {
  //

  const text = 'Are you sure to make this operation?';

  const dispatch = useDispatch();
  const { registerId, roomId } = ids;

  useEffect(() => {
    roomId && dispatch(getByIdRoomAsync(roomId));
  }, [dispatch, roomId]);

  const handleUpdate = () => {
    dispatch(drawerOpen({ width: calculateWidth(), action: drawerActions.updateRegister }));
    handleOk();
  };

  const handleOpenDrawer = () => {
    console.log('make open drawer');
    dispatch(
      drawerOpen({
        width: calculateWidth(),
        action: registerId ? drawerActions.checkOut : drawerActions.checkIn,
        id: registerId || roomId,
      })
    );
    handleOk();
  };

  const footer = [
    <Button key="ok" type="primary" onClick={handleOk}>
      ok
    </Button>,
    <Button key="update" type="ghost" style={{ display: registerId ? 'inline-block' : 'none' }} danger onClick={handleUpdate}>
      Update
    </Button>,
    <Popconfirm key="make" placement="topLeft" title={text} onConfirm={handleOpenDrawer} okText="Yes" cancelText="No">
      <Button type="ghost" danger>
        {registerId ? 'Make CheckOut' : 'Make CheckIn'}
      </Button>
    </Popconfirm>,
  ];

  return (
    <ModalComponent footer={footer} visible={modalVisible} onOk={handleOk} onCancel={handleOk} width={1300}>
      {registerId ? <ViewUsed setModalVisible={setModalVisible} registerId={registerId} /> : <ViewFree />}
    </ModalComponent>
  );
};

export default ModalCardRoomInfo;
