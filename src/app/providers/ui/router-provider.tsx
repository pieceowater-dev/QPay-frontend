import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { IProvidersProps } from '@/app/providers/model/interface'

export const RouterProvider: FC<IProvidersProps> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
