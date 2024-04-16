import { Flex } from 'antd'
import { Login } from 'pages/auth'
import React, { FC } from 'react'

export const MainPage: FC = () => {
  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100vh', flexDirection: 'column' }}>
      <Login />
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
