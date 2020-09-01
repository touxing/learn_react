/* eslint-disable */
import React from 'react'
import { Router } from 'react-router-dom'
import { Switch, Route, Redirect } from 'react-router'
import { history, routes } from '@/routes'
import { TabBar } from 'antd-mobile'

import './scss/reset.scss'
import './scss/common.scss'
import './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    }
  }

  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: 'block',
            marginTop: 40,
            marginBottom: 20,
            color: '#108ee9',
          }}
          onClick={(e) => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden,
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: 'block', color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault()
            this.setState({
              fullScreen: !this.state.fullScreen,
            })
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    )
  }

  iconComponent(url, key) {
    if(key === 'mine') {
      return (
        {uri: url}
      )
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
  handleBadge(key) {
    switch (key) {
      case 'discovery':
        return 'new'
        break
      case 'order':
        return 1
        break
      case 'mine':
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
        key={item.key}
        icon={this.iconComponent(item.icon, item.key)}
        selectedIcon={this.iconComponent(item.selectedIcon, item.key)}
        selected={this.state.selectedTab === item.selectedTab}
        badge={this.handleBadge(item.key)}
        onPress={() => {
          this.setState({
            selectedTab: item.selectedTab,
          })
        }}
        data-seed={item.seed}
      >
        {this.renderContent(item.title)}
      </TabBar.Item>
    )
  }

  render() {
    // 首页的tabbar不超过4个还是直接用html组件方便，
    // 如果需要每个特殊处理，new dot，数据渲染要做更多判断，操作更多
    const tabBarList = [
      {
        title: '美团',
        key: 'meituan',
        selectedTab: 'blueTab',
        seed: 'logId',
        icon:
          'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
        selectedIcon:
          'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
      },
      {
        title: '发现',
        key: 'discovery',
        selectedTab: 'redTab',
        seed: 'logId1',
        icon:
          'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
        selectedIcon:
          'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
      },
      {
        title: '订单',
        key: 'order',
        selectedTab: 'greenTab',
        icon:
          'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
        selectedIcon:
          'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
      },
      {
        title: '我的',
        key: 'mine',
        selectedTab: 'yellowTab',
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

export default App
