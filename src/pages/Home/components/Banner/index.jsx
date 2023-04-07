import React from 'react'
import { Link } from 'react-router-dom'
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getUrlWithBasename } from '@/utils'

import './index.scss'
SwiperCore.use([Pagination])
/* eslint-disable */
export default function () {
  const banners = [
    {
      img: getUrlWithBasename('/img/banner1.jpg'),
      link: '/',
    },
    {
      img: getUrlWithBasename('/img/banner2.jpg'),
      link: '/discovery',
    },
  ]
  return (
    <React.Fragment>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        height={220}
        pagination={{
          clickable: true,
          modifierClass: 'swiper-pagination-custom ',
        }}
        // onSlideChange={() => console.log('banner slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        containerModifierClass="swiper-container-custom "
      >
        {banners.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Link to={item.link}>
                <img className="banner" src={item.img} alt="advetisement" />
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </React.Fragment>
  )
}
