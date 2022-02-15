import { Modal } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectWhereGoest } from '../../redux/reducers/goest';
import { selectCurrentRegister } from '../../redux/reducers/register';

import { getWhereGoestAsync } from '../../redux/ActionsAsync/goestAA';
import { getByIdRegisterAsync } from '../../redux/ActionsAsync/registerAA';

const ModalComponent = styled(Modal)``;

const ModalCardRoomInfo = ({ modalVisible, handleOk, handleCancel, registerId }) => {
  //

  const dispatch = useDispatch();
  const goests = useSelector(selectWhereGoest);
  const current = useSelector(selectCurrentRegister);

  useEffect(() => {
    if (registerId) {
      dispatch(getByIdRegisterAsync(registerId));
      dispatch(getWhereGoestAsync({ registerId }));
    }
  }, [registerId, dispatch]);

  console.log({ current, goests });

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
