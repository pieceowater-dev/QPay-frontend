import { useNotify } from 'app/providers/app'
import { ErrorPage } from 'pages/error'
import { Settings } from 'pages/settings'
import React, { lazy, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Route, Routes } from 'react-router'
import { getAxiosInstance } from 'shared/api/api-query/api-query'
import { setRoleState } from 'shared/redux/settings/settings-slice'
import { useAppDispatch, useAppSelector } from 'shared/redux/store'
import { PreloaderPage } from 'shared/ui/preloader-page'

const Router = () => {
  const Main = lazy(async () => await import('pages/main'))
  const Dashboard = lazy(async () => await import('pages/dashboard'))

  const dispatch = useAppDispatch()
  const { openNotification } = useNotify()
  const [{ token }] = useCookies(['token'])
  const access = useAppSelector((state) => state.settings.role)

  const fetchData = async () => {
    try {
      const axiosInstance = await getAxiosInstance()
      const res = await axiosInstance.get('/auth/me')
      dispatch(setRoleState(res.data.role || ''))
    } catch (error) {
      dispatch(setRoleState(''))
      openNotification('Произошла ошибка при загрузке данных о пользователе')
    }
  }

  useEffect(() => {
    if (token) fetchData()
  }, [token])

  return (
    <Routes>
      <Route path={'*'} element={<ErrorPage />} />
      <Route
        path={'/'}
        element={
          <React.Suspense fallback={<PreloaderPage />}>
            <Main />
          </React.Suspense>
        }
      >
        <Route path={'/'} element={<Dashboard />} />
        {access === 'ADMINISTRATOR' && <Route path={'settings'} element={<Settings />} />}
      </Route>
    </Routes>
  )
}

export default Router
