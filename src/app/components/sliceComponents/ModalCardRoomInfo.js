import { Modal } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';

const ModalComponent = styled(Modal)`
  width: 90%;
  height: 90vh !important;
`;

const ModalCardRoomInfo = ({ modalVisible, handleOk, handleCancel, registerId }) => {
  useEffect(() => {
    console.log('componenete montado');
    return () => {
      console.log('componenete desmontado');
    };
  }, []);

  return (
    <ModalComponent visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
      {registerId}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur adipisci ipsam voluptas labore, culpa temporibus sit obcaecati esse
        dolor tempore in, ea magni! Error esse ipsum natus itaque, nobis eligendi!
      </p>
    </ModalComponent>
  );
};

export default ModalCardRoomInfo;
