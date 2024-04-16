import { Flex } from 'antd'
import { Auth } from 'pages/auth'
import React, { FC } from 'react'

export const MainPage: FC = () => {
  return (
    <Flex justify={'center'} align={'center'} style={{ height: '100vh', flexDirection: 'column' }}>
      <Auth />
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
