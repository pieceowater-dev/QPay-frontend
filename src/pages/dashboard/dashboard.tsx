import { Table } from 'antd'
import { usePaymentData } from 'entities/dashboard/payment-data'
import { FC } from 'react'
import { useAppSelector } from 'shared/redux/store'

export const Dashboard: FC = () => {
  const { fetchData, columns } = usePaymentData()
  const payments = useAppSelector((state) => state.dashboard.payments)

  console.log(payments)

  return (
    <>
      <Table
        columns={columns}
        dataSource={[]}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
        pagination={{
          total: 0,
        }}
      />
    </>
  )
}
