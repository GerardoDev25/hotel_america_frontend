import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputNumber, message, Typography } from 'antd';

import { capitalizeWorlds } from '../../../helpers';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';
import {
  selectGetByIdLodging,
  selectUpdateLodging,
  cleanUpdateLodging,
  cleanGetByIdLodging,
} from '../../../redux/reducers/lodging';
import { getByIdlodgingAsync, updateLodgingAsync } from '../../../redux/ActionsAsync/lodgingAA';

import NotFoundForm from './NotFoundForm';

const LodgingForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectDrawer);
  const { data: dataById, ok: okById, loading: loadingById } = useSelector(selectGetByIdLodging);
  const { loading: loadingUpdate, called, ok: okUpdate, msg: msgUpdate } = useSelector(selectUpdateLodging);

  const [fiels, setFiels] = useState({
    amount: 0,
  });

  const { amount } = fiels;

  useEffect(() => {
    dispatch(getByIdlodgingAsync(id));
    return () => {
      dispatch(cleanUpdateLodging());
      dispatch(cleanGetByIdLodging());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (called) {
      okUpdate
        ? message.success({
            content: capitalizeWorlds(msgUpdate),
            className: 'custom-class',
          })
        : message.error(capitalizeWorlds(msgUpdate));
      dispatch(drawerClose());
    }
  }, [dispatch, called, okUpdate, msgUpdate]);

  const handleChange = (e) => {
    setFiels({ ...fiels, amount: e });
  };

  const handleSubmit = () => {
    if (!Number.isNaN(amount) && amount > 0)
      dispatch(updateLodgingAsync({ lodgingId: id, ...fiels, registerId: dataById[0].registerId }));
    else message.error(capitalizeWorlds("input isn't valid"));
  };

  return (
    <>
      {!okById || loadingById ? (
        <NotFoundForm />
      ) : (
        <Form onFinish={handleSubmit} initialValues={{ remember: true }}>
          <Typography.Paragraph> the current value is: {dataById[0]?.amount || "don't Found"}</Typography.Paragraph>
          <Form.Item label="Amount" name="amount">
            <InputNumber value={amount} onChange={handleChange} min={0} autoFocus />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loadingUpdate}>
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LodgingForm;
