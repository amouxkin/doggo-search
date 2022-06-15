import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary
} from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Button, Col, Row } from 'antd'
import { Home } from '../pages'
import doggoImage from '../images/doggo.jpg'
import '../stylesheets/app.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true
    }
  }
})

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <nav>
          <Row>
            <Col>
              <img src={doggoImage} width="64" alt=""/>
            </Col>
            <Col>
              <h1>Doggo Search</h1>
            </Col>
            <Col flex={'auto'}/>
            <Col>
              <Row align={'bottom'}>
                <a>Search</a>
                <a>My Saved Dogs</a>
              </Row>
            </Col>
          </Row>
        </nav>
        <p>All great things have small beginnings.</p>
      </div>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                Something went wrong : "{error}"
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
              </div>
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<h1>Loading projects...</h1>}>
              <Home/>
            </React.Suspense>
          </ErrorBoundary>)}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  )
}

export default App
