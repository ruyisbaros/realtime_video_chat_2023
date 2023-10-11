export const makeCapitalize = (str) => {
  const a = str.split(" ");
  const b = a[0].slice(0, 1).toUpperCase() + a[0].slice(1);
  const c = a[1].slice(0, 1).toUpperCase() + a[1].slice(1);
  return b + " " + c;
};
