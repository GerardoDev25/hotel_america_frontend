import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';
import { getByIdlodgingAsync, updateLodgingAsync } from '../../../redux/ActionsAsync/lodgingAA';
import {
  selectGetByIdLodging,
  selectUpdateLodging,
  cleanUpdateLodging,
  cleanGetByIdLodging,
} from '../../../redux/reducers/lodging';
import NotFoundForm from './NotFoundForm';

const LodgingForm = () => {
  const dispatch = useDispatch();
  const { id } = useSelector(selectDrawer);
  const { data: dataById, ok: okById, loading: loadingById } = useSelector(selectGetByIdLodging);
  const { loading: loadingUpdate, called, ok: okUpdate, msg: msgUpdate } = useSelector(selectUpdateLodging);

  const [fiels, setFiels] = useState({
    amount: dataById[0]?.amount || 0,
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
    if (called) dispatch(drawerClose());
  }, [dispatch, called, okUpdate]);

  const handleChange = (e) => {
    setFiels({ ...fiels, amount: e });
    console.log(fiels);
  };

  const handleSubmit = () => {
    dispatch(updateLodgingAsync({ lodgingId: id, ...fiels, registerId: dataById[0].registerId }));
  };

  return (
    <>
      {!okById ? (
        <NotFoundForm />
      ) : (
        <Form onFinish={handleSubmit} initialValues={{ remember: true }}>
          <Typography.Paragraph> the current value is: {amount}</Typography.Paragraph>
          <Form.Item label="Amount" name="amount">
            <InputNumber value={amount} onChange={handleChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loadingUpdate}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LodgingForm;
