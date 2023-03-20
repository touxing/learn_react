import React from 'react'
import SVGSymbol from '@/components/SVGSymbol'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import './index.scss'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default function Category() {
  const categories = Array.from({ length: 44 }, (item, index) => {
    return {
      id: index,
      icon: 'aviation',
      name: '外卖',
    }
  })
  let processData = []
  let forStep = 15
  for (let i = 0; i < categories.length; i += forStep) {
    processData.push(categories.slice(i, i + forStep))
  }
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      height={220}
      pagination={{ clickable: true, modifierClass: 'swiper-pagination-custom ' }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      containerModifierClass="swiper-container-custom "
    >
      {processData.map((category, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="swiper-slide-item flex flex-wrap">
              {category.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex-column flex-center slide-item"
                    onClick={(item) => {console.log(item.name)}}
                  >
                    <SVGSymbol name={item.icon} fontSize={40} />
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
