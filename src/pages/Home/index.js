import React from 'react'
import TopTitle from './components/TopTitle'
import Category from './components/Category'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopTitle />
        <Category />
      </React.Fragment>
    )
  }
}

export default Home
