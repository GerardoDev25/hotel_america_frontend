import React from 'react';

const InfoRoomModalDown = ({ items }) => {
  let totalDebt = 0;
  let totalLodging = 0;
  let totalPayment = 0;
  let totalToPay = 0;

  const [datagoest, dataAmount, dataLodging] = items;

  for (const item of dataLodging) {
    totalLodging += item.amount;
  }

  for (const item of dataAmount) {
    item.type === 'payment' ? (totalPayment += item.totalAmount) : (totalDebt += item.totalAmount);
  }

  totalToPay = totalLodging + totalPayment - totalDebt;

  console.log({ totalLodging, totalDebt, totalPayment, totalToPay });

  return <div>InfoRoomModalDown</div>;
};

export default InfoRoomModalDown;
