import { Modal, Button } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { minZise } from '../../../helpers/settings';

import { getByIdRoomAsync } from '../../../redux/ActionsAsync/roomAA';

import ViewUsed from './ViewUsed';
import ViewFree from './ViewFree';

const ModalComponent = styled(Modal)`
  min-width: ${minZise} !important;
`;

const ModalCardRoomInfo = ({ ids, handleOk, modalVisible }) => {
  //

  const dispatch = useDispatch();
  const { registerId, roomId } = ids;

  useEffect(() => {
    roomId && dispatch(getByIdRoomAsync(roomId));
  }, [dispatch, roomId]);

  const handleCheckIn = () => {
    console.log('make check in');
  };

  const handleCheckOut = () => {
    console.log('make check out');
  };

  const footer = [
    <Button key="ok" type="primary" onClick={handleOk}>
      ok
    </Button>,
    <Button key="make" type="ghost" danger onClick={registerId ? handleCheckOut : handleCheckIn}>
      {registerId ? 'Make CheckOut' : 'Make CheckIn'}
    </Button>,
  ];

  return (
    <ModalComponent footer={footer} visible={modalVisible} onOk={handleOk} onCancel={handleOk} width={1300}>
      {registerId ? <ViewUsed registerId={registerId} /> : <ViewFree />}
    </ModalComponent>
  );
};

export default ModalCardRoomInfo;
