import { useNotify } from 'app/providers/app'
import dayjs from 'dayjs'
import { IBarChartResponse } from 'entities/dashboard/bar-chart/model/iterface'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const useBarChart = () => {
  const { openNotification } = useNotify()
  const dateType = useAppSelector((state) => state.dashboard.typeDate)
  const { start, end } = useAppSelector((state) => state.dashboard.selectedDates)
  const posts = useAppSelector((state) => state.dashboard.posts)
  const [barData, setBarData] = useState([])
  const [barLabels, setBarLabels] = useState([''])

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/payments/day-debit', {
        params: { dateType: dateType, start: start, end: end, posts: posts },
      })
      if (res.data.length > 0) {
        const dataSet = res.data.map((item: IBarChartResponse) => item.sum)
        const labels = res.data.map((item: IBarChartResponse) => {
          if (item.date) {
            return dayjs(item.date).format('DD-MM-YYYY')
          } else {
            return 'Некоректная дата'
          }
        })

        setBarData(dataSet)
        setBarLabels(labels)
      } else {
        setBarData([])
        setBarLabels([])
      }
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о платежах')
    }
  }

  useEffect(() => {
    fetchData()
  }, [dateType, start, end, posts])

  const bar = {
    labels: barLabels,
    datasets: [
      {
        label: 'Общая сумма',
        data: barData,
        backgroundColor: 'rgb(110, 189, 116)',
      },
    ],
  }

  return { bar }
}
