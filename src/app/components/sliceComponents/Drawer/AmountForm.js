import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputNumber, Input, message, Select, DatePicker } from 'antd';

import { capitalizeWorlds } from '../../../helpers';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';
import { selectUpdateAmount, selectGetByIdAmount, cleanUpdateAmount, cleanByIdAmount } from '../../../redux/reducers/amount';
import { getByIdAmountAsync, updateAmountAsync } from '../../../redux/ActionsAsync/amountAA';

import NotFoundForm from './NotFoundForm';
import { DESCRIPTION_AMOUNTS } from '../../../helpers/settings';

//

const AmountForm = () => {
  // description string texarea
  // date date datapiker
  // totalAmount number number
  // type string select

  const dispatch = useDispatch();
  const { id } = useSelector(selectDrawer);
  const { data: dataById, ok: okById, loading: loadingById } = useSelector(selectGetByIdAmount);
  const { loading: loadingUpdate, called, ok: okUpdate, msg: msgUpdate } = useSelector(selectUpdateAmount);

  const [fiels, setFiels] = useState({
    description: '',
    date: '',
    totalAmount: '',
    type: '',
  });

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const { description, date, totalAmount, type } = fiels;

  useEffect(() => {
    dispatch(getByIdAmountAsync(id));
    return () => {
      dispatch(cleanUpdateAmount());
      dispatch(cleanByIdAmount());
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

  const handleSubmit = () => {
    setFiels({ description: '', date: '', totalAmount: '', type: '' });
  };

  return (
    <>
      {!okById || loadingById ? (
        <NotFoundForm />
      ) : (
        <Form
          onFinish={handleSubmit}
          initialValues={{ description, date, totalAmount, type }}
          layout="horizontal"
          {...formItemLayout}
        >
          <Form.Item label="Total Amount" name="totalAmount">
            <InputNumber min={0} size="small" />
          </Form.Item>
          <Form.Item name="date" label="date">
            <DatePicker />
          </Form.Item>

          <Form.Item name="description_amount" label="Type">
            <Select defaultValue={DESCRIPTION_AMOUNTS[0]}>
              {DESCRIPTION_AMOUNTS.map((item) => (
                <Select.Option key={item} value={item}>
                  {capitalizeWorlds(item)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="description" name="Description">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loadingUpdate}>
              Update/Create
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default AmountForm;
