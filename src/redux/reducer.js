let states = {
    currentSong: null,
    isPlay: true,
    currentMedia: null,
    SheetsSong: [],
    currentIndex:null
}

export function Song(state = states, action) {
    switch (action.type) {
        case "currentSong": return Object.assign({}, state, {
            currentSong: { ...action.Song }
        })
        case "isPlay": return { ...state, ...action }
        case "currentMedia": return { ...state, ...action }
        case "SheetsSong": return Object.assign({}, state, {
            SheetsSong: [...action.SheetsSong]
        })
        case "Songlist": return { ...state, ...action }
        case "currentIndex": return { ...state, ...action }
    }
    return state
}