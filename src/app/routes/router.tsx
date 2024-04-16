import React, { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { PreloaderPage } from 'shared/ui/preloader-page'

const Router = () => {
  const Main = lazy(async () => await import('pages/main'))

  return (
    <Routes>
      <Route path={'*'} element={<>Error page</>} />
      <Route path={'/'}>
        <Route
          path={'/'}
          element={
            <React.Suspense fallback={<PreloaderPage />}>
              <Main />
            </React.Suspense>
          }
        />
        <Route path={'dashboard'} element={<>Dashboard page</>} />
        <Route path={'settings'} element={<>Settings page</>} />
      </Route>
    </Routes>
  )
}

export default Router
