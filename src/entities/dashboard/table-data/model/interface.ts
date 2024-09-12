import { ReactNode } from 'react'

export interface IRowsPaymentResponse {
  id: number
  createdAt: number | string
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
  status: ReactNode
  type: string
}
