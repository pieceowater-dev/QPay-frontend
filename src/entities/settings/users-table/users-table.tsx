import { Space, TableProps } from 'antd'
import { useNotify } from 'app/providers/app'
import { IUsersItems } from 'entities/settings/users-table/model/interface'
import { INewUserFormArgs } from 'features/settings/new-user/model/interface'
import { IUsersTableProps } from 'pages/settings/ui/users/model/interface'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { useToggle } from 'shared/lib/hooks/use-toggle'
import { setUsersState } from 'shared/redux/settings/settings-slice'
import { useAppDispatch } from 'shared/redux/store'

export const usersTable = () => {
  const { openNotification } = useNotify()
  const dispatch = useAppDispatch()
  const [openUser, handleUserOpen] = useToggle()
  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<INewUserFormArgs | undefined>(undefined)

  const fetchData = async (skip?: number) => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/users', { params: { skip: skip || 0 } })
      const response = res.data.items.map((item: IUsersItems) => ({
        key: item.id,
        name: item.name,
        email: item.email,
      }))

      const select = res.data.items.map((item: IUsersItems) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
      dispatch(setUsersState(select))

      setUsers(response)
      setTotalUsers(res.data.totals.count || 0)
    } catch (error) {
      openNotification('Произошла ошибка при загрузке данных о пользователях')
    }
  }

  const editUser = (data: INewUserFormArgs & { id: number }) => {
    setCurrentUser(data)
  }

  const deleteUser = async (userId: number) => {
    setDeleteLoading(true)
    try {
      const axiosInstance = await getAxiosInstance()

      await axiosInstance.patch(`/users/${userId}`, { deleted: true })
      openNotification('Пользователь удален', 'success')
      fetchData()
      setDeleteLoading(false)
    } catch (error) {
      setDeleteLoading(false)
      openNotification('Что-то пошло не так')
    }
  }

  const columns: TableProps<IUsersTableProps>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Действие',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_, record) => (
        <Space size='middle'>
          <a
            onClick={() => {
              editUser({ password: '', name: record.name, email: record.email, id: record.key })
              handleUserOpen()
            }}
          >
            Редактировать
          </a>

          <a onClick={() => (deleteLoading ? null : deleteUser(record.key))}>
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
    users,
    columns,
    currentUser,
    setCurrentUser,
    openUser,
    handleUserOpen,
    totalUsers,
    fetchData,
  }
}
