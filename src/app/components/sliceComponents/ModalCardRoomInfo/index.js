import { Modal } from 'antd';
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
