import { ReactNode } from 'react'

export interface IColumnPayments {
  date: string
  post: string
  sum: number
  id: number
  status: ReactNode
  type: string
}
