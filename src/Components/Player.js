import React from 'react'
import { connect } from 'react-redux'
import { currentSong } from '../redux/action'
import PlayerMain from './PlayerMain'
import './Player.scss'
import { upView } from '../Common/commonfunc';
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
    }
    upView = () => {
        upView(document.getElementsByClassName("PlayerMain")[0]);
        document.body.style.overflowY = "hidden";
    }
    render() {
        return (
            <>
                {
                    this.props.currentSong ?
                        <>
                            <div className="Player" onTouchStart={() => this.upView()}>
                                <div className="Player_logo">
                                    <img src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.props.currentSong.albummid}.jpg?max_age=2592000`}></img>
                                </div>

                                <p>{this.props.currentSong.songname}</p>

                            </div>
                            <audio src={`http://dl.stream.qqmusic.qq.com/${this.props.currentMedia}`} ref={this.audio}></audio>
                            <PlayerMain>
                            </PlayerMain>
                        </> : ""
                }

            </>
        )
    }
}
const mapState = (state) => {
    return {
        currentSong: state.currentSong,
        currentMedia: state.currentMedia,
        Songlist: state.Songlist
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
export default connect(mapState, mapDis)(Player)