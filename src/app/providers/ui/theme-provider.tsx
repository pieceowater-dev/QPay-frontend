import { ConfigProvider } from 'antd'
import { FC } from 'react'

import { IProvidersProps } from '@/app/providers/model/interface'

export const ThemeProvider: FC<IProvidersProps> = ({ children }) => {
  return (
    <ConfigProvider
      componentSize={'middle'}
      theme={{
        token: {
          colorPrimary: '#81DA88',
          // colorWhite: '#E3E3E3',
          // colorBlack: '#1D1D1D',
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
