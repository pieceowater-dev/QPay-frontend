import { Button, Empty, Flex } from 'antd'
import React, { FC } from 'react'

export const ErrorPage: FC = () => {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      gap={'10px'}
      style={{
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <Empty description={'Такой страницы нету'} />
      <Button type={'primary'} onClick={() => window.history.back()}>
        Вернуться назад
      </Button>
    </Flex>
  )
}
