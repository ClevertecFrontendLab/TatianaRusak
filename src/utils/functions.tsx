/* eslint-disable complexity */
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

const phoneValidate = (phoneString: string) => {
  if (phoneString) {
    switch (true) {
      case !phoneString.match(/^\+\d{3}\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/g):
        return '<span class="auth__error" data-test-id="hint">В формате +375 (xx) xxx-xx-xx</span>';
        break;
      default:
        return 'ok';
    }
  } else {
    return '';
  }
};

const emailValidate = (emailString: string) => {
  if (emailString) {
    switch (true) {
      case !emailString.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g):
        return '<span class="auth__error" data-test-id="hint">Введите корректный email</span>';
        break;
      default:
        return 'ok';
    }
  } else {
    return '';
  }
};

const usernameValidate = (usernameString: string) => {
  if (usernameString) {
    switch (true) {
      case !!usernameString.match(/[а-яА-Я]/g) && !usernameString.match(/[0-9]/g):
        return 'Используйте для логина <span class="auth__error" >латинский алфавит</span> и <span class="auth__error" >цифры</span>';
        break;
      case !!usernameString.match(/[а-яА-Я]/g):
        return 'Используйте для логина <span class="auth__error" >латинский алфавит</span> и цифры';
        break;
      case !usernameString.match(/[0-9]/g):
        return 'Используйте для логина латинский алфавит и <span class="auth__error" >цифры</span>';
        break;
      case !usernameString.match(/[A-Za-z]/g):
        return 'Используйте для логина <span class="auth__error" >латинский алфавит</span> и цифры';
        break;
      default:
        return 'ok';
    }
  }

  return '';
};

const passwordValidate = (passwordString: string) => {
  if (passwordString) {
    switch (true) {
      case passwordString.length < 8 && !passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
        return 'Пароль <span class="auth__error" data-test-id="hint">не менее 8 символов</span>, с <span class="auth__error" data-test-id="hint">заглавной буквой</span> и <span class="auth__error">цифрой</span>';
        break;
      case passwordString.length < 8 && !!passwordString.match(/[А-ЯA-Z]/g) && !!passwordString.match(/[0-9]/g):
        return 'Пароль <span class="auth__error" data-test-id="hint">не менее 8 символов</span>, с заглавной буквой и цифрой';
        break;
      case passwordString.length >= 8 && !passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
        return 'Пароль не менее 8 символов, с <span class="auth__error" data-test-id="hint">заглавной буквой</span> и <span class="auth__error" data-test-id="hint">цифрой</span>';
        break;
      case passwordString.length >= 8 && !!passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
        return 'Пароль не менее 8 символов, с заглавной буквой и <span class="auth__error" data-test-id="hint">цифрой</span>';
        break;
      case passwordString.length >= 8 && !passwordString.match(/[А-ЯA-Z]/g) && !!passwordString.match(/[0-9]/g):
        return 'Пароль не менее 8 символов, <span class="auth__error" data-test-id="hint">с заглавной буквой</span> и цифрой';
        break;
      case passwordString.length < 8 && !!passwordString.match(/[А-ЯA-Z]/g) && !passwordString.match(/[0-9]/g):
        return 'Пароль <span class="auth__error" data-test-id="hint">не менее 8 символов</span>, с заглавной буквой и <span class="auth__error" data-test-id="hint">цифрой</span>';
        break;
      case passwordString.length < 8 && !passwordString.match(/[А-ЯA-Z]/g) && !!passwordString.match(/[0-9]/g):
        return 'Пароль <span class="auth__error" data-test-id="hint">не менее 8 символов</span>, <span class="auth__error" data-test-id="hint">с заглавной буквой</span> и цифрой';
        break;
      default:
        return 'ok';
    }
  }

  return '';
};

export {
  deliveryDate,
  getWindowWidth,
  toFormattedDate,
  highlight,
  passwordValidate,
  usernameValidate,
  emailValidate,
  phoneValidate,
};
