import GetApi, { ApiGenerator } from '../index';

describe('Testing API fetch interface', () => {
  const apiModel = {
    signIn: {
      url: 'auth',
      options: {
        method: 'POST',
      },
    },
    confirmEmail: {
      url: 'auth/confirmEmail/{code}/{code2}',
    },
  };

  test('Initial GetApi execution without params must return exaption', () => {
    expect(() => GetApi()).toThrowError('Api fetch interface is not initialized');
  });

  test('Initial GetApi execution with wrong model object', () => {
    expect(() => GetApi('URL/', { foo: { url: 'auth' }, options: { method: 'POST' } }))
      .toThrowError('');
  });

  test('Initial GetApi with all params return new Api object', () => {
    const Api = GetApi('URL/', apiModel);
    expect(Api instanceof ApiGenerator).toBeTruthy();
  });

  test('GetApi function after init return same object', () => {
    const Api = GetApi('URL/', apiModel);
    expect(Api === GetApi()).toBeTruthy();
  });

  test('Test method receive success responce', async () => {
    const request = {
      body: {
        user: 'jane.roe@example.com',
        password: '123456qwer',
      },
      token: 'asdfgh12341234',
    };

    const responce = {
      token: 'assdfzxfefee',
      user: {
        email: 'jane.roe@example.com',
        isEmailConfirmed: true,
        isUserDeleted: false,
      },
    };

    fetch.mockResponse(JSON.stringify(responce));
    expect(await GetApi().signIn(request))
      .toEqual(responce);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual('URL/auth');
    expect(fetch.mock.calls[0][1]).toEqual({
      body: JSON.stringify({
        user: 'jane.roe@example.com',
        password: '123456qwer',
      }),
      headers: new Headers({
        Authorization: 'Bearer asdfgh12341234',
        'Content-type': 'application/json',
      }),
      method: 'POST',
    });
    fetch.resetMocks();
  });

  test('Test method receive error responce', async () => {
    const request = {
      body: {
        user: 'jane.roe@example.com',
        password: '123456qwer',
      },
    };

    const responce = {
      error: {
        message: 'User not found',
        code: 401,
      },
    };

    fetch.mockResponse(JSON.stringify(responce));
    expect(await GetApi().signIn(request))
      .toEqual({ error: { message: 'Server error: User not found' } });
    fetch.resetMocks();
  });

  test('Test method receive wrong responce', async () => {
    const request = {
      body: {
        user: 'jane.roe@example.com',
        password: '123456qwer',
      },
    };

    const responce = {
      error: {
        message: 'User not found',
        code: 401,
      },
    };

    fetch.mockResponse(responce);
    expect(await GetApi().signIn(request))
      .toEqual({
        error: {
          message: 'invalid json response body at undefined reason: Unexpected token o in JSON at position 1',
        },
      });
    fetch.resetMocks();
  });

  test('Test method with callback param', async () => {
    const request = {
      body: {
        user: 'jane.roe@example.com',
        password: '123456qwer',
      },
      callback: res => ({ status: 'okay', ...res }),
    };

    const responce = {
      token: 'qwerwqreadfqer2123',
      user: {
        email: 'email@example.com',
      },
    };

    fetch.mockResponse(JSON.stringify(responce));
    expect(await GetApi().signIn(request))
      .toEqual({
        status: 'okay',
        ...responce,
      });
    fetch.resetMocks();
  });

  test('Test method with GET fetch', async () => {
    const request = {
      body: {
        code: '5555',
      },
    };

    const responce = {
      success: true,
    };

    fetch.mockResponse(JSON.stringify(responce));
    expect(await GetApi().confirmEmail(request))
      .toEqual(responce);
    expect(fetch.mock.calls[0][0]).toEqual('URL/auth/confirmEmail/5555/');
  });
});
