
import routes from './routes/routes'
import MainLayout from './components/layout/MainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageWrapper from './components/common/PageWrapper'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route, index) => (
            route.index ? (
              <Route
                index
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : route.element}
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>
                ) : route.element}
              />
            )
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
