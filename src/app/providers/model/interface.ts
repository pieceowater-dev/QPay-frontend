import { NotificationArgsProps } from 'antd'
import { ReactNode } from 'react'

export interface IProvidersProps {
  children: ReactNode
}

export interface INotifyContextType {
  openNotification: (
    type: INotificationType,
    title: string,
    subtitle: string,
    placement: NotificationArgsProps['placement'],
  ) => void
}

export type INotificationType = 'success' | 'info' | 'warning' | 'error'
