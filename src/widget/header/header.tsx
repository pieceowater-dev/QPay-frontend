import { Flex, Space } from 'antd'
import { FC } from 'react'
import { useCookies } from 'react-cookie'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router'
import { useAppSelector } from 'shared/redux/store'

export const Header: FC = () => {
  const navigator = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, update, removeToken] = useCookies(['token'])
  const isMobile = useMediaQuery({ query: '(max-width: 768px )' })
  const access = useAppSelector((state) => state.settings.role)

  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      style={{
        padding: '1rem',
        background: '#6ebd74',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '10px' : '0',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          color: '#eeeeee',
          cursor: 'pointer',
        }}
        onClick={() => navigator('/')}
      >
        <img src={'/logo.png'} style={{ width: '30px' }} alt={'logo'} />
        Grand S - Pay
      </div>

      <Flex gap={'15px'}>
        <Space style={{ cursor: 'pointer', color: '#eeeeee' }} onClick={() => navigator('/')}>
          Аналитика
        </Space>

        {access === 'ADMINISTRATOR' && (
          <Space
            style={{ cursor: 'pointer', color: '#eeeeee' }}
            onClick={() => navigator('/settings')}
          >
            Настройки
          </Space>
        )}
        <Space style={{ cursor: 'pointer', color: '#eeeeee' }} onClick={() => removeToken('token')}>
          Выйти
        </Space>
      </Flex>
    </Flex>
  )
}
