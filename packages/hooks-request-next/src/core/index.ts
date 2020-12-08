import { BaseHttpRequest } from './type'

// TODO: Cancel 方法

/**
 * 基础 HTTP SDK 接口实现
 */
export class BaseHttpRequestImpl implements BaseHttpRequest {
  timeout = 3000

  credentials = 'same-origin' as RequestCredentials

  responseType = 'json'

  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  } as HeadersInit

  errorHandler(e: Error) {}

  signal = null

  static requestInterceptors: Array<Function> = []

  static responseInterceptors: Array<Function> = []

  static requestUse(handler: Function): void {
    if (typeof handler !== 'function') throw new TypeError('Interceptor must be a function')
    BaseHttpRequestImpl.requestInterceptors.push(handler)
  }

  static responseUse(handler: Function): void {
    if (typeof handler !== 'function') throw new TypeError('Interceptor must be a function')
    BaseHttpRequestImpl.responseInterceptors.push(handler)
  }
}
