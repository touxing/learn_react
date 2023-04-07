import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './tabbarNoContent.scss'

const pathMap = new Map()
pathMap.set('home', `/home`)
pathMap.set('discovery', '/discovery')
pathMap.set('order', '/order')
pathMap.set('mine', '/mine')

// 首页的tabbar不超过4个还是直接用html组件方便，
// 如果需要每个特殊处理，new dot，数据渲染要做更多判断，操作更多
const tabBarList = [
  {
    title: '美团',
    path: pathMap.get('home'),
    seed: 'logId',
    icon: 'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
    selectedIcon:
      'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg',
  },
  {
    title: '发现',
    path: pathMap.get('discovery'),
    seed: 'logId1',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg',
    selectedIcon:
      'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg',
  },
  {
    title: '订单',
    path: pathMap.get('order'),
    icon: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
    selectedIcon:
      'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
  },
  {
    title: '我的',
    path: pathMap.get('mine'),
    icon: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
    selectedIcon:
      'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
  },
]

class Tabbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPath: props.history.location.pathname || pathMap.get('home'),
      hidden: false,
      fullScreen: false,
    }
  }

  iconComponent(url, path) {
    if (path === pathMap.get('mine')) {
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
    let result = null
    switch (path) {
      case pathMap.get('discovery'):
        result = 'new'
        break
      case pathMap.get('order'):
        result = 1
        break
      case pathMap.get('mine'):
        break
      default:
        break
    }
    return result
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
          this.props.history.replace(item.path)
        }}
        data-seed={item.seed}
      >
        {item.path}
      </TabBar.Item>
    )
  }

  render() {
    return (
      <div className="tabbar-wrapper">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          noRenderContent={true}
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

export default withRouter(Tabbar)
