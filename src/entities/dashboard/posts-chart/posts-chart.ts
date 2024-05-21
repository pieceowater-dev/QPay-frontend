import { useNotify } from 'app/providers/app'
import { IPostsChartsResponse } from 'entities/dashboard/posts-chart/model/interface'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useAppSelector } from 'shared/redux/store'

export const usePostsChart = () => {
  const [postsData, setPostsData] = useState<{ label: string; value: number }[]>([])
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
      if (res.data.length > 0) {
        const response = res.data.map((item: IPostsChartsResponse) => {
          return {
            label: item.name,
            value: item.sum,
          }
        })

        setPostsData(response)
      } else {
        setPostsData([])
      }
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о платежах')
    }
  }

  useEffect(() => {
    fetchData()
  }, [dateType, start, end, posts])

  return { postsData }
}
