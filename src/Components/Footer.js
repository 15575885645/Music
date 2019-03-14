import React from 'react'
import { connect } from 'react-redux'
import { getPlay, getSheet } from '../Common/axios'
import { isPlay } from '../redux/action'
import { withRouter } from 'react-router'
import './Common.scss'
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }
    componentDidMount() {
        this.audio = document.getElementsByTagName("audio")[0];
        this.mask = document.getElementsByClassName("Mask")[0];
    }
    PlayAndStop = () => {
        if (this.props.isPlay) {
            this.audio.play();
            this.props.setisPlay(false)
        }
        else {
            this.audio.pause();
            this.props.setisPlay(true)
        }
    }
    nextSong = () => {
     
    }
    disappear = (sc) => {
        this.mask.style.display = "none";
        this.mask.style.zIndex = -10;
        sc.style.bottom = -100 + "%";
        sc.style.opacity = 0;
    }
    upView = (sc) => {
        this.mask.style.display = "block"
        this.mask.style.zIndex = 10
        sc.style.bottom = 0 + "%";
        sc.style.opacity = 1;
        sc.style.zIndex = 15;
    }
    render() {
        return (
            <>
                <i className="iconfont icon-xunhuan"></i>
                <i className="iconfont icon-ziyuanldpi"></i>
                {
                    this.props.isPlay ?
                        <i className="iconfont icon-bofang"
                            onTouchStart={() => this.PlayAndStop()}>
                        </i>
                        :
                        <i className="iconfont icon-zanting"
                            onTouchStart={() => this.PlayAndStop()}>
                        </i>
                }
                <i className="iconfont icon-ziyuanldpi1"
                    onTouchStart={() => this.nextSong()}>
                </i>
                <i className="iconfont icon-gedan"
                    style={{ fontSize: "0.65rem" }}
                    onTouchStart={() => this.upView(document.getElementsByClassName("UpList")[0])}>
                </i>
                <div className="Mask"
                    onTouchStart={() => this.disappear(document.getElementsByClassName("UpList")[0])}>
                </div>
            </>
        )
    }
}
const mapState = (state) => {
    return {
        currentSong: state.currentSong,
        currentMedia: state.currentMedia,
        isPlay: state.isPlay,
        Songlist: state.Songlist
    }
}
const mapDis = (dispatch) => {
    return {
        setisPlay: function (flag) {
            dispatch(isPlay(flag))
        }

    }
}
export default connect(mapState, mapDis)(withRouter(Footer))