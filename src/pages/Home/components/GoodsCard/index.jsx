import {getUrlWithBasename} from '@/utils'
import React, {useEffect} from 'react'
import './index.scss'

export default function (props) {
  let { item = {} } = props
  useEffect(() => {
    // console.log('GoodsCard useEffect')
  })

  return (
    <div
     className="goods-box"
    >
      <img className="goods-img" style={{height: item.height+'px'}} src={getUrlWithBasename("/img/banner1.jpg")} alt="goods"/>
      <div className="p-l-6 p-r-6">
        <div className="m-b-8 f-s-16 color-black text-over-2 home-top-titl">{ item.title }</div>
        <div className="m-b-6 f-s-12 color-6 text-over-1">评分信息</div>
        <div className="m-b-6 f-s-12 color-9">人均<span className='color-red f-s-14'>{item.perCapita}<span>&yen;</span></span> | 月销{item.salePerMonth}</div>
        <div className="f-s-12 color-3 text-over-1">满减，满减</div>
      </div>
    </div>
  )
}
