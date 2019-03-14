import React from 'react'
import { connect } from 'react-redux'
import { currentSong } from '../redux/action'
import Footer from './Footer'
import { randomColor } from '../Common/commonfunc'
import { downView } from '../Common/commonfunc'
import Uplist from './Uplist'
class PlayerMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    componentDidMount() {
        this.PlayerMain = document.getElementsByClassName("PlayerMain")[0]
        randomColor(this.PlayerMain)
    }
    downView = () => {
        downView(this.refs.PlayerMain2);
        document.body.style.overflowY = "auto";
    }
    render() {
        return (
            <div className="PlayerMain" ref="PlayerMain2">
                <div className="PlayerMain_top">
                    <i className="iconfont icon-fanhui" onTouchStart={() => this.downView()}></i>
                    <p>{this.props.currentSong.songname}</p>
                </div>
                <div className="PlayerMain_container">
                    <div className="PlayerMain_container_out">
                        <div className="PlayerMain_img">
                            <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.props.currentSong.albummid}.jpg?max_age=2592000`}></img>
                        </div>
                    </div>
                </div>
                <div className="PlayerMain_footer">
                    <div style={{ width: "3rem", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "0.25rem" }}>
                        <Footer></Footer>
                    </div>
                </div>
                <Uplist></Uplist>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        currentSong: state.currentSong,
        SheetsList: state.SheetsList
    }
}
const mapDis = (dispatch) => {
    return {
        setcurrentSong: function (Song) {
            {
                dispatch(currentSong(Song))
            }
        }
    }
}
export default connect(mapState, mapDis)(PlayerMain)