import { Button, Flex, Table } from 'antd'
import { usersTable } from 'entities/settings/users-table'
import { NewUser } from 'features/settings/new-user'
import { FC } from 'react'

export const Users: FC = () => {
  const {
    users,
    columns,
    fetchData,
    currentUser,
    openUser,
    handleUserOpen,
    setCurrentUser,
    totalUsers,
  } = usersTable()

  return (
    <div style={{ minHeight: 350 }}>
      <Flex gap={'10px'} align={'center'} style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '28px' }}>Пользователи</div>
        <Button
          type={'primary'}
          onClick={() => {
            setCurrentUser(undefined)
            handleUserOpen()
          }}
        >
          +
        </Button>
      </Flex>

      <Table
        scroll={{
          x: 'max-content',
        }}
        columns={columns}
        dataSource={users}
        bordered={true}
        showHeader={true}
        tableLayout={'fixed'}
        pagination={{
          total: totalUsers,
        }}
      />

      <NewUser
        open={openUser}
        handleModal={handleUserOpen}
        item={currentUser}
        refetch={fetchData}
      />
    </div>
  )
}
