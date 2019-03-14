import React from 'react'
import { getListType } from '../Common/axios'
import { random } from '../Common/commonfunc'
import { Link } from 'react-router-dom'
import Animation from './animation'
import LazyLoad from 'react-lazyload';
function RenderItem(props) {
    return props.list.map((item, index) => (
        <div key={index}>
            <div className="ListType_li" >
                <Link className="ListType_li_img" to={{
                    pathname: props.title == "推荐菜单" ? `/SongSheet/${item[0].content_id}` : `/SongSheet/${item[0].tid}`,
                    state: { data: props.title == "推荐菜单" ? item[0].cover : item[0].cover_url_small }
                }} >
                    {props.title == "推荐菜单" ? <img data-src={`${item[0].cover}`} /> : <img data-src={`${item[0].cover_url_small}`} />}
                </Link>
            </div >
            <p>{item[0].title}</p>
        </div>
    ))
}
class ListType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidUpdate(nextprops) {
        if (this.props.title == nextprops.title) {
            return false
        }
    }
    componentDidMount() {
        getListType(this.props.title, this.props.id).then((res) => {
            this.setState({
                list: [...random(res, 6)]
            }, function () {
                this.lazy()
            })
        })
    }
    lazy = () => {
        let img = document.getElementsByTagName("img");
        let length = img.length;
        for (let i = 7; i < length; i++) {
            if (img[i].getBoundingClientRect().top < 50 + window.innerHeight) {
                img[i].classList.add("animation_opacity");
                img[i].src = img[i].getAttribute("data-src");
            }
        }
    }
    render() {
        return (
            <>
                < div className="ListType" >
                    <div className="ListType_title">
                        <p>{this.props.title}</p>
                        <i className="iconfont icon-xiaojiantou"></i>
                    </div>
                    {this.state.list ?
                        <div className="ListType_ul">
                            <RenderItem list={this.state.list} title={this.props.title}></RenderItem>
                        </div> : <Animation></Animation>
                    }
                </div >

            </>
        )
    }
}
export default ListType