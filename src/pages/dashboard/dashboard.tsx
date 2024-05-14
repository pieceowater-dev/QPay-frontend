import { Select, Table } from 'antd'
import { usePaymentData } from 'entities/dashboard/payment-data'
import { useTableData } from 'entities/dashboard/table-data'
import React, { FC } from 'react'

export const Dashboard: FC = () => {
  const { fetchData, columns, postSelect } = usePaymentData()
  const { paymentTable, paymentTableSum, totalPaymentTable } = useTableData()

  return (
    <>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <div>
          <div style={{ marginBottom: '5px' }}>Посты</div>
          <Select
            mode={'multiple'}
            allowClear={true}
            options={postSelect}
            maxTagCount={1}
            onChange={(value) => {
              fetchData()
            }}
            style={{ width: 200 }}
          />
        </div>

        <div>
          <div style={{ marginBottom: '5px' }}>Дата</div>
          <Select
            options={[]}
            style={{ width: 200 }}
            onChange={(value) => {
              fetchData()
            }}
          />
        </div>
      </div>

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
