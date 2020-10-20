import React from 'react'
import { Tabs, WhiteSpace, WingBlank } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import GoodsCard from '../GoodsCard'

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

function renderTabContent(key) {
  return (
    <React.Fragment>
      <GoodsCard />
      <GoodsCard />
      <GoodsCard />
      <GoodsCard />
    </React.Fragment>
  )
}

export default function TabExample() {
  return (
    <div>
      <WhiteSpace />
      <StickyContainer>
        <Tabs
          className="bg-transparent"
          tabs={tabs}
          initialPage={'t1'}
          renderTabBar={renderTabBar}
          onChange={(tab, index) => {
            console.log('onChange', index, tab)
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab)
          }}
        >
          <WingBlank>
            {tabsKeys.map((item) => {
              return (
                <div key={item} className="flex justify-content-between flex-wrap">
                  {renderTabContent(item)}
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
