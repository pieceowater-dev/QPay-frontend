import { Flex } from 'antd'
import { Auth } from 'pages/auth'
import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet } from 'react-router'
import { Header } from 'widget/header'

export const MainPage: FC = () => {
  const [{ token }] = useCookies(['token'])

  return (
    <>
      {token ? (
        <>
          <Header />
          <div style={{ padding: '1rem' }}>
            <Outlet />
          </div>
        </>
      ) : (
        <Flex
          justify={'center'}
          align={'center'}
          style={{ height: '100vh', flexDirection: 'column' }}
        >
          <Auth />
        </Flex>
      )}
    </>
  )
}
