import { Button, Flex, Table } from 'antd'
import { usersTable } from 'entities/settings/users-table'
import { NewUser } from 'features/settings/new-user'
import { FC } from 'react'
import { useToggle } from 'shared/lib/hooks/use-toggle'

export const Users: FC = () => {
  const [openUser, handleUserOpen] = useToggle()
  const { users, columns } = usersTable()

  return (
    <>
      <Flex gap={'10px'} align={'center'} style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '28px' }}>Пользователи</div>
        <Button type={'primary'} onClick={handleUserOpen}>
          Новый пользователь
        </Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={users}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
      />

      <NewUser open={openUser} handleModal={handleUserOpen} />
    </>
  )
}
