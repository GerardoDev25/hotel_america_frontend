import { Modal } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import ViewUsed from './ViewUsed';
import ViewFree from './ViewFree';
import { getByIdRoomAsync } from '../../../redux/ActionsAsync/roomAA';

const ModalComponent = styled(Modal)``;

const ModalCardRoomInfo = ({ modalVisible, handleOk, handleCancel, ids }) => {
  //

  const dispatch = useDispatch();
  const { registerId, roomId } = ids;

  useEffect(() => {
    roomId && dispatch(getByIdRoomAsync(roomId));
  }, [dispatch, roomId]);

  return (
    <ModalComponent visible={modalVisible} onOk={handleOk} onCancel={handleCancel} width={1300}>
      {registerId ? <ViewUsed registerId={registerId} /> : <ViewFree />}
    </ModalComponent>
  );
};

export default ModalCardRoomInfo;
