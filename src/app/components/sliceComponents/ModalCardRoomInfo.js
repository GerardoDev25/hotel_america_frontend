import { Modal } from 'antd';
// import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { getByIdRegisterAsync } from '../../redux/ActionsAsync/registerAA';
import { useEffect } from 'react';

const ModalComponent = styled(Modal)``;

const ModalCardRoomInfo = ({ modalVisible, handleOk, handleCancel, registerId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    registerId && dispatch(getByIdRegisterAsync(registerId));
    console.log('componenete montado');
    return () => {
      console.log('componenete desmontado');
    };
  }, [registerId, dispatch]);

  return (
    <ModalComponent visible={modalVisible} onOk={handleOk} onCancel={handleCancel} width={1300}>
      {registerId}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur adipisci ipsam voluptas labore, culpa temporibus sit obcaecati esse
        dolor tempore in, ea magni! Error esse ipsum natus itaque, nobis eligendi!
      </p>
    </ModalComponent>
  );
};

export default ModalCardRoomInfo;
