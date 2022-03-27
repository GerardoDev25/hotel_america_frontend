import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DESCRIPTION_AMOUNTS, drawerActions, typeInput } from '../../../helpers/settings';
import { getByIdGoestAsync } from '../../../redux/ActionsAsync/goestAA';

import { selectDrawer } from '../../../redux/reducers/drawer';
import {
  cleanByIdGoest,
  cleanCreateGoest,
  cleanUpdateGoest,
  selectUpdateGoest,
  selectCreateGoest,
  selectgetByIdGoest,
} from '../../../redux/reducers/goest';

const GoestForm = () => {
  // ? inset later
  // date
  // numberRoom

  const dispatch = useDispatch();

  const { action, id } = useSelector(selectDrawer);
  const isCreate = action === drawerActions.addGoest;

  const { loading: loadingUpdate, ok: okUpdate, called: calledUpdate, msg: msgUpdate } = useSelector(selectUpdateGoest);
  const { loading: loadingCreate, ok: okCreate, called: calledCreate, msg: msgCreate } = useSelector(selectCreateGoest);
  const {
    data: dataById,
    ok: okById,
    called: calledById,
    loading: loadingById,
    msg: msgById,
    called: calledBYId,
  } = useSelector(selectgetByIdGoest);


  const inputsType = [
    { type: typeInput.simpleString, label: 'Name', name: 'name', required: true },
    { type: typeInput.simpleString, label: 'Last Name', name: 'lastName', required: true },
    { type: typeInput.simpleString, label: 'C.I.', name: 'ci', required: true, unique: true },
    { type: typeInput.phone, label: 'Phone', name: 'phone', required: true, unique: true },
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
    !isCreate && dispatch(getByIdGoestAsync(id));

    return () => {
      dispatch(cleanByIdGoest());
      dispatch(cleanCreateGoest());
      dispatch(cleanUpdateGoest());
    };
  }, [dispatch, isCreate, id]);

  return <pre> {isCreate ? JSON.stringify(fields, null, 2) : JSON.stringify(dataById, null, 2)}</pre>;
};

export default GoestForm;
