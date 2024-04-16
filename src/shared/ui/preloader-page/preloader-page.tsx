import { Spin } from 'antd'
import { FC } from 'react'

export const PreloaderPage: FC = () => {
  return <Spin size={'large'} fullscreen={true} />
}
