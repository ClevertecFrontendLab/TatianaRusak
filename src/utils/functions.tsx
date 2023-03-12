const deliveryDate = (date: string) => {
  const bookedTillDate = new Date(Date.parse(date.split(' ')[0])).getDate();
  const bookedTillMonth = new Date(Date.parse(date.split(' ')[0])).getMonth() + 1;
  const bookedTill = `Занята до ${bookedTillDate}.${bookedTillMonth}`;

  return bookedTill;
};

const toFormattedDate = (dateStr: Date) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formatted = date.toLocaleDateString('ru-RU', options);

  return formatted;
};

const getWindowWidth = () => {
  const { innerWidth } = window;

  return innerWidth;
};

const highlight = (searchMatches: string[], title: string) => {
  let newText;

  searchMatches.forEach((match) => {
    const regex = new RegExp(match, 'gi');

    newText = title.replace(regex, `<span data-test-id='highlight-matches' class="highlight">$&</span>`);

    // eslint-disable-next-line react/react-in-jsx-scope, react/no-danger
    return <span dangerouslySetInnerHTML={{ __html: newText }} />;
  });

  // eslint-disable-next-line react/react-in-jsx-scope, react/no-danger
  return newText;
};

export { deliveryDate, getWindowWidth, toFormattedDate, highlight };
