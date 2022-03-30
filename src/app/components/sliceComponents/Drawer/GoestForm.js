import moment from 'moment';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { capitalizeWorlds } from '../../../helpers';
import { useDispatch, useSelector } from 'react-redux';

import { drawerActions, typeInput } from '../../../helpers/settings';

import { drawerClose, selectDrawer } from '../../../redux/reducers/drawer';
import {
  cleanByIdGoest,
  cleanCreateGoest,
  cleanUpdateGoest,
  selectUpdateGoest,
  selectCreateGoest,
  selectgetByIdGoest,
} from '../../../redux/reducers/goest';
import { cleanByIdRegister, selectGetByIdRegister } from '../../../redux/reducers/register';

import { getByIdRegisterAsync } from '../../../redux/ActionsAsync/registerAA';
import { createGoestAsync, getByIdGoestAsync, updateGoestAsync } from '../../../redux/ActionsAsync/goestAA';

import NotFoundForm from './NotFoundForm';
import FormComponent from './FormComponent';

const GoestForm = () => {
  //

  const dispatch = useDispatch();

  const { action, id } = useSelector(selectDrawer);
  const isCreate = action === drawerActions.addGoest;

  const { loading: loadingUpdate, ok: okUpdate, called: calledUpdate, msg: msgUpdate } = useSelector(selectUpdateGoest);
  const { loading: loadingCreate, ok: okCreate, called: calledCreate, msg: msgCreate } = useSelector(selectCreateGoest);
  const { data: dataRegisterById, ok: okRegisterById, msg: msgRegisterById } = useSelector(selectGetByIdRegister);
  const {
    ok: okById,
    msg: msgById,
    data: dataById,
    called: calledById,
    called: calledBYId,
    loading: loadingById,
  } = useSelector(selectgetByIdGoest);

  const inputsType = [
    { type: typeInput.simpleString, label: 'Name', name: 'name', required: true },
    { type: typeInput.simpleString, label: 'Last Name', name: 'lastName', required: true },
    { type: typeInput.simpleString, label: 'C.I.', name: 'ci', required: true, unique: true },
    { type: typeInput.simpleString, label: 'Phone', name: 'phone', required: true, unique: true },
    { type: typeInput.simpleString, label: 'Origin', name: 'origin', required: true },
    { type: typeInput.simpleString, label: 'Posting', name: 'posting', required: true },
    { type: typeInput.simpleString, label: 'City', name: 'city' },
    { type: typeInput.dataPiker, label: 'Date of Birth', name: 'dateOfBirth', required: true },
  ];

  const [fields, setFiels] = useState([
    {
      name: ['name'],
      value: '',
    },
    {
      name: ['lastName'],
      value: '',
    },
    {
      name: ['ci'],
      value: '',
    },
    {
      name: ['phone'],
      value: 0,
    },
    {
      name: ['origin'],
      value: '',
    },
    {
      name: ['posting'],
      value: '',
    },
    {
      name: ['city'],
      value: '',
    },
    {
      name: ['dateOfBirth'],
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
    if (!isCreate && calledBYId && !okById) {
      message.error(capitalizeWorlds(msgById));
      dispatch(drawerClose());
    } else if (isCreate && !okRegisterById) {
      message.error(capitalizeWorlds(msgRegisterById));
      dispatch(drawerClose());
    }
  }, [dispatch, loadingById, msgById, calledBYId, isCreate, okById, okRegisterById, msgRegisterById]);

  useEffect(() => {
    isCreate ? dispatch(getByIdRegisterAsync(id)) : dispatch(getByIdGoestAsync(id));

    return () => {
      dispatch(cleanByIdGoest());
      dispatch(cleanCreateGoest());
      dispatch(cleanUpdateGoest());
      dispatch(cleanByIdRegister());
    };
  }, [dispatch, isCreate, id]);

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

    dataToSend.dateOfBirth = dataToSend.currentDate;
    dataToSend.numberRoom = dataRegisterById[0].numberRoom;
    dataToSend.date = moment().format('DD/MM/YYYY');
    delete dataToSend.currentDate;

    if (isCreate) {
      dataToSend.registerId = dataRegisterById[0].registerId;
      dispatch(createGoestAsync(dataToSend));
    } else dispatch(updateGoestAsync(dataToSend));
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

export default GoestForm;
