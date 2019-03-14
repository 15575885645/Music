import React from 'react'
import Slider from './slider'
class HomeSwitch extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.Slider.length > 0 ?
                        <>
                            <Slider Slider={this.props.Slider}></ Slider>
                        </> : ""
                }

            </>
        )
    }
}
export default HomeSwitch