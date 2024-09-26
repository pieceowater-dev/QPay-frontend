import { Table, TablePaginationConfig } from 'antd'
import { IDashboardPaymentProps } from 'pages/dashboard/ui/dashboard-payment/model/interface'
import React, { FC } from 'react'
import { setPaginationPayment } from 'shared/redux/dashboard/dashboard-slice'
import { useAppDispatch, useAppSelector } from 'shared/redux/store'

export const DashboardPayment: FC<IDashboardPaymentProps> = ({ total, sum, columns, rows }) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state.dashboard.pagination.current)
  const pageSize = useAppSelector((state) => state.dashboard.pagination.pageSize)

  const handleTableChange = (pagination: TablePaginationConfig) => {
    dispatch(setPaginationPayment({ current: pagination.current, pageSize: pagination.pageSize }))
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={rows}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
        onChange={handleTableChange}
        pagination={{
          total: total,
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
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
