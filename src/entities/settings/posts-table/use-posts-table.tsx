import { Space, TableProps } from 'antd'
import { useNotify } from 'app/providers/app'
import { IPostsResponse } from 'entities/settings/posts-table/model/interface'
import { IPostsTableProps } from 'pages/settings/ui/posts/model/interface'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useToggle } from 'shared/lib/hooks/use-toggle'
import { setPostsState } from 'shared/redux/settings/settings-slice'
import { useAppDispatch } from 'shared/redux/store'

export const usePostsTable = () => {
  const { openNotification } = useNotify()
  const dispatch = useAppDispatch()
  const [postModal, handlePostModal] = useToggle()
  const [totalPosts, setTotalPosts] = useState(0)
  const [posts, setPosts] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [stopLoading, setStopLoading] = useState(false)
  const [currentPost, setCurrentPost] = useState<(IPostsResponse & { id: number }) | undefined>(
    undefined,
  )
  const [stoppedPosts, setStoppedPosts] = useState<{ id: number; stopped: boolean }[]>([])

  const fetchData = async (skip?: number) => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/posts', { params: { skip: skip || 0 } })
      const response = res.data.items.map((item: IPostsResponse) => ({
        key: item.id,
        name: item.name,
        address: item.address,
        identifier: item.id,
      }))
      const select = res.data.items.map((item: IPostsResponse) => ({
        value: item.id,
        label: item.name,
      }))
      dispatch(setPostsState(select))
      setStoppedPosts(
        res.data.items.map((item: IPostsResponse) => ({
          id: item.id,
          stopped: item.stopped,
        })),
      )
      setPosts(response)
      setTotalPosts(res.data.totals.count || 0)
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о пользователях')
    }
  }

  const deletePost = async (postId: number, stop?: boolean) => {
    const loading = (state: boolean) => (stop ? setStopLoading(state) : setDeleteLoading(state))
    loading(true)

    try {
      const axiosInstance = await getAxiosInstance()

      await axiosInstance.patch(`/posts/${postId}`, stop ? { stopped: true } : { deleted: true })
      openNotification(`Пост ${stop ? 'приостановлен' : 'удален'}`, 'success')
      fetchData()
      loading(false)
    } catch (error) {
      loading(false)
      openNotification('Что-то пошло не так')
    }
  }

  const editUser = (data: IPostsResponse & { id: number }) => {
    setCurrentPost(data)
  }

  const columns: TableProps<IPostsTableProps>['columns'] = [
    {
      title: 'Номер поста',
      dataIndex: 'identifier',
      key: 'identifier',
    },
    {
      title: 'Имя поста',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Действие',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              editUser({
                name: record.name,
                address: record.address,
                identifier: record.identifier,
                id: record.key,
              })
              handlePostModal()
            }}
          >
            Редактировать
          </a>
          <a onClick={() => (stopLoading ? null : deletePost(record.key, true))}>
            {stopLoading
              ? 'Загрузка'
              : stoppedPosts.filter((item) => item.id === record.key)[0].stopped
                ? 'Приостановлен'
                : 'Приостановить'}
          </a>
          <a onClick={() => (deleteLoading ? null : deletePost(record.key))}>
            {deleteLoading ? 'Загрузка' : 'Удалить'}
          </a>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  return {
    postModal,
    handlePostModal,
    totalPosts,
    posts,
    fetchData,
    columns,
    currentPost,
    setCurrentPost,
  }
}
