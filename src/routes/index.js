import Loadable from 'react-loadable'
import { createBrowserHistory } from 'history'
import Loading from '@/components/Loading'

const Home = Loadable({
  loader: () => import('@/pages/Home'),
  loading: Loading,
})
const Discovery = Loadable({
  loader: () => import('@/pages/Discovery'),
  loading: Loading,
})
const Order = Loadable({
  loader: () => import('@/pages/Order'),
  loading: Loading,
})
const Mine = Loadable({
  loader: () => import('@/pages/Mine'),
  loading: Loading,
})
const NotFound = Loadable({
  loader: () => import('@/components/NotFound'),
  loading: null,
})

export const history = createBrowserHistory()

export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/discovery',
    component: Discovery,
  },
  {
    path: '/order',
    component: Order,
  },
  {
    path: '/mine',
    component: Mine,
  },
  {
    path: '*',
    component: NotFound,
  },
]
