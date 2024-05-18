import { Select } from 'antd'
import { IDashboardProps } from 'pages/dashboard/ui/dashboard-filters/model/interface'
import React, { FC } from 'react'
import { useMediaQuery } from 'react-responsive'

export const DashboardFilters: FC<IDashboardProps> = ({ refetch, options }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px )' })

  return (
    <div
      style={{
        marginBottom: '10px',
        display: 'flex',
        gap: '10px',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      <div>
        <div style={{ marginBottom: '5px' }}>Посты</div>
        <Select
          mode={'multiple'}
          allowClear={true}
          options={options}
          maxTagCount={1}
          onChange={(value) => {
            refetch()
          }}
          style={{ width: isMobile ? '100%' : 200 }}
        />
      </div>

      <div>
        <div style={{ marginBottom: '5px' }}>Дата</div>
        <Select
          options={[]}
          style={{ width: isMobile ? '100%' : 200 }}
          onChange={(value) => {
            refetch()
          }}
        />
      </div>
    </div>
  )
}
