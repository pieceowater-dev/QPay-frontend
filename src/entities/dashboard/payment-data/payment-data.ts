import { useNotify } from 'app/providers/app'
import { IPostsResponse } from 'entities/settings/posts-table/model/interface'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { setPaymentsState } from 'shared/redux/dashboard/dashboard-slice'
import { useAppDispatch } from 'shared/redux/store'

export const usePaymentData = () => {
  const { openNotification } = useNotify()
  const dispatch = useAppDispatch()
  const [postSelect, setPostSelect] = useState([])

  const fetchPosts = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/posts')
      const select = res.data.items.map((item: IPostsResponse) => ({
        value: item.id,
        label: item.name,
      }))
      setPostSelect(select)
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о пользователях')
    }
  }

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/payments')
      dispatch(setPaymentsState(res.data))
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о платежах')
    }
  }

  useEffect(() => {
    fetchData()
    fetchPosts()
  }, [])

  return { fetchData, postSelect }
}
