import { BaseHttpRequest, LambdaParam } from '../../core/type'
import { BaseHttpRequestImpl } from '../../core'
import { HttpRequest, HttpLambdaParam } from './type'
import { getDefaultHeaders } from '../../utils'
import { TimeoutError } from '../../error'

export class HttpImpl extends BaseHttpRequestImpl implements HttpRequest {
  baseURL = ''

  /**
   * 设置请求参数
   * @param customRequestOptions 用户自定义的fetch请求参数列表
   * @param requestOptions 默认的fetch请求参数列表
   */
  setRequestOptions(customRequestOptions: RequestInit, requestOptions: RequestInit) {
    for (let optionsKey of Object.keys(customRequestOptions)) {
      if (customRequestOptions[optionsKey] !== undefined) {
        requestOptions[optionsKey] = customRequestOptions[optionsKey]
      }
    }
  }

  async request(httpLambdaParam: HttpLambdaParam) {
    let {
      url,
      method,
      data,
      headers,
      credentials,
      mode,
      referrer,
      cache,
      integrity,
      keepalive,
      redirect,
      referrerPolicy,
      signal,
      timeout,
    } = httpLambdaParam
    const body = method !== 'GET' ? JSON.stringify(data) : null
    let requestOptions: RequestInit = {
      method,
      body,
      headers: headers ? headers : getDefaultHeaders(method),
      credentials: credentials || this.credentials,
    }

    this.setRequestOptions(
      { mode, referrer, cache, integrity, keepalive, redirect, referrerPolicy, signal },
      requestOptions
    )

    const fetchTimeoutPromise = () => {
      return new Promise(() => {
        timeout = timeout || this.timeout
        setTimeout(() => {
          Promise.reject(new TimeoutError(timeout, url))
        }, timeout)
      })
    }

    const fetchPromise = () => {
      return fetch(this.baseURL + url, requestOptions).then((res) => {
        if (res.ok) {
          return res.clone()[this.responseType]()
        }
      })
    }

    return Promise.race([fetchTimeoutPromise(), fetchPromise()])
  }
}
