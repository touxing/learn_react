import React from 'react'
import { Tabs, WhiteSpace, WingBlank } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import GoodsCard from '../GoodsCard'
import { random } from '@/utils'
import './index.scss'

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

export default class HomeGoods extends React.Component{
  constructor(props) {
    super(props)
    // 创建一个 ref 来存储 瀑布流box 的 DOM 元素
    this.waterFallBoxRef = React.createRef()
    this.waterFallBoxRefList = {} // 存放 map 中的 ref
    this.state = {
      currentKey: tabs[0].key,
      gap: 6,
      imgList: Array.from({length: 15}, () => ({top: 0, left: 0}))
    }
  }
  componentDidMount() {
    window.addEventListener('load', this.componentLoaded)
    setTimeout(() => {
      this.initWaterFall()
    }, 1000);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.initWaterFall)
  }
  componentLoaded = () => {
    console.log('componentLoaded')
  }
  screenChange = () => {
    window.addEventListener('resize', this.initWaterFall)
  }
  initWaterFall = () => {
    console.log('initWaterFall')
    // 定义每一列之间的间隙
    let { gap, currentKey } = this.state
    let waterFallBox = this.waterFallBoxRefList[currentKey]
    console.log(waterFallBox);
    // let waterFallBox = document.querySelector('.waterFall')
    // 1. 确定列数 = 容器宽度 / 图片宽度
    let domBox = waterFallBox.getBoundingClientRect()
    let items = waterFallBox.children
    let boxWidth = domBox.width // 容器宽度
    let itemWidth = items[0].offsetWidth // 单张图片宽度
    let column = parseInt(boxWidth / (itemWidth + gap)) // 列数
    let arr = [] // 记录每列的高度
    let imgList = []

    console.log(items);
    for(let i = 0, len=items.length; i < len; i++) {
      if(i < column) {
        // 2. 确定第一行
        // items[i].style.top = 0
        // items[i].style.left = (itemWidth + gap) * i + 'px'
        arr.push(items[i].offsetHeight)
        imgList.push({
          top: 0,
          left: (itemWidth + gap) * i
        })
      } else {
        // 其他行
        // 3. 找到数组中最小高度 和 它的索引
        let index = this.getMin(arr).index

        // 4. 设置下一行的第一个盒子位置
        // top值是 最小列高度 + gap
        // left值是 最小列距离左边的距离
        // items[i].style.top = arr[index] + gap + 'px'
        // items[i].style.left = items[index].offsetLeft + gap + 'px'
        // 真实的 DOM 还没渲染 items[index].offsetLeft=0
        // bug: 这里只加了图片的高度，没有加整个盒子的高度
        imgList.push({
          top: arr[index] + gap,
          left: (itemWidth + gap) * index
        })

        // 5. 修改最小列的高度
        // 最小列高度 = 当前自己的高度 + 拼接的高度 + 间隙的高度
        arr[index] = arr[index] + items[i].offsetHeight + gap
      }
    }

    // 设置父容器高度
    let maxHeight = Math.max.apply(null, arr)
    waterFallBox.style.height = maxHeight + 'px'

    this.setState({
      imgList
    })
  }
  getMin = (arr=[]) => {
    let index = 0
    let min = arr[index];
    for(let i = 1; i < arr.length; i++) {
      if(min > arr[i]) {
        min = arr[i]
        index = i
      }
    }
    return {value: min, index}
  }

  renderTabContent = (key) => {
    let { imgList=[] } = this.state
    return (
      <React.Fragment>
        {Array.from({length: 15}, (item, index) => {
          let info = {
            title: '标题标题'.repeat(Math.random() * 10 + 1),
            perCapita: random(1, 999),
            salePerMonth: random(0, 9999),
            height: random(150, 300)
          }
          let top = imgList[index].top
          let left = imgList[index].left
          return (
            <div className="waterfall-item" key={index} style={{top: `${top}px`, left: `${left}px`}}>
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
              this.setState({
                currentKey: tab.key
              })
            }}
            onTabClick={(tab, index) => {
              // console.log('onTabClick', index, tab)
            }}
          >
            <WingBlank>
              {tabsKeys.map((item, index) => {
                return (
                  <div key={item} className="relative waterFall" style={{height: '100vh'}} ref={element => this.waterFallBoxRefList[item] = element}>
                    {this.renderTabContent(item)}
                  </div>
                )
              })}
            </WingBlank>
          </Tabs>
        </StickyContainer>
        <WhiteSpace />
      </div>
    )
  }
}
