import React from "react"
import './animation.css'
class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="loading">
                <div className="div1"><div className="container"></div></div>
                <div className="div2"><div className="container"></div></div>
                <div className="div3"><div className="container"></div></div>
                <div className="div4"><div className="container"></div></div>
                <br />
                <p>loading.....</p>
            </div>
        )
    }
}
export default Loading