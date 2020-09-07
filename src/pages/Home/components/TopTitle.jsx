import React from 'react'
import SVGSymbol from '@/components/SVGSymbol'
import './index.scss'

class TopTitle extends React.Component {
  render() {
    return (
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
    )
  }
}

export default TopTitle
