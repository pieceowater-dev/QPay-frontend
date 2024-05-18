import { usePaymentData } from 'entities/dashboard/payment-data'
import { useTableData } from 'entities/dashboard/table-data'
import { DashboardCharts } from 'pages/dashboard/ui/dashboard-chats'
import { DashboardFilters } from 'pages/dashboard/ui/dashboard-filters'
import { DashboardPayment } from 'pages/dashboard/ui/dashboard-payment'
import React, { FC } from 'react'

export const Dashboard: FC = () => {
  const { fetchData, columns, postSelect } = usePaymentData()
  const { paymentTable, paymentTableSum, totalPaymentTable } = useTableData()

  return (
    <>
      <DashboardFilters refetch={fetchData} options={postSelect} />

      <DashboardCharts />

      <DashboardPayment
        total={totalPaymentTable}
        sum={paymentTableSum}
        columns={columns}
        rows={paymentTable}
      />
    </>
  )
}
