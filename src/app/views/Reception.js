import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectRoom } from '../redux/reducers/room';
import { selectStaff } from '../redux/reducers/staff';
import { selectGoest } from '../redux/reducers/goest';
import { selectAmount } from '../redux/reducers/amount';
import { selectRegister } from '../redux/reducers/register';

import { getAllRoomAsync } from '../redux/ActionsAsync/roomAA';
import { getAllStaffAsync } from '../redux/ActionsAsync/staffAA';
import { getAllGoestAsync } from '../redux/ActionsAsync/goestAA';
import { getAllAmountAsync } from '../redux/ActionsAsync/amountAA';
import { getAllRegisterAsync } from '../redux/ActionsAsync/registerAA';

const Reception = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRoom);
  const staff = useSelector(selectStaff);
  const goest = useSelector(selectGoest);
  const amount = useSelector(selectAmount);
  const register = useSelector(selectRegister);

  useEffect(() => {
    console.log({ rooms, amount, goest, register, staff });
  }, [rooms, amount, goest, register, staff]);

  useEffect(() => {
    dispatch(getAllRoomAsync());
    dispatch(getAllAmountAsync());
    dispatch(getAllGoestAsync());
    dispatch(getAllRegisterAsync());
    dispatch(getAllStaffAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Reception</h1>
    </div>
  );
};

export default Reception;
