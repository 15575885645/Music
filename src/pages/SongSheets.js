import React from 'react'
import { withRouter } from 'react-router'
import { getSheet } from '../Common/axios'
import SheetsHeader from '../Components/SheetsHeader'
import SheetsList from '../Components/SheetsList'
import { randomColor } from '../Common/commonfunc'
import Player from '../Components/Player'
import { connect } from 'react-redux'
import Animation from '../Components/animation'
class SongSheets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: null
        }
    }
    componentDidMount() {
        getSheet(this.props.match.params.id).then((res) => {
            this.setState({
                res: res
            }, function () {
                this.props.setSheetsList(this.state.res.songlist)
                console.log(this)
            })
        })
    }
    render() {
        return (
            <div className="SongSheets">
                <SheetsHeader title={this.state.res && this.state.res.title}>
                </SheetsHeader>
                {this.state.res ?
                    <SheetsList num={this.state.res.songnum} songlist={this.state.res.songlist}></SheetsList>
                    : <Animation></Animation>
                }
                <Player></Player>
            </div>

        )
    }
}
const mapState = (state) => {
    return {
        currentSong: state.currentSong,

    }
}
const mapDis = (dispatch) => {
    return {
        setSheetsList: function (list) {
            dispatch({
                type: "SheetsSong",
                SheetsSong: [...list]
            })
        }

    }
}
const app = withRouter(SongSheets)
export default connect(mapState, mapDis)(app)
