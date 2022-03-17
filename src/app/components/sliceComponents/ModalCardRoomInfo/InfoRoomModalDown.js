import React from 'react';

const InfoRoomModalDown = ({ items }) => {
  let totalDebt = 0;
  let totalLodging = 0;
  let totalPayment = 0;
  let totalToPay = 0;

  const [goest, amount, lodging] = items;

  console.log(goest, amount, lodging);

  for (const item of lodging.data) {
    totalLodging += item.amount;
  }

  for (const item of amount.data) {
    item.type === 'payment' ? (totalPayment += item.totalAmount) : (totalDebt += item.totalAmount);
  }

  totalToPay = totalLodging + totalPayment - totalDebt;

  console.log({ totalLodging, totalDebt, totalPayment, totalToPay });

  return <div>InfoRoomModalDown</div>;
};

export default InfoRoomModalDown;
