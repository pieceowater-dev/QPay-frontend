import { Table } from 'antd'
import { usePaymentData } from 'entities/dashboard/payment-data'
import { useTableData } from 'entities/dashboard/table-data'
import { FC } from 'react'

export const Dashboard: FC = () => {
  const { fetchData, columns } = usePaymentData()
  const { paymentTable, paymentTableSum, totalPaymentTable } = useTableData()

  return (
    <>
      <Table
        columns={columns}
        dataSource={paymentTable}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
        pagination={{
          total: totalPaymentTable,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
        {'Итого: ' + paymentTableSum}
      </div>
    </>
  )
}
