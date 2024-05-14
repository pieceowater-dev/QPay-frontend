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
  const totalPaymentTable = payments.totals.count

  useEffect(() => {
    setPaymentTableSum(0)
    const paymentsRows = payments.items.map((row: IRowsPaymentResponse) => {
      setPaymentTableSum((prevState) => prevState + transformPrice(row.sum))
      return {
        key: row.id,
        date: unixDate(row.date * 1000, 'DMYHM'),
        post: row.device.name,
        sum: transformPrice(row.sum),
      }
    })

    setPaymentTable(paymentsRows)
  }, [payments])

  return { paymentTable, paymentTableSum, totalPaymentTable }
}
