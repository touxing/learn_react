import React from 'react'
import TopTitle from './components/TopTitle'
import Category from './components/Category'
import Banner from './components/Banner'
import HomeGoods from './components/HomeGoods'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopTitle />
        <Category />
        <Banner />
        <HomeGoods />
      </React.Fragment>
    )
  }
}

export default Home
