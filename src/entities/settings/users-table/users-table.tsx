import { Space, TableProps } from 'antd'
import { useNotify } from 'app/providers/app'
import { IUsersItems } from 'entities/settings/users-table/model/interface'
import { IUsersTableProps } from 'pages/settings/ui/users/model/interface'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from 'shared/api/api-query/api-query'

export const usersTable = () => {
  const { openNotification } = useNotify()
  const [users, setUsers] = useState([])

  const deleteUser = async (userId: number) => {
    try {
      const axiosInstance = await getAxiosInstance()

      await axiosInstance.patch(`/users/${userId}`)
      openNotification('Пользователь удален')
    } catch (error) {
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
          <a>Редактировать</a>
          <a onClick={() => deleteUser(record.key)}>Удалить</a>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = await getAxiosInstance()
        const res = await axiosInstance.get('/users')
        const response = res.data.items.map((item: IUsersItems) => ({
          key: item.id,
          name: item.name,
          email: item.email,
        }))

        setUsers(response)
      } catch (error) {
        openNotification('Произошла ошибка при загрузке данных о пользователях')
      }
    }

    fetchData()
  }, [])

  return { users, columns }
}
