import { Button, Flex, Table } from 'antd'
import { usersTable } from 'entities/settings/users-table'
import { NewUser } from 'features/settings/new-user'
import { FC } from 'react'

export const Users: FC = () => {
  const { users, columns, currentUser, openUser, handleUserOpen, setCurrentUser } = usersTable()

  return (
    <>
      <Flex gap={'10px'} align={'center'} style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '28px' }}>Пользователи</div>
        <Button
          type={'primary'}
          onClick={() => {
            setCurrentUser(undefined)
            handleUserOpen()
          }}
        >
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

      <NewUser open={openUser} handleModal={handleUserOpen} item={currentUser} />
    </>
  )
}
