import React from 'react'
import { useHistory } from 'react-router-dom'
import './customeBar.scss'

export default function Tabbar(props) {
  const history = useHistory()

  function handleUrl(url) {
    history.replace(url)
    console.log(url)
  }

  return (
    <div className="tabbar-wrap">
      <div className="tabbar-item" onClick={() => handleUrl('/home')}>
        a
      </div>
      <div className="tabbar-item" onClick={() => handleUrl('/discorvery')}>
        b
      </div>
      <div className="tabbar-item" onClick={() => handleUrl('/order')}>
        c
      </div>
      <div className="tabbar-item" onClick={() => handleUrl('/mine')}>
        d
      </div>
    </div>
  )
}
