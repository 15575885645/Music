import React from 'react'
import { connect } from 'react-redux'
import Bscroll from 'better-scroll'
import { currentMedia, isPlay, currentSong } from '../redux/action'
import { play } from '../Common/commonfunc'
import { getPlay } from '../Common/axios'
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.scroll = new Bscroll(document.getElementsByClassName("UpList")[0], {
            scrollY: true,
        })
    }
    SelectSong = (e) => {
        let index = null;
        if (e.target.tagName.toLowerCase() == "li") {
            index = e.target.getAttribute("data-index");
            play(this, index);
        }
        else if (e.target.tagName.toLowerCase() == "p") {
            index = e.target.parentNode.getAttribute("data-index");
            play(this, index);
        }
        else if (e.target.tagName.toLowerCase == "i" && e.target.className == "icon-icon") {
            index = e.target.parentNode.getAttribute("data-index");
            play(this, index);
        }
        this.props.setcurrentIndex(index);
    }
    Deleted = (e) => {
        let array = this.props.Songlist;
        let index = e.target.parentNode.parentNode.getAttribute("data-index");
        array.splice(index, 1);
        this.props.setcurrentIndex(index);
        this.props.setcurrentSong(array[index]);
        getPlay(array[index].songmid).then((res) => {
            this.props.setCurrentMedia(res);
            this.props.setisPlay(false);
            document.getElementsByTagName("audio")[0].play();
        })
        this.props.setSonglist(array);
    }
    render() {
        return (
            <div className="UpList" onTouchStart={(e) => this.SelectSong(e)}>
                <ul>
                    {this.props.Songlist.map((item, index) => {
                        return <li key={index} data-index={index}>
                            {this.props.currentSong.songname == item.songname ? <i className="iconfont icon-horn"></i> : ""}
                            <p>{item.songname}-{item.singer[0].name}</p>
                            <div className="shanchu">
                                <i className="iconfont icon-shanchu1" onTouchStart={(e) => this.Deleted(e)}></i>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        Songlist: state.Songlist,
        currentIndex: state.currentIndex,
        currentSong: state.currentSong
    }
}
const mapdis = (dispatch) => {
    return {
        setcurrentSong: function (Song) {
            {
                dispatch(currentSong(Song))
            }
        },
        setCurrentMedia: function (url) {
            {
                dispatch(currentMedia(url))
            }
        },
        setisPlay: function (flag) {
            dispatch(isPlay(flag))
        },
        setcurrentIndex: function (index) {
            dispatch({
                type: "currentIndex",
                currentIndex: index
            })
        },
        setSonglist: function (list) {
            dispatch({
                type: "Songlist",
                Songlist: list
            })
        }
    }
}
export default connect(mapState, mapdis)(List)