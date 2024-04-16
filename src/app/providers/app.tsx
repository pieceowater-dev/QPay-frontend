import { notification, NotificationArgsProps } from 'antd'
import { INotificationType, INotifyContextType } from 'app/providers/model/interface'
import React, { createContext, useContext, useMemo } from 'react'

import { RouterProvider } from '@/app/providers/ui/router-provider'
import { ThemeProvider } from '@/app/providers/ui/theme-provider'
import Router from '@/app/routes/router'

const NotifyContext = createContext<INotifyContextType | undefined>(undefined)

export const useNotify = () => {
  const context = useContext(NotifyContext)
  if (!context) {
    throw new Error('useNotify must be used within a NotifyProvider')
  }
  return context
}

export const App = () => {
  const openNotification = (
    type: INotificationType,
    title: string,
    subtitle: string,
    placement: NotificationArgsProps['placement'],
  ) => {
    notification[type]({
      message: title,
      description: subtitle,
      placement,
    })
  }

  const notifyContextValue = useMemo(() => ({ openNotification }), [])

  return (
    <RouterProvider>
      <ThemeProvider>
        <NotifyContext.Provider value={notifyContextValue}>
          <Router />
        </NotifyContext.Provider>
      </ThemeProvider>
    </RouterProvider>
  )
}
