import { useDispatch, useSelector } from 'react-redux';

import { selectRoom } from '../redux/reducers/room';
import { getAllRoomAsync } from '../redux/ActionsAsync/roomAA';
import { useEffect } from 'react';

const Reception = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRoom);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Reception</h1>
    </div>
  );
};

export default Reception;
