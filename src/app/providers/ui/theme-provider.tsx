import { ConfigProvider } from 'antd'
import ruRU from 'antd/es/locale/ru_RU'
import { FC } from 'react'

import { IProvidersProps } from '@/app/providers/model/interface'

export const ThemeProvider: FC<IProvidersProps> = ({ children }) => {
  return (
    <ConfigProvider
      locale={{ ...ruRU }}
      componentSize={'middle'}
      theme={{
        token: {
          colorPrimary: '#6ebd74',
          borderRadius: 8,
        },
        components: {
          Spin: {
            colorBgMask: '#eeeeee',
            colorWhite: '#81DA88',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
