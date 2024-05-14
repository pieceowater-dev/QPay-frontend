export interface IRowsPaymentResponse {
  id: number
  date: number
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
