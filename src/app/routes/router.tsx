import { ErrorPage } from 'pages/error'
import { Settings } from 'pages/settings'
import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { PreloaderPage } from 'shared/ui/preloader-page'

const Router = () => {
  const Main = lazy(async () => await import('pages/main'))
  const Dashboard = lazy(async () => await import('pages/dashboard'))

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
        <Route path={'settings'} element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default Router
