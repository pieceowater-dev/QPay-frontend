import { Tag } from 'antd'
import {
  IRowsPaymentResponse,
  ITablePaymentsState,
} from 'entities/dashboard/table-data/model/interface'
import { useEffect, useState } from 'react'
import { transformPrice } from 'shared/lib/functions/transform-price'
import { unixDate } from 'shared/lib/functions/unis-date'
import { useAppSelector } from 'shared/redux/store'

export const useTableData = () => {
  const payments = useAppSelector((state) => state.dashboard.payments)
  const [paymentTable, setPaymentTable] = useState<ITablePaymentsState[]>([])
  const [paymentTableSum, setPaymentTableSum] = useState(0)
  const totalPaymentTable = payments?.totals?.count ?? 0

  useEffect(() => {
    setPaymentTableSum(0)
    const paymentsRows =
      payments?.items?.map((row: IRowsPaymentResponse) => {
        setPaymentTableSum((prevState) => prevState + transformPrice(row.sum))
        return {
          id: row.id,
          status:
            row.result === 0 ? (
              <Tag color='success'>Успешный</Tag>
            ) : (
              <Tag color='error'>Не успешный</Tag>
            ),
          type: row.type === 0 ? 'Наличные' : 'Безналичные',
          key: row.id,
          date: row.createdAt ? unixDate(+row.createdAt * 1000, 'DMYHM') : '',
          post: row.device.name,
          sum: transformPrice(row.sum),
        }
      }) || []

    setPaymentTable(paymentsRows)
  }, [payments])

  return { paymentTable, paymentTableSum, totalPaymentTable }
}
