import {
  toLower,
  isEmpty,
  forEach,
} from 'lodash/';

const isEmail = (value) => {
  const result = {
    passed: false,
    error: [],
  };

  if (isEmpty(value)) {
    return result;
  }

  const regexp = [
    {
      regexp: /^([\w-.]+)@([\w-.]+)(\.[A-Za-z]{2,5})$/,
      error: 'E-mail address is not valid',
    },
  ];
  const error = [];
  forEach(regexp, (elem) => {
    if (!elem.regexp.test(toLower(String(value)))) {
      error.push(elem.error);
    }
  });

  const passed = !(error.length > 0);
  return { passed, error };
};

const isPassword = (value) => {
  const result = {
    passed: false,
    error: '',
  };

  if (isEmpty(value)) {
    return result;
  }

  const regexp = [
    {
      regexp: /.{8,}/,
      error: 'Password 8 characters minimum',
    },
    // todo: после консультации с Тарасом оставил только проверку длины пароля
    // {
    //   regexp: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}]/,
    //   error: 'Password does not include special character',
    // },
    // {
    //   regexp: /[A-Z]/,
    //   error: 'Password does not include uppercase character',
    // },
    // {
    //   regexp: /\d/,
    //   error: 'Password does not include digits',
    // },
  ];

  const error = [];
  forEach(regexp, (elem) => {
    if (!elem.regexp.test(value)) {
      error.push(elem.error);
    }
  });
  const passed = !(error.length > 0);
  return { passed, error };
};

export default {
  email: isEmail,
  password: isPassword,
  // ...
};
