import { TableProps } from 'antd'
import { useNotify } from 'app/providers/app'
import { IColumnPayments } from 'entities/dashboard/payment-data/model/interface'
import { useEffect } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { setPaymentsState } from 'shared/redux/dashboard/dashboard-slice'
import { useAppDispatch } from 'shared/redux/store'

export const usePaymentData = () => {
  const { openNotification } = useNotify()
  const dispatch = useAppDispatch()

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/payments')
      dispatch(setPaymentsState(res.data))
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о пользователях')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns: TableProps<IColumnPayments>['columns'] = [
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

  return { fetchData, columns }
}
