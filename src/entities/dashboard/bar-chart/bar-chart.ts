import { useNotify } from 'app/providers/app'
import { useEffect } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const useBarChart = () => {
  const { openNotification } = useNotify()
  const dateType = useAppSelector((state) => state.dashboard.typeDate)
  const { start, end } = useAppSelector((state) => state.dashboard.selectedDates)
  const posts = useAppSelector((state) => state.dashboard.posts)

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/payments/pie-posts', {
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

  const bar = {
    labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    datasets: [
      {
        label: 'Общая сумма',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgb(110, 189, 116)',
      },
    ],
  }

  return { bar }
}
