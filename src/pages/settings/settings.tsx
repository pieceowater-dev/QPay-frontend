import { Flex } from 'antd'
import { Posts } from 'pages/settings/ui/posts'
import { Users } from 'pages/settings/ui/users'
import { FC } from 'react'

export const Settings: FC = () => {
  return (
    <Flex style={{ flexDirection: 'column' }} justify={'space-between'}>
      <Users />
      <Posts />
    </Flex>
  )
}
