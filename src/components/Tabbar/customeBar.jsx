import React from 'react'
import { useHistory } from 'react-router-dom'
import './customeBar.scss'

function Tabbar(props) {
  const history = useHistory()

  function handleUrl(url) {
    history.replace(url)
    console.log(url)
  }

  return (
    <div className="tabbar-wrap">
      <div className="tabbar-item" onClick={() => handleUrl('/home')}>
        首页
      </div>
      <div className="tabbar-item" onClick={() => handleUrl('/discorvery')}>
        发现
      </div>
      <div className="tabbar-item" onClick={() => handleUrl('/order')}>
        订单
      </div>
      <div className="tabbar-item" onClick={() => handleUrl('/mine')}>
        我的
      </div>
    </div>
  )
}

export default Tabbar
