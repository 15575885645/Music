import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import React from 'react'
class Routes extends React.Component {
    render() {
        return (
            <Router>
                <App></App>
            </Router >
        )
    }
}
export default Routes