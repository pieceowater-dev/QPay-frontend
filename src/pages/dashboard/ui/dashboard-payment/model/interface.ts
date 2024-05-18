import { ColumnsType } from 'antd/es/table'
import { IColumnPayments } from 'entities/dashboard/payment-data/model/interface'
import { ITablePaymentsState } from 'entities/dashboard/table-data/model/interface'

export interface IDashboardPaymentProps {
  total: number
  sum: number
  rows: ITablePaymentsState[]
  columns: ColumnsType<IColumnPayments>
}
