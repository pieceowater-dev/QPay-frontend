import { Space, TableProps } from 'antd'
import { useNotify } from 'app/providers/app'
import { IUsersItems } from 'entities/settings/users-table/model/interface'
import { IUsersTableProps } from 'pages/settings/ui/users/model/interface'
import { useEffect, useState } from 'react'
import axiosInstance from 'shared/api/api-query/api-query'

export const usersTable = () => {
  const { openNotification } = useNotify()
  const [users, setUsers] = useState([])

  useEffect(() => {
    axiosInstance
      .get('/users')
      .then((res) => {
        const response = res.data.items.map((item: IUsersItems) => {
          return {
            key: item.id,
            name: item.name,
            email: item.email,
          }
        })

        setUsers(response)
      })
      .catch(() => {
        openNotification('Что-то пошло не так')
      })
  }, [])

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
          <a>Новый пароль</a>
          <a>Удалить</a>
        </Space>
      ),
    },
  ]

  return { users, columns }
}
