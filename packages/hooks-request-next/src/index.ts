import { LambdaParam } from './core/type'
import { HttpImpl } from './plugin/http'
import { HttpRequest } from './plugin/http/type'

/**
 *  全局配置
 */
export const defaults = {
  params: null,
  request: function (params: LambdaParam) {
    const { url, method, data } = params
    const httpImpl = new HttpImpl()
    return httpImpl.request(Object.assign({ url, method, data }, this.config, this.params))
  },
  config: {},
}

export const withHttp = function (httpPromise: Function, httpParams: HttpRequest) {
  defaults.params = httpParams
  const task = httpPromise()
  defaults.params = null
  return task
}

export function request(param: LambdaParam) {
  return defaults.request(param)
}
