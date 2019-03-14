import { getPlay } from './axios'
export function random(list, num) {
    let array = [];
    for (let i = 0; i < num; i++) {
        array.push(list.splice(Math.random() * list.length, 1));
    }
    return array
}
export function randomColor(el) {
    let random = function () {
        return `rgba(${Math.random() * 255 | 0},${Math.random() * 255 | 0},${Math.random() * 255 | 0})`
    }
    el.style.background = `linear-gradient(-${45}deg,${random()},${random()},${random()},${random()})`;
    el.style.backgroundSize = "400% 400%";
}
export function downView(el) {
    el.style.bottom = -100 + "%";
    el.style.opacity = 0;
}
export function upView(el) {
    el.style.bottom = 0 + "%";
    el.style.opacity = 1;
}
export function play(_this, index) {
    _this.props.setcurrentSong(_this.props.Songlist[index]);
    getPlay(_this.props.Songlist[index].songmid).then((res) => {
        _this.props.setCurrentMedia(res);
        _this.props.setisPlay(false);
        document.getElementsByTagName("audio")[0].play();
    })
}