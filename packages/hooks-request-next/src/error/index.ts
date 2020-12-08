/**
 * 超时
 */
export class TimeoutError extends Error {
  /**
   *
   * @param timeout 超时时间
   * @param url url链接
   */
  constructor(timeout: number, url: string) {
    super()
    this.name = `[${timeout}] timeout`
    this.message = `timeout error \n
    url: ${url}
    `
  }
}
