import React from 'react'
import './Common.scss'
class Mask extends React.Component {
    componentDidMount() {
        this.mask = document.getElementsByClassName("Mask")[0];
    }
    disappear = (sc) => {
        this.mask.style.opacity = 1;
        this.mask.style.zIndex = 10;
        sc.style.bottom = -100 + "%";
        sc.style.opacity = 0;

    }
    render() {
        return (
            <div class="Mask" onTouchStart={() => this.disappear(this.props.el)}>
            </div>
        )
    }

}