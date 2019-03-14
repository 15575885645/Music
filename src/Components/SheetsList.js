import React from 'react'
import { connect } from 'react-redux'
import { currentSong } from '../redux/action'
import { getPlay } from '../Common/axios'
import { currentMedia, isPlay } from '../redux/action'
import Animation from './animation'

function RenderItem(props) {
    return props.list.map((item, index) => {
        return (
            <li key={index} data-index={index}>
                <div className="SheetList_index">
                    {props.currentSong && props.currentSong.songname == item.songname
                        ?
                        <>
                            < i className="iconfont icon-horn"></i>
                        </>
                        :
                        index + 1
                    }
                </div>
                <div className="SheetList_li">
                    <p>{item.songname}</p>
                    <p style={{ color: "#D5D5D5" }}>{item.albumname}</p>
                </div>
                <i className="iconfont icon-icon"></i>
            </li >
        )
    })
}
class SheetsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null
        }
    }
    componentDidMount() {
        this.storage = window.localStorage;
    }
    TestingTouch = (e) => {
        let target = e.target
        let Tag = e.target.tagName.toLowerCase()
        let index = null;
        if (Tag === "div") {
            index = target.parentNode.getAttribute("data-index");
        }
        else if (Tag === "p") {
            index = target.parentNode.parentNode.getAttribute("data-index");
        }
        else if (Tag === "i") {
            index = target.parentNode.getAttribute("data-index");
            let array = [...this.props.Songlist]
            array.push(this.props.SheetsSong[index]);
            this.props.setSonglist(array);
            return false
        }
        else {
            index = target.getAttribute("data-index");
        }
        document.getElementsByClassName("SheetsList")[0].style.marginBottom = 1 + "rem";
        this.props.setcurrentIndex(index);
        this.props.setcurrentSong(this.props.songlist[index]);
        this.props.setSonglist(this.props.SheetsSong);
        let media = this.storage[this.props.songlist[index].songmid]
        if (media) {
            this.props.setCurrentMedia(media);
            this.props.setisPlay(false);
            setTimeout(() => { document.getElementsByTagName("audio")[0].play(); })
        }
        else {
            getPlay(this.props.songlist[index].songmid).then((res) => {
                this.storage[this.props.songlist[index].songmid] = res;
                this.props.setCurrentMedia(res);
                this.props.setisPlay(false);
                document.getElementsByTagName("audio")[0].play();
            })
        }
    }
    render() {
        return (

            < div className="SheetsList" >
                <div className="SheetsList_num">
                    <i className="iconfont icon-bofang1" ></i>
                    <p style={{ fontSize: "0.18rem" }}><span>播放全部</span>(共{this.props.num}首)</p>
                </div>
                <ul className="SheetList_ul" onTouchStart={(e) => this.TestingTouch(e)}>
                    <RenderItem currentSong={this.props.currentSong} list={this.props.songlist}></RenderItem>
                </ul>
            </div >

        )
    }
}
const mapState = (state) => {
    return {
        currentSong: state.currentSong,
        Songlist: state.Songlist,
        SheetsSong: state.SheetsSong,
        currentIndex: state.currentIndex
    }
}
const mapDis = (dispatch) => {
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
        setSonglist: function (list) {
            dispatch({
                type: "Songlist",
                Songlist: list
            })
        },
        setcurrentIndex: function (index) {
            dispatch({
                type: "currentIndex",
                currentIndex: index
            })
        }

    }
}
export default connect(mapState, mapDis)(SheetsList)