import { Flex } from 'antd'
import { Auth } from 'pages/auth'
import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { useMediaQuery } from 'react-responsive'
import { Outlet } from 'react-router'
import { Header } from 'widget/header'

export const MainPage: FC = () => {
  const [{ token }] = useCookies(['token'])
  const isMobile = useMediaQuery({ query: '(max-width: 768px )' })

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
              display: isMobile ? 'none' : 'block',
              width: '60%',
              height: '100%',
              backgroundColor: '#6ebd74',
              backgroundImage: 'linear-gradient(45deg, #6ebd74 50%, #FFFB7D 100%)',
            }}
          />
          <Flex style={{ width: isMobile ? '100%' : '40%' }} align={'center'} justify={'center'}>
            <Auth />
          </Flex>
        </Flex>
      )}
    </>
  )
}
