import { useSelector } from 'react-redux';
import { selectCurrentRoom } from '../../../redux/reducers/room';

const ViewFree = () => {
  const room = useSelector(selectCurrentRoom);

  console.log(room);

  return <div>ViewFree</div>;
};

export default ViewFree;
