import { Modal } from 'antd';
// import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal, clesedModal } from '../../redux/reducers/modal';

const ModalComponent = styled(Modal)`
  width: 90%;
  height: 90vh !important;
`;

const ModalCardRoomInfo = ({ registerId }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(selectModal);

  const handleOk = () => {
    dispatch(clesedModal());
  };

  const handleCancel = () => {
    dispatch(clesedModal());
  };

  return (
    <ModalComponent visible={isOpen} onOk={handleOk} onCancel={handleCancel} width={1300}>
      {registerId}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur adipisci ipsam voluptas labore, culpa temporibus sit obcaecati esse
        dolor tempore in, ea magni! Error esse ipsum natus itaque, nobis eligendi!
      </p>
    </ModalComponent>
  );
};

export default ModalCardRoomInfo;
