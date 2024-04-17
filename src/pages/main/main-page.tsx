import { Flex } from 'antd'
import { Auth } from 'pages/auth'
import React, { FC } from 'react'
import { useCookies } from 'react-cookie'

export const MainPage: FC = () => {
  const [{ token }] = useCookies(['token'])

  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100vh', flexDirection: 'column' }}>
      {token ? <>Ты в сети</> : <Auth />}
    </Flex>
  )
}

// <Flex style={{ height: '100vh' }}>
// <Layout>
//   <Header>
//     <LogoComponent />
//   </Header>
//   <Content>Content</Content>
// </Layout>
// </Flex>
