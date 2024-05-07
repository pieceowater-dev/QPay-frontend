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
          justify={'space-between'}
          align={'center'}
          style={{
            height: '100vh',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: '60%',
              height: '100%',
              backgroundColor: '#6ebd74',
              backgroundImage: 'linear-gradient(45deg, #6ebd74 50%, #FFFB7D 100%)',
            }}
          />
          <Flex style={{ width: '40%' }} align={'center'} justify={'center'}>
            <Auth />
          </Flex>
        </Flex>
      )}
    </>
  )
}
