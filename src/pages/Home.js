import React from 'react'
import { getSliderImg } from '../Common/axios'
import "../asserts/iconfont.css"
import './Home.scss'
import HomeSwitch from '../Components/HomeSwitch'
import SongListType from '../Components/SongListType'
import Bscroll from 'better-scroll'
import Animation from '../Components/animation'
function NavLink(props) {
    return props.list.map((item, index) => (
        <div className="NavLink3_main" key={index}>
            <div className="NavLink3_li">
                <i className={`iconfont ${item.icon}`}></i>
            </div>
            <p>{item.name}</p>
        </div>
    ))
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Slider: [],
            NavLink3: [
                {
                    name: "排行榜",
                    icon: "icon-paixingbang"
                },
                {
                    name: "私人电台",
                    icon: "icon-vipsirenzhuanxiangdingzhiyewukehu"
                },
                {
                    name: "每日推荐",
                    icon: "icon-icon-"
                },
                {
                    name: "占位",
                    icon: "icon-jiarugedan"
                }
            ],
            ListType: [
                { title: "推荐菜单" },
                { title: "安静", id: 3096 },
                { title: "快乐", id: 8 },
                { title: "90年代", id: 142 },
                { title: "布鲁斯", id: 51 },
                { title: "90年代", id: 142 }
            ],
            num: 3,
            imglist: [],
            Navlink: 1
        }
    }
    componentDidMount() {
        this.computedHeight();
        this.store = window.localStorage;
        this.getImage();
        this.initslider();
        setTimeout(() => {
            document.getElementsByClassName("Nav" )[0].classList.add("NavLink2_li_animation");
        } )
    }
    getImage = () => {
        this.store = window.localStorage;
        if (this.store["slider"]) {
            this.setState({
                Slider: JSON.parse(this.store["slider"])
            })
        } else {
            getSliderImg().then((res) => {
                this.setState({
                    Slider: res
                }, function () {
                    let obj = JSON.stringify(this.state.Slider);
                    this.store["slider"] = obj
                })
            })
        }
    }
    initslider = () => {
        this.sc = new Bscroll(document.getElementsByClassName("Layout")[0], {
            scrollY: true,
            click: true,
            probeType: 3
        })
        let _this = this
        this.sc.on("scroll", (e) => {
            this.lazy();
            if (e.y < _this.sc.maxScrollY - 180) {
                if (this.state.num == 5) {
                    return null
                }
                this.setState({
                    num: 5
                }, function () {
                    _this.sc.refresh();
                })
            }
        })
        this.sc.on("touchEnd", (e) => {
            if (e.y < _this.sc.maxScrollY - 50) {
                if (this.state.num == 5) {
                    return null
                }
                else {
                    this.setState({
                        num: 5
                    }, function () {
                        _this.sc.refresh();
                    })
                }
            }
        })
    }
    renderItem = () => {

    }
    lazy = () => {
        let img = document.getElementsByTagName("img");
        let length = img.length;
        for (let i = 7; i < length; i++) {
            if (img[i].getBoundingClientRect().top < 20 + window.innerHeight) {
                img[i].classList.add("animation_opacity");
                img[i].src = img[i].getAttribute("data-src");
            }
        }
    }
    computedHeight = () => {
        let sc = document.getElementsByClassName("Layout")[0];
        console.log(sc);
        console.log(window.innerHeight)
        sc.style.height = (window.innerHeight - (100 * (document.body.clientWidth / 750) * 1.5)) + "px";
    }
    move = (e) => {
        console.log(e.target)
        document.getElementsByClassName("Nav")[0].style.left = 0.75 + "rem";
    }
    right = (e) => {
        console.log(e.target);
        document.getElementsByClassName("Nav")[0].style.left = 2.75 + "rem";
    }
    render() {
        return (
            <>

                <div className="Main">
                    <div className="Home_1">
                        <div className="NavLink">
                            <i className="iconfont icon-caidan1" style={{ color: "white" }}></i>
                            <i className="iconfont icon-yinle1"></i>
                            <i className="iconfont icon-ziyuanldpi3"></i>
                            <i className="iconfont icon-iconfontzhizuobiaozhun22" style={{ color: "white" }}></i>
                        </div>
                        <div className="NavLink2">
                            <div className="NavLink2_li" onTouchStart={(e) => this.move(e)} data-index={1} ><p>推荐</p>
                                <div className="Nav"></div>
                            </div>
                            <div className="NavLink2_li" onTouchStart={(e) => this.right(e)}><p>电台</p></div>
                        </div>
                    </div>
                </div>
                <div className="Layout">
                    <div>
                        <HomeSwitch Slider={this.state.Slider}></HomeSwitch>
                        <div className="NavLink3">
                            <NavLink list={this.state.NavLink3}></NavLink>
                        </div>
                        {this.state.ListType.slice(0, this.state.num).map((item) => {
                            return <SongListType title={item.title} id={item.id} key={item.title}></SongListType>
                        })}
                    </div>
                </div>

            </>
        )
    }
}
export default Home