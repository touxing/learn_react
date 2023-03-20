import Loadable from 'react-loadable'
import { createBrowserHistory } from 'history'
import Loading from '@/components/Loading'

export let basename = process.env.PUBLIC_URL
console.log(`🚀 ~ file: index.js:6 ~ basename:`, basename)

export const Home = Loadable({
  loader: () => import('@/pages/Home'),
  loading: Loading,
})
export const Discovery = Loadable({
  loader: () => import('@/pages/Discovery'),
  loading: Loading,
})
export const Order = Loadable({
  loader: () => import('@/pages/Order'),
  loading: Loading,
})
export const Mine = Loadable({
  loader: () => import('@/pages/Mine'),
  loading: Loading,
})
export const NotFound = Loadable({
  loader: () => import('@/components/NotFound'),
  loading: Loading,
})

export const history = createBrowserHistory({
  basename: basename,
})
history.listen(({location, action}) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`
  );
  console.log(`The last navigation action was ${action}`);
});

export const routes = [
  {
    path: '/',
    redirect: basename + '/home',
  },
  {
    path: basename + '/home',
    component: Home,
  },
  {
    path: basename + '/discovery',
    component: Discovery,
  },
  {
    path: basename + '/order',
    component: Order,
  },
  {
    path: basename + '/mine',
    component: Mine,
  },
  {
    path: '*',
    component: NotFound,
  },
]
