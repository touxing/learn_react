import React from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import GoodsCard from '../GoodsCard'
import { random, throttled } from '@/utils'
import './index.scss'
import Macy from 'macy'

function renderTabBar(props) {
  return (
    <Sticky>
      {({ style }) => (
        <div style={{ ...style, zIndex: 1 }}>
          <Tabs.DefaultTabBar {...props} />
        </div>
      )}
    </Sticky>
  )
}
const tabs = [
  { title: '猜你喜欢', key: 't1' },
  { title: '今日特价', key: 't2' },
  { title: '超好评', key: 't3' },
]

const tabsKeys = Object.values(tabs).map((item) => item.key)

export default class HomeGoods extends React.Component {
  constructor(props) {
    super(props)
    // 创建一个 ref 来存储 瀑布流box 的 DOM 元素
    this.waterFallBoxRef = React.createRef()
    this.waterFallBoxRefList = {} // 存放 map 中的 ref
    this.state = {
      currentKey: tabs[0].key,
      currentTabIndex: tabs[0].index,
      masonryMap: new Map(),
    }
  }
  componentDidMount() {
    this.getMacy(0)
  }
  componentDidUpdate() {
    let { masonryMap, currentTabIndex } = this.state
    setTimeout(() => {
      if (masonryMap.has(currentTabIndex)) {
        masonryMap.get(currentTabIndex).recalculate()
        console.log('calculate')
      }
    }, 0)
  }
  // shouldComponentUpdate() {
  //   return false
  // }
  componentWillUnmount() {
  }
  screenChange = () => {
    console.log('screenChange')
  }

  // 动态渲染生成的瀑布流有问题
  getMacy = (index) => {
    const { masonryMap } = this.state
    if (masonryMap.has(index)) {
      this.state.masonryMap.get(index).reInit()
    } else {
      let masonry = new Macy({
        container: `.macy-container-${index}`, // 图像列表容器
        trueOrder: false,
        waitForImages: false,
        useOwnImageLoader: false,
        debug: true,
        margin: { x: 0, y: 6 }, // 设计列与列的间距
        columns: 2, // 设置列数
      })
      masonryMap.set(index, masonry)
      this.setState({ masonryMap })
    }
  }

  recalcMacy = throttled((index) => {
    console.log('recalculate')
    if (this.state.masonryMap.has(index)) {
      this.state.masonryMap.get(index).recalculate()
    }
  }, 300)

  renderTabContent = (key) => {
    return (
      <React.Fragment>
        {Array.from({ length: 15 }, (item, index) => {
          let info = {
            title: '标题标题'.repeat(random(1, 10)),
            perCapita: random(1, 999),
            salePerMonth: random(0, 9999),
            height: random(150, 300),
          }
          return (
            <div className="waterfall-item" key={index}>
              <GoodsCard key={index} item={info} />
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const { currentKey } = this.state
    return (
      <div>
        <WhiteSpace />
        <StickyContainer>
          <Tabs
            className="bg-transparent"
            tabs={tabs}
            initialPage={currentKey}
            renderTabBar={renderTabBar}
            onChange={(tab, index) => {
              console.log('onChange', tab)
              this.setState(
                (state, props) => ({
                  currentKey: tab.key,
                }),
                () => {
                  console.log(this.state)
                  this.getMacy(index)
                }
              )
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', index, tab)
            }}
          >
            {tabsKeys.map((item, index) => {
              return (
                <div
                  key={item}
                  className={`waterfall-wrap macy-container-${index}`}
                  ref={(element) => (this.waterFallBoxRefList[item] = element)}
                >
                  {this.renderTabContent(item)}
                </div>
              )
            })}
          </Tabs>
        </StickyContainer>
        <WhiteSpace />
      </div>
    )
  }
}
