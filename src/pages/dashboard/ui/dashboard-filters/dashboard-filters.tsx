import { DatePicker, Select } from 'antd'
import { IDashboardProps } from 'pages/dashboard/ui/dashboard-filters/model/interface'
import React, { FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { dateFilter } from 'shared/lib/constants'
import {
  setPaymentsPost,
  setPaymentsSelectedDates,
  setPaymentsTypeDate,
} from 'shared/redux/dashboard/dashboard-slice'
import { useAppDispatch, useAppSelector } from 'shared/redux/store'

export const DashboardFilters: FC<IDashboardProps> = ({ refetch, options }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px )' })
  const dispatch = useAppDispatch()
  const type = useAppSelector((state) => state.dashboard.typeDate)

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
            dispatch(setPaymentsPost(value))
            refetch()
          }}
          style={{ width: isMobile ? '100%' : 200 }}
        />
      </div>

      <div>
        <div style={{ marginBottom: '5px' }}>Дата</div>
        <Select
          defaultValue={1}
          options={dateFilter}
          style={{ width: isMobile ? '100%' : 200, marginRight: 10 }}
          onChange={(value: number) => {
            if (value === 6)
              dispatch(setPaymentsSelectedDates({ start: undefined, end: undefined }))

            dispatch(setPaymentsTypeDate(value))
            refetch()
          }}
        />
        {type === 6 && (
          <DatePicker.RangePicker
            onChange={(date) => {
              dispatch(
                setPaymentsSelectedDates({ start: date?.[0]?.toDate(), end: date?.[1]?.toDate() }),
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
