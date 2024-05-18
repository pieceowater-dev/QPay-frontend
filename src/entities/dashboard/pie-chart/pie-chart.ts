import { useNotify } from 'app/providers/app'
import { useEffect } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const usePieChart = () => {
  const { openNotification } = useNotify()
  const dateType = useAppSelector((state) => state.dashboard.typeDate)
  const { start, end } = useAppSelector((state) => state.dashboard.selectedDates)
  const posts = useAppSelector((state) => state.dashboard.posts)

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/payments/pie-type', {
        params: { dateType: dateType, start: start, end: end, posts: posts },
      })
      console.log(res.data)
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о платежах')
    }
  }

  useEffect(() => {
    fetchData()
  }, [dateType, start, end, posts])

  const pie = {
    labels: ['Наличные', 'Каспи'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['rgb(110, 189, 116)', 'rgba(218,18,18,0.8)'],
      },
    ],
  }

  return { pie }
}
