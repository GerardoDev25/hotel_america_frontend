import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWhereGoestAsync } from '../../../redux/ActionsAsync/goestAA';
import { getWhereAmountAsync } from '../../../redux/ActionsAsync/amountAA';
import { getByIdRegisterAsync } from '../../../redux/ActionsAsync/registerAA';

import { selectWhereGoest } from '../../../redux/reducers/goest';
import { selectWhereAmount } from '../../../redux/reducers/amount';
import { selectCurrentRegister } from '../../../redux/reducers/register';

const ViewUsed = ({ registerId }) => {
  const dispatch = useDispatch();
  const goests = useSelector(selectWhereGoest);
  const amounts = useSelector(selectWhereAmount);
  const register = useSelector(selectCurrentRegister);

  useLayoutEffect(() => {
    if (registerId) {
      dispatch(getByIdRegisterAsync(registerId));
      dispatch(getWhereGoestAsync({ registerId }));
      dispatch(getWhereAmountAsync({ registerId }));
    }
  }, [registerId, dispatch]);

  console.log({ goests, amounts, register });

  return <div>ViewUsed</div>;
};

export default ViewUsed;
