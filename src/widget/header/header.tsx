import { Flex, Space } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router'

export const Header: FC = () => {
  const navigator = useNavigate()

  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      style={{
        padding: '1rem',
        background: '#81DA88',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      }}
    >
      <img
        src={'/logo.png'}
        style={{ width: '30px', cursor: 'pointer' }}
        onClick={() => navigator('/')}
        alt={'logo'}
      />
      <Flex gap={'15px'}>
        <Space
          style={{ cursor: 'pointer', color: '#eeeeee' }}
          onClick={() => navigator('/settings')}
        >
          Настройки
        </Space>
      </Flex>
    </Flex>
  )
}
