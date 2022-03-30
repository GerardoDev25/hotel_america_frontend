import { useState } from 'react';
import moment from 'moment';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';

import { capitalizeWorlds } from '../../../helpers';
import { typeInput } from '../../../helpers/settings';

const { Item } = Form;

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

const Inputs = ({ typeData }) => {
  //

  const [valid, setValid] = useState(false);
  const [typevalid, setTypeValid] = useState('');

  const { label, name, type, required, options, index } = typeData;

  const rulesRequired = [
    {
      required: true,
      message: 'This Field is required!',
    },
  ];

  const handleChange = () => {
    setValid(true);
    setTypeValid('success');
  };

  const Entry = () => {
    switch (type) {
      case typeInput.number:
        return (
          <Item
            label={label}
            name={name}
            validateStatus={typevalid}
            rules={required ? [{ ...rulesRequired[0], type: 'number' }] : false}
          >
            <InputNumber size="small" autoFocus={index === 0} onChange={handleChange} />
          </Item>
        );

      case typeInput.simpleString:
        return (
          <Item
            label={label}
            name={name}
            hasFeedback={valid}
            validateStatus={typevalid}
            rules={required ? [{ ...rulesRequired[0], type: 'string' }] : false}
          >
            <Input size="small" autoFocus={index === 0} onChange={handleChange} />
          </Item>
        );

      case typeInput.select:
        return (
          <Item
            label={label}
            name={name}
            validateStatus={typevalid}
            rules={required ? [{ ...rulesRequired[0], type: 'string' }] : false}
          >
            <Select autoFocus={index === 0} onChange={handleChange}>
              {options.map((item) => (
                <Select.Option key={item} value={item}>
                  {capitalizeWorlds(item)}
                </Select.Option>
              ))}
            </Select>
          </Item>
        );

      case typeInput.dataPiker:
        return (
          <Item
            label={label}
            name="currentDate"
            validateStatus={typevalid}
            rules={required ? [{ ...rulesRequired[0], type: 'date' }] : false}
          >
            <DatePicker format={'DD/MM/YYYY'} autoFocus={index === 0} onChange={handleChange} />
          </Item>
        );

      case typeInput.texAreaString:
        return (
          <Item
            label={label}
            name={name}
            validateStatus={typevalid}
            rules={required ? [{ ...rulesRequired[0], type: 'string' }] : false}
          >
            <Input.TextArea
              autoFocus={index === 0}
              onChange={handleChange}
              placeholder="Decription..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Item>
        );
      default:
        <Item>
          <pre> {JSON.stringify(typeData)}</pre>;
        </Item>;
        break;
    }
  };

  return <Entry />;
};

const FormComponent = ({ fields = [], isCreate, handleData, inputsType, loading }) => {
  //

  const currentDate = fields.find((item) => item.name[0] === 'date' || item.name[0] === 'dateOfBirth');
  let entries = [];

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
      {inputsType.map((typeData, index) => (
        <Inputs key={index} typeData={{ ...typeData, index }} />
      ))}
      <Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isCreate ? 'Create' : 'Update'}
        </Button>
      </Item>
    </Form>
  );
};

export default FormComponent;
