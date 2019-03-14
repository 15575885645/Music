export function currentSong(Song) {
    return {
        type: "currentSong",
        Song
    }
}
export function isPlay(flag) {
    return {
        type: "isPlay",
        isPlay: flag
    }
}
export function currentMedia(url) {
    return {
        type: "currentMedia",
        currentMedia: url
    }
}
export function SheetsLists(list) {
    return {
        type: "SheetsSong",
        SheetsSong: [...list]
    }
}