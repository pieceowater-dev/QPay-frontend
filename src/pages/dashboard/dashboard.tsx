import { TableProps } from 'antd'
import { usePaymentData } from 'entities/dashboard/payment-data'
import { IColumnPayments } from 'entities/dashboard/payment-data/model/interface'
import { useTableData } from 'entities/dashboard/table-data'
import { DashboardCharts } from 'pages/dashboard/ui/dashboard-charts'
import { DashboardFilters } from 'pages/dashboard/ui/dashboard-filters'
import { DashboardPayment } from 'pages/dashboard/ui/dashboard-payment'
import React, { FC } from 'react'

export const Dashboard: FC = () => {
  const { fetchData, postSelect } = usePaymentData()
  const { paymentTable, paymentTableSum, totalPaymentTable } = useTableData()

  const columns: TableProps<IColumnPayments>['columns'] = [
    {
      title: 'Платеж №',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Пост',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
    },
  ]

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
