export interface IRowsPaymentResponse {
  id: number
  datetime: number | string
  sum: string
  device: {
    id: number
    name: string
  }
}

export interface ITablePaymentsState {
  key: number
  date: string
  post: string
  sum: number
}
