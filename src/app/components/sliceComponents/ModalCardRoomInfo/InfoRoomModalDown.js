import React from 'react';

const InfoRoomModalDown = ({ itemsGoest, itemsAmount, itemsLodging }) => {
  console.log({ itemsGoest, itemsAmount, itemsLodging });

  let totalDebt = 0;
  let totalLodging = 0;
  let totalPayment = 0;
  let totalToPay = 0;

  for (const item of itemsLodging) {
    totalLodging += item.amount;
  }

  for (const item of itemsAmount) {
    item.type === 'payment' ? (totalPayment += item.totalAmount) : (totalDebt += item.totalAmount);
  }

  totalToPay = totalLodging + totalPayment - totalDebt;
  
  console.log({ totalLodging, totalDebt, totalPayment, totalToPay });

  return <div>InfoRoomModalDown</div>;
};

export default InfoRoomModalDown;
