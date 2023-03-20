/* eslint-disable */
import React from 'react'
import { Router } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router'
import {
  history,
  routes,
  basename,
  Home,
  Discovery,
  Order,
  Mine,
} from '@/routes'

import './scss/reset.scss'
import './scss/common.scss'
import './App.scss'
import CustomeBar from './components/Tabbar/customeBar'

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
      <Router basename={basename} history={history}>
        <Switch>{getRouterByRoutes(routes)}</Switch>
        <CustomeBar></CustomeBar>
      </Router>
    )
  }
}

export default App
