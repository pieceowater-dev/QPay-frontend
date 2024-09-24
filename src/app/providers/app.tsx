import { notification, NotificationArgsProps } from 'antd'
import { INotificationType, INotifyContextType } from 'app/providers/model/interface'
import { StoreProvider } from 'app/providers/ui/store-provider'
import React, { createContext, useContext, useMemo, useState } from 'react'

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
  const [notificationActive, setNotificationActive] = useState(false)

  const openNotification = (
    title: string,
    type?: INotificationType,
    subtitle?: string,
    placement?: NotificationArgsProps['placement'],
  ) => {
    if (notificationActive) {
      return
    }

    setNotificationActive(true)

    notification[type || 'error']({
      message: title,
      description: subtitle,
      placement,
      onClose: () => {
        setNotificationActive(false)
      },
    })
  }

  notification.config({
    maxCount: 1,
  })

  const notifyContextValue = useMemo(() => ({ openNotification }), [notificationActive])

  return (
    <RouterProvider>
      <StoreProvider>
        <ThemeProvider>
          <NotifyContext.Provider value={notifyContextValue}>
            <Router />
          </NotifyContext.Provider>
        </ThemeProvider>
      </StoreProvider>
    </RouterProvider>
  )
}
