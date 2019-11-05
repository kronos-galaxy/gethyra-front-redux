// @flow

import {
  forIn, merge, replace, isString, isObject,
} from 'lodash/';

type ApiFetchArgs = {
  body?: {
    [string]: any,
  },
  opt?: {},
  token?: string,
  callback?: Function,
};

type ApiElemModel = {
  url: string,
  options: {
    method?: string, // Can set exact names
    headers?: {},
  },
};

let Api = {};

export class ApiGenerator {
  constructor(baseUrl: string, apiModel: {} = {}) {
    this.baseUrl = baseUrl;
    this._generator(apiModel); // eslint-disable-line
  }

  baseUrl: string

  _fetchConstructor = (
    modelUrl: string,
    { headers: modelHeaders, ...modelOptions }: { headers?: {} } = {},
  ) => ({
    body, opt: { headers: fetchHeaders, ...opt } = {}, token, callback,
  }: ApiFetchArgs = {}) => {
    try {
      let bodyJSON;
      // URL constructor find all {....} entris and replace by values from body
      const url = replace(modelUrl, /{(.*?)}/g, (match, code) => {
        if (body && isString(body[code])) {
          return body[code];
        }
        return '';
      });
      // Headers constructor take all modelHeaders and fetchHeaders
      const headers = new Headers({ ...modelHeaders, ...fetchHeaders });
      if (isString(token)) {
        headers.append('Authorization', `Bearer ${token}`);
      }
      // Body constructor
      if (modelOptions
        && isObject(body)
        && (modelOptions.method === 'POST' || modelOptions.method === 'PUT')
      ) {
        headers.append('Content-Type', 'application/json');
        bodyJSON = JSON.stringify(body);
      }
      // Options constructor
      const options = merge({
        ...modelOptions,
        headers,
        body: bodyJSON,
      }, opt);

      return this._createFetch(url, options, callback); // eslint-disable-line
    } catch (err) {
      return this._errorHendler(err); // eslint-disable-line
    }
  }

  _generator = (models: {}) => {
    try {
      const modelGen = ({
        url: modelUrl, options: modelOptions = {},
      }: ApiElemModel, key: string) => {
        if (isString(modelUrl) && isObject(modelOptions)) {
          Object.defineProperty(
            this,
            key,
            {
              enumerable: false,
              configurable: false,
              writable: false,
              value: this._fetchConstructor(modelUrl, modelOptions), // eslint-disable-line
            },
          );
        } else {
          throw new Error('Faled to parse model object');
        }
      };

      if (models instanceof Object) {
        forIn(models, modelGen);
      }
    } catch (err) {
      // eslint-disable-next-line
      throw new Error(`Error in generation method process: ${error.message}`);
    }
  }

  _errorHendler = async (err: Error) => ({ error: { message: err.message } })

  _createFetch = async (url: string, opt: {}, callback: ?Function) => {
    const responce = await fetch(`${this.baseUrl}${url}`, opt)
      .then(res => res.json())
      .then((res) => {
        if (res.error) {
          // eslint-disable-next-line
          return this._errorHendler(new Error(`Server error: ${res.error.message}`));
        }
        return res;
      })
      // TODO: ideally, we should handle all error codes
      .catch(err => this._errorHendler(err)); // eslint-disable-line
    if (callback) {
      return callback(responce); // this u can prepare response data before return
    }
    return responce;
  }
}

const GetApi = (baseUrl?: string, apiModel?: {}): ApiGenerator => {
  if (Api instanceof ApiGenerator) {
    return Api;
  }
  if (!isString(baseUrl) && !isObject(apiModel)) {
    throw new Error('Api fetch interface is not initialized');
  }
  Api = new ApiGenerator(baseUrl, apiModel);
  return Api;
};

export default GetApi;
