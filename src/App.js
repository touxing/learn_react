/* eslint-disable */
import {history,routes} from '@/routes'
import React from 'react'
import {Redirect,Route,Router,Switch} from 'react-router-dom'

import './App.scss'
import Tabbar from './components/Tabbar/tabbarNoContent'
import './scss/common.scss'
import './scss/reset.scss'

function getRouterByRoutes(routes) {
  const renderedRoutesList = []
  const renderRoutes = (routes, parentPath) => {
    Array.isArray(routes) &&
      routes.forEach((route) => {
        const { path, redirect, children, component } = route
        if (redirect) {
          renderedRoutesList.push(
            <Redirect
              key={`${parentPath}${path}`}
              exact
              from={path}
              to={`${parentPath}${redirect}`}
            />
          )
        }
        if (component) {
          renderedRoutesList.push(
            <Route
              key={`${parentPath}${path}`}
              exact
              path={`${parentPath}${path}`}
              component={component}
            />
          )
        }
        if (Array.isArray(children) && children.length > 0) {
          renderRoutes(children, path)
        }
      })
  }
  renderRoutes(routes, '')
  return renderedRoutesList
}

class App extends React.Component {
  render() {
    return (
      // <BrowserRouter basename={basename}></BrowserRouter>
      <Router history={history}>
        <Switch>{getRouterByRoutes(routes)}</Switch>
        {/* <CustomeBar></CustomeBar> */}
        <Tabbar />
      </Router>
    )
  }
}

export default App
