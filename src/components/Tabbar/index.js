/* eslint-disable */
import React from 'react'
import { TabBar } from 'antd-mobile'
import { Route, Redirect } from 'react-router'
import { routes } from '@/routes'

class Tabbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPath: props.history.location.pathname || '/home',
      hidden: false,
      fullScreen: false,
    }
  }

  renderContent(path) {
    return routes
      .filter((route) => route.path === path)
      .map((item) => {
        return (
          <Route
            key={`${item.path}`}
            exact
            path={`${path}`}
            component={item.component}
          />
        )
      })
  }

  iconComponent(url, path) {
    if (path === '/mine') {
      return { uri: url }
    }
    return (
      <div
        style={{
          width: '22px',
          height: '22px',
          background: `url(${url}) center center /  21px 21px no-repeat`,
        }}
      />
    )
  }
  handleBadge(path) {
    switch (path) {
      case '/discovery':
        return 'new'
        break
      case '/order':
        return 1
        break
      case '/mine':
        break
      default:
        break
    }
    return null
  }
  tabbarComponent(item) {
    return (
      <TabBar.Item
        title={item.title}
        key={item.path}
        icon={this.iconComponent(item.icon, item.path)}
        selectedIcon={this.iconComponent(item.selectedIcon, item.path)}
        selected={this.state.selectedPath === item.path}
        badge={this.handleBadge(item.path)}
        onPress={() => {
          this.setState({
            selectedPath: item.path,
          })
          this.props.history.push(item.path)
        }}
        data-seed={item.seed}
      >
        {this.renderContent(this.state.selectedPath)}
      </TabBar.Item>
    )
  }

  render() {
    // 首页的tabbar不超过4个还是直接用html组件方便，
    // 如果需要每个特殊处理，new dot，数据渲染要做更多判断，操作更多
    const tabBarList = [
      {
        title: '美团',
        path: '/home',
        seed: 'logId',
        icon:
          'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
        selectedIcon:
          'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
      },
      {
        title: '发现',
        path: '/discovery',
        seed: 'logId1',
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
        selectedIcon:
          'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
      },
      {
        title: '订单',
        path: '/order',
        icon:
          'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
        selectedIcon:
          'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
      },
      {
        title: '我的',
        path: '/mine',
        icon:
          'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
        selectedIcon:
          'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
      },
    ]
    return (
      <div className={this.state.fullScreen ? 'fullScreen' : 'height-100'}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          {tabBarList.map((tabBar, index) => {
            return this.tabbarComponent(tabBar)
          })}
        </TabBar>
      </div>
    )
  }
}

export default Tabbar
