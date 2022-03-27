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

  const { label, name, type, required, options } = typeData;

  const rulesRequired = [
    {
      required: true,
      message: 'This Field is required!',
    },
  ];

  const Entry = () => {
    switch (type) {
      case typeInput.number:
        return (
          <Item label={label} name={name} rules={required ? [{ ...rulesRequired[0], type: 'number' }] : false}>
            <InputNumber size="small" autoFocus />
          </Item>
        );

      case typeInput.select:
        return (
          <Item label={label} name={name} rules={required ? [{ ...rulesRequired[0], type: 'string' }] : false}>
            <Select>
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
          <Item label={label} name="currentDate" rules={required ? [{ ...rulesRequired[0], type: 'date' }] : false}>
            <DatePicker format={'DD/MM/YYYY'} />
          </Item>
        );

      case typeInput.texAreaString:
        return (
          <Item label={label} name={name} rules={required ? [{ ...rulesRequired[0], type: 'string' }] : false}>
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Decription..." />
          </Item>
        );
      default:
        break;
    }
  };

  return <Entry />;
};

const FormComponent = ({ fields = [], isCreate, handleData, inputsType, loading }) => {
  //

  const currentDate = fields.find((item) => item.name[0] === 'date');
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
        <Inputs key={index} typeData={typeData} />
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
