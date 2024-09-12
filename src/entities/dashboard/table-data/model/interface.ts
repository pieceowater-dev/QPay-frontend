export interface IRowsPaymentResponse {
  id: number
  datetime: number | string
  sum: string
  type: number
  result: number
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
  id: number
  status: string
  type: string
}
