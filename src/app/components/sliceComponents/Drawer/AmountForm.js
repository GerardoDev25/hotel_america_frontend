import moment from 'moment';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { capitalizeWorlds } from '../../../helpers';
import { DESCRIPTION_AMOUNTS, drawerActions, typeInput } from '../../../helpers/settings';

import { selectAuth } from '../../../redux/reducers/auth';
import { selectDrawer, drawerClose } from '../../../redux/reducers/drawer';
import {
  cleanByIdAmount,
  cleanUpdateAmount,
  cleanCreateAmount,
  selectUpdateAmount,
  selectCreateAmount,
  selectGetByIdAmount,
} from '../../../redux/reducers/amount';
import { getByIdAmountAsync, updateAmountAsync, createAmountAsync } from '../../../redux/ActionsAsync/amountAA';

import NotFoundForm from './NotFoundForm';
import FormComponent from './FormComponent';

const AmountForm = () => {
  //
  const dispatch = useDispatch();

  const { action, id } = useSelector(selectDrawer);
  const isCreate = action === drawerActions.addAcount;

  const { loading: loadingUpdate, ok: okUpdate, called: calledUpdate, msg: msgUpdate } = useSelector(selectUpdateAmount);
  const { loading: loadingCreate, ok: okCreate, called: calledCreate, msg: msgCreate } = useSelector(selectCreateAmount);
  const { staff } = useSelector(selectAuth);
  const {
    data: dataById,
    ok: okById,
    called: calledById,
    loading: loadingById,
    msg: msgById,
    called: calledBYId,
  } = useSelector(selectGetByIdAmount);

  const inputsType = [
    { type: typeInput.number, label: 'Total Amount', name: 'totalAmount', required: true },
    { type: typeInput.select, label: 'Type', name: 'type', options: DESCRIPTION_AMOUNTS, required: true },
    { type: typeInput.dataPiker, label: 'Date', name: 'date', required: true },
    { type: typeInput.texAreaString, label: 'Description', name: 'description', required: false },
  ];

  const [fields, setFiels] = useState([
    {
      name: ['totalAmount'],
      value: 0,
    },
    {
      name: ['type'],
      value: DESCRIPTION_AMOUNTS[0],
    },
    {
      name: ['date'],
      value: moment().format('DD/MM/YYYY'),
    },
    {
      name: ['description'],
      value: '',
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
  }, [dispatch, isCreate, calledUpdate, calledCreate, msgCreate, msgUpdate, okCreate, okUpdate]);

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

  return !isCreate && !okById && calledBYId ? (
    <NotFoundForm />
  ) : (
    <FormComponent
      fields={fields}
      isCreate={isCreate}
      setFiels={setFiels}
      handleData={handleData}
      inputsType={inputsType}
      loading={isCreate ? loadingCreate : loadingUpdate}
    />
  );
};

export default AmountForm;
