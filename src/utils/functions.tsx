const deliveryDate = (date: string) => {
  const bookedTillDate = new Date(Date.parse(date.split(' ')[0])).getDate();
  const bookedTillMonth = new Date(Date.parse(date.split(' ')[0])).getMonth() + 1;
  const bookedTill = `Занята до ${bookedTillDate}.${bookedTillMonth}`;

  return bookedTill;
};

const getWindowWidth = () => {
  const { innerWidth } = window;

  return innerWidth;
};

export { deliveryDate, getWindowWidth };
