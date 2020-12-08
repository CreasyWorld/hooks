export type LambdaHTTPMethod = 'GET' | 'POST'

export type LambdaParam = {
  url?: string
  method?: LambdaHTTPMethod
  data?: {
    args?: any[]
  }
  meta: {
    functionName?: string
    functionGroup?: string
    gateway?: string
  }
}

/**
 * 基础 HTTP SDK 接口定义
 */
export interface BaseHttpRequest {
  // 超时时间
  timeout?: number

  // cookie
  credentials?: RequestCredentials

  // headers
  headers?: HeadersInit

  // response 可选参数: 'jsonp','json','text'
  responseType?: string

  // 异常处理
  errorHandler?: (e: Error) => void

  // 取消请求的 AbortSignal 值
  signal?: AbortSignal | null
}

export interface BaseHttpResponse {
  data: any
  headers: object
}
