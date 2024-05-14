import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import DashboardSlice from 'shared/redux/dashboard/dashboard-slice'
import SettingsSlice from 'shared/redux/settings/settings-slice'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const store = configureStore({
  reducer: {
    settings: SettingsSlice,
    dashboard: DashboardSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
