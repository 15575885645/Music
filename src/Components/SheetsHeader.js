import React from 'react'
import './SheetsHeader.scss'
import { withRouter } from 'react-router'
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    back = () => {
        this.props.history.goBack();

    }
    componentDidMount() {
           
    }
    render() {
        return (
            <div className="SheetsHeader">
                <div className="top_1">
                    <i className="iconfont icon-fanhui" onTouchStart={() => this.back()}></i>
                    <p>{this.props.title}</p>
                </div>
                <div className="header">
                    <div className="header_img">
                        <img src={this.props.location.state.data}></img>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)