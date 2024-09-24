import { Table } from 'antd'
import { IDashboardPaymentProps } from 'pages/dashboard/ui/dashboard-payment/model/interface'
import React, { FC } from 'react'

export const DashboardPayment: FC<IDashboardPaymentProps> = ({ total, sum, columns, rows }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={rows}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
        pagination={{
          total: total,
        }}
        scroll={{
          x: 'max-content',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
        {'Итого: ' + sum}
      </div>
    </>
  )
}
