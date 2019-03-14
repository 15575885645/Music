import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import SongSheets1 from './pages/SongSheets'
import Home1 from './pages/Home'
import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { withRouter } from 'react-router-dom'

class Routes extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            window.scrollTo(0, 0)
        }
        else if(this.props.location=="/"){
            console.log("1");
            return true
        }
    }
    render() {
        const location = this.props.location;
        return (
            <Switch location={location}>
                <Route path="/SongSheet/:id" component={SongSheets1} />
                <Route exact path="/" component={Home1} />
            </Switch>
        )
    }
}
export default withRouter(Routes)