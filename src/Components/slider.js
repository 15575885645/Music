import React from 'react'
import scroll from 'better-scroll'
import "./slider.scss"
function SliderImg(props) {
    return props.Slider.map((item, index) => (
        <li key={index}><img src={item.picUrl} /></li>
    ))
}
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.computeWidth.bind();
    }
    componentDidMount() {
        this.computeWidth();
        this.Bscroll = new scroll(document.getElementsByClassName("slider")[0], {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapThreshold: 0.3,
            snapSpeed: 400,
            snap: {
                loop: true, // 循环
                threshold: 0.3,
                speed: 400 // 轮播间隔
            },
            autoPlay:true
        })
        this.computeWidth();
    }
    computeWidth() {
        let children = document.getElementsByClassName("slider_container")[0]
        let width = document.body.clientWidth - (100 * (document.body.clientWidth / 750) * 0.5)
        children.style.width = ((children.children.length * width)) + "px";
    }
    render() {

        return (
            <>
                <div className="slider">
                    <div className="slider_container">
                        <SliderImg Slider={this.props.Slider}></SliderImg>
                    </div>
                </div>
            </>
        )
    }
}
export default Slider