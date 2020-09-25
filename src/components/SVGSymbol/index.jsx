import React from 'react'

export default function svg(props) {
  return (
    <svg className="icon" aria-hidden="true" style={{fontSize: props.fontSize+'px'}}>
      <use xlinkHref={`#icon-${props.name}`}></use>
    </svg>
  )
}
