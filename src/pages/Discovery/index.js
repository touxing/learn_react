import React from 'react'

class Discovery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      imgArr: [
        'https://dummyimage.com/100x70/50B347/FFF&text=100x70',
        'https://dummyimage.com/100x80/50B347/FFF&text=100x80',
        'https://dummyimage.com/100x90/50B347/FFF&text=100x90',
        'https://dummyimage.com/100x100/50B347/FFF&text=100x100',
        'https://dummyimage.com/100x120/50B347/FFF&text=100x120',
        'https://dummyimage.com/100x150/50B347/FFF&text=100x150',
        'https://dummyimage.com/100x210/50B347/FFF&text=100x210',
        'https://dummyimage.com/100x230/50B347/FFF&text=100x230',
        'https://dummyimage.com/100x250/50B347/FFF&text=100x250',
      ],
      waterfallImgList: [],
      waterfallImgWidth: 100,
      waterfallImgRight: 10,
      waterfallImgBottom: 10,
      waterfallImgCol: null,
      waterfallDeviationHeight: [],
      time: null,
    }
    this.resize.bind(this);
  }
  componentDidMount() {
    for(let i = 0; i < 100; i ++) {
      this.state.imgList.push(this.state.imgArr[Math.round(Math.random() * 8)]);
    }
    this.calculateWidth();
    this.screenChange();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize() {
    if (this.state.time) {
      return;
    }
    const time = setTimeout(() => {
      clearTimeout(this.state.time);
      this.setState({
        waterfallImgCol: null,
        waterfallImgList: [],
        time: null,
      })
      this.calculateWidth();
    }, 300);
    this.setState({ time });
  }
  screenChange() {
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
  calculateWidth() {
    const domWidth = document.getElementById('waterfall').offsetWidth;
    const col = parseInt(domWidth / (this.state.waterfallImgWidth + this.state.waterfallImgRight));
    this.setState({ waterfallImgCol: col });
    const heightList = new Array(col);
    for(let i = 0; i < col; i ++) {
      heightList[i] = 0;
    }
    this.setState({ waterfallDeviationHeight: heightList });
    this.imgPreloading();
  }
  imgPreloading() {
    for(let i = 0; i < this.state.imgList.length; i ++) {
      const img = new Image();
      img.src = this.state.imgList[i];
      img.onload = img.onerror = () => {
        const imgData = {};
        imgData.height = (this.state.waterfallImgWidth / img.width) * img.height;
        imgData.src = this.state.imgList[i];
        this.state.waterfallImgList.push(imgData);
        this.rankImg(imgData);
      }
    }
  }
  rankImg(imgData) {
    const { waterfallImgWidth, waterfallImgRight, waterfallImgBottom, waterfallDeviationHeight } = this.state;
    const minIndex = this.filterMin();
    imgData.top = waterfallDeviationHeight[minIndex];
    imgData.left = minIndex * (waterfallImgWidth + waterfallImgRight);
    let heightList = waterfallDeviationHeight;
    heightList[minIndex] += imgData.height + waterfallImgBottom;
    this.setState({ waterfallDeviationHeight: heightList, waterfallImgList: this.state.waterfallImgList });
  }
  filterMin() {
    const { waterfallDeviationHeight } = this.state;
    const min = Math.min.apply(null, [...waterfallDeviationHeight]);
    return this.state.waterfallDeviationHeight.indexOf(min);
  }
  render() {
    return <div className="relative waterfall" id="waterfall">
      { this.state.waterfallImgList.map((img, index) => {
        const {top, left, height} = img;
        const {waterfallImgWidth} = this.state;
        return <div className="absolute waterfall-item" key={index} style={{ width: `${waterfallImgWidth}px`, height: height, top: `${top}px`, left: `${left}px` }}>
          <img src={img.src} alt=""/>
        </div>
      })}
    </div>
  }
}

export default Discovery
