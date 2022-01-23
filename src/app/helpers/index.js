export const capitalizeWorlds = (str) => {
  if (!str) return;

  const exclude = ['the', 'or', 'in', 'of'];

  const arr = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    if (!exclude.includes(arr[i])) arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

export const getLetersInitials = (str) => {
  if (!str) return;
  const init = str.split(' ');
  let leters = '';
  init.forEach((e) => {
    leters += e[0].toUpperCase();
  });
  return leters;
};
