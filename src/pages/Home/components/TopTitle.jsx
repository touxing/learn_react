import React, { Fragment } from 'react'
import SVGSymbol from '@/components/SVGSymbol'
import './index.scss'

class TopTitle extends React.Component {
  // 顶部热搜
  topSearchComp = () => {
    const topSearchWords = ['真功夫', '湘菜', '限时秒杀', '美团买菜', '洗牙']
    return (
      <div>
        热搜：
        {topSearchWords.map((item) => {
          return (
            <span key={item} className="top-search__tag p-6 p-l-10 p-r-10">{item}</span>
          )
        })}
      </div>
    )
  }
  toolbar = () => {
    const toolbarList = [
      {
        icon: 'scanning',
        name: '扫一扫'
      },
      {
        icon: 'QRcode',
        name: '付款码'
      },
      {
        icon: 'creditcard',
        name: '红包/卡券'
      },
      {
        icon: 'aviation',
        name: '骑车'
      }
    ]
    return (
      <div className="flex">
        {toolbarList.map((item,index) => {
          return (
            <Fragment key={item.icon}>
              <div>
                <SVGSymbol name={item.icon} fontSize={24} />
                <span>{item.name}</span>
              </div>
            </Fragment>
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div className="bg-primary p-l-10 p-r-10">
        <div className="flex bg-primary align-items-center home-top-title">
          <div className="flex-column align-items-center">
            <span>深圳</span>
            <span className="f-s-10 color-3">多云 27℃</span>
          </div>
          <div className="flex align-items-center bg-f p-l-6 search-box">
            <SVGSymbol name="search" fontSize={24} />
            <span>美食</span>
          </div>
        </div>
        {this.topSearchComp()}
        {this.toolbar()}
      </div>
    )
  }
}

export default TopTitle
