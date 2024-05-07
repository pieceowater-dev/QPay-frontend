import { IProvidersProps } from 'app/providers/model/interface'
import React from 'react'
import { Provider } from 'react-redux'
import store from 'shared/redux/store'

export const StoreProvider: React.FC<IProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
