import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputNumber, Input, message, Select, DatePicker } from 'antd';
import moment from 'moment';

import { capitalizeWorlds } from '../../../helpers';
import { DESCRIPTION_AMOUNTS, drawerActions } from '../../../helpers/settings';

import { selectAuth } from '../../../redux/reducers/auth';
import { selectDrawer, drawerClose } from '../../../redux/reducers/drawer';
import {
  selectUpdateAmount,
  selectGetByIdAmount,
  selectCreateAmount,
  cleanUpdateAmount,
  cleanByIdAmount,
  cleanCreateAmount,
} from '../../../redux/reducers/amount';
import { getByIdAmountAsync, updateAmountAsync, createAmountAsync } from '../../../redux/ActionsAsync/amountAA';

// todo make any wuth this
import NotFoundForm from './NotFoundForm';

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

const FormComponent = ({ fields = [], isCreate, handleData, loadingCreate, loadingUpdate }) => {
  //

  const currentDate = fields.find((item) => item.name[0] === 'date');
  let entries = [];

  const rulesRequired = [
    {
      required: true,
      message: 'This Field is required!',
    },
  ];

  const handleChageAll = (_, allFields = []) => {
    entries = allFields.map((item) => ({
      name: item.name,
      value: item.name[0] === 'currentDate' ? (item.value ? item.value.format('DD/MM/YYYY') : currentDate.value) : item.value,
    }));
  };

  const handleSubmit = () => {
    let curretFields = [...fields];

    for (const e of entries) {
      curretFields = curretFields.filter((item) => item.name[0] !== e.name[0]);
    }
    handleData([...curretFields, ...entries]);
  };

  return (
    <Form
      layout="horizontal"
      {...formItemLayout}
      onFinish={handleSubmit}
      fields={fields}
      onFieldsChange={handleChageAll}
      initialValues={{ type: fields.filter((i) => i.name[0] === 'type'), currentDate: moment(currentDate.value, 'DD/MM/YYYY') }}
    >
      <Form.Item name="totalAmount" label="Total Amount" rules={[{ ...rulesRequired[0], type: 'number' }]}>
        <InputNumber size="small" autoFocus />
      </Form.Item>

      <Form.Item label="Type" name="type" rules={[{ ...rulesRequired[0], type: 'string' }]}>
        <Select value="345">
          {DESCRIPTION_AMOUNTS.map((item) => (
            <Select.Option key={item} value={item}>
              {capitalizeWorlds(item)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Date" name="currentDate" dependencies={['currentDate']} rules={rulesRequired}>
        <DatePicker format={'DD/MM/YYYY'} />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Decription..." />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isCreate ? loadingCreate : loadingUpdate}>
          {isCreate ? 'Create' : 'Update'}
        </Button>
      </Form.Item>
    </Form>
  );
};

const AmountForm = () => {
  //
  const dispatch = useDispatch();

  const { action, id } = useSelector(selectDrawer);
  const isCreate = action === drawerActions.addAcount;

  const {
    data: dataById,
    ok: okById,
    called: calledById,
    loading: loadingById,
    msg: msgById,
    called: calledBYId,
  } = useSelector(selectGetByIdAmount);
  const { loading: loadingUpdate, ok: okUpdate, called: calledUpdate, msg: msgUpdate } = useSelector(selectUpdateAmount);
  const { loading: loadingCreate, ok: okCreate, called: calledCreate, msg: msgCreate } = useSelector(selectCreateAmount);
  const { staff } = useSelector(selectAuth);

  const [fields, setFiels] = useState([
    {
      name: ['type'],
      value: DESCRIPTION_AMOUNTS[0],
    },
    {
      name: ['totalAmount'],
      value: 0,
    },
    {
      name: ['description'],
      value: '',
    },
    {
      name: ['date'],
      value: moment().format('DD/MM/YYYY'),
    },
  ]);

  useEffect(() => {
    if (calledById && okById) {
      const initalState = Object.entries(dataById[0]).map((item) => ({
        name: [item[0]],
        value: item[1],
      }));
      setFiels(initalState);
    }
  }, [setFiels, calledById, okById, dataById]);

  useEffect(() => {
    !isCreate && dispatch(getByIdAmountAsync(id));

    return () => {
      dispatch(cleanUpdateAmount());
      dispatch(cleanByIdAmount());
      dispatch(cleanCreateAmount());
    };
  }, [dispatch, isCreate, id]);

  useEffect(() => {
    if (!isCreate && calledBYId && !okById) {
      message.error(capitalizeWorlds(msgById));
      dispatch(drawerClose());
    }
  }, [dispatch, loadingById, msgById, calledBYId, isCreate, okById]);

  useEffect(() => {
    if (calledCreate || calledUpdate) {
      if (isCreate) okCreate ? message.success(capitalizeWorlds(msgCreate)) : message.error(capitalizeWorlds(msgCreate));
      else okUpdate ? message.success(capitalizeWorlds(msgUpdate)) : message.error(capitalizeWorlds(msgUpdate));
      dispatch(drawerClose());
    }
  }, [dispatch, calledUpdate, calledCreate, isCreate, msgCreate, msgUpdate, okCreate, okUpdate]);

  const handleData = (data) => {
    const dataToSend = {};

    for (const item of data) dataToSend[item.name[0]] = item.value;

    dataToSend.staffId = staff.staffId;
    dataToSend.date = dataToSend.currentDate;
    delete dataToSend.currentDate;

    if (isCreate) {
      dataToSend.registerId = id;
      if (data.amountId) delete data.amountId;
      dispatch(createAmountAsync(dataToSend));
    } else dispatch(updateAmountAsync(dataToSend));
  };

  return (
    <FormComponent
      fields={fields}
      isCreate={isCreate}
      setFiels={setFiels}
      handleData={handleData}
      loadingCreate={loadingCreate}
      loadingUpdate={loadingUpdate}
    />
  );
};

export default AmountForm;
