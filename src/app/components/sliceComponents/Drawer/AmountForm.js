import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputNumber, Input, message, Select, DatePicker } from 'antd';
import moment from 'moment';

import { capitalizeWorlds } from '../../../helpers';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';
import {
  selectUpdateAmount,
  selectGetByIdAmount,
  selectCreateAmount,
  cleanUpdateAmount,
  cleanByIdAmount,
  cleanCreateAmount,
} from '../../../redux/reducers/amount';
import { getByIdAmountAsync, updateAmountAsync } from '../../../redux/ActionsAsync/amountAA';

import NotFoundForm from './NotFoundForm';
import { DESCRIPTION_AMOUNTS, drawerActions } from '../../../helpers/settings';

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

let initalState = {
  type: '',
  totalAmount: 0,
  description: '',
  date: moment().format('DD/MM/YYYY'),
};

const AmountForm = () => {
  //
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { action, id } = useSelector(selectDrawer);
  const isCreate = action === drawerActions.addAcount;

  const { data: dataById, ok: okById, called: calledById, loading: loadingById, msg: msgById } = useSelector(selectGetByIdAmount);
  const { loading: loadingUpdate } = useSelector(selectUpdateAmount);
  const { loading: loadingCreate } = useSelector(selectCreateAmount);

  const [fiels, setFiels] = useState(initalState);

  useEffect(() => {
    if (calledById && okById) {
      initalState = { ...dataById[0] };
      setFiels({ ...dataById[0] });
    }
  }, [setFiels, calledById, okById, dataById]);

  useEffect(() => {
    !isCreate && dispatch(getByIdAmountAsync(id));

    return () => {
      if (!isCreate) {
        dispatch(cleanUpdateAmount());
        dispatch(cleanByIdAmount());
      } else {
        dispatch(cleanCreateAmount());
      }
    };
  }, [dispatch, isCreate, id]);

  useEffect(() => {
    console.log(fiels);
  }, [fiels]);

  const handleSubmit = () => {};

  const handleChange = ({ target }) => {
    console.log(target);
  };

  const handleSelect = (e) => {
    console.log(e.format('DD/MM/YYYY'));
  };

  const { date, ...formInitials } = initalState;
  return (
    <Form
      layout="horizontal"
      {...formItemLayout}
      form={form}
      onFinish={handleSubmit}
      onChange={handleChange}
      initialValues={{ ...formInitials }}
    >
      <Form.Item label="Total Amount" name="totalAmount" dependencies={['totalAmount']}>
        <InputNumber min={0} size="small" autoFocus value={fiels.totalAmount} />
      </Form.Item>
      <Form.Item name="date" label="date" dependencies={['date']}>
        {/* <DatePicker onChange={handleSelect} defaultValue={moment(initalState.date, 'DD/MM/YYYY')} format={'DD/MM/YYYY'} /> */}
        <DatePicker onChange={handleSelect} />
      </Form.Item>

      <Form.Item name="description_amount" label="Type" dependencies={['description_amount']}>
        <Select onSelect={handleSelect} value="345">
          {DESCRIPTION_AMOUNTS.map((item) => (
            <Select.Option key={item} value={item}>
              {capitalizeWorlds(item)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="description" name="Description" dependencies={['description']}>
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} value={fiels.description} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isCreate ? loadingCreate : loadingUpdate}>
          {isCreate ? 'Create' : 'Update'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AmountForm;
