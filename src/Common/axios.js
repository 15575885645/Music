import axios from 'axios'

export async function getSliderImg() {
    let arry = await axios.get("/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg");
    let data = [...arry.data.data.slider]
    return data;
}
export async function getListType(title, id) {
    let config = {
        "-": "recom4574349351153941",
        g_tk: 57619596,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: title == "推荐菜单" ? {
            "comm": { "ct": 24 }, "category": { "method": "get_hot_category", "param": { "qq": "" }, "module": "music.web_category_svr" }, "recomPlaylist": { "method": "get_hot_recommend", "param": { "async": 1, "cmd": 2 }, "module": "playlist.HotRecommendServer" }, "playlist": {
                "method": "get_playlist_by_category",
                "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer"
            },
            "new_song": { "module": "QQMusic.MusichallServer", "method": "GetNewSong", "param": { "type": 0 } },
            "new_album": {
                "module": "music.web_album_library",
                "method": "get_album_by_tags",
                "param": { "area": 7, "company": -1, "genre": -1, "type": -1, "year": -1, "sort": 2, "get_tags": 1, "sin": 0, "num": 40, "click_albumid": 0 }
            },
            "toplist": { "module": "music.web_toplist_svr", "method": "get_toplist_index", "param": {} },
            "focus": { "module": "QQMusic.MusichallServer", "method": "GetFocus", "param": {} }
        } : {
                "comm": { "ct": 24 }, "playlist": {
                    "method": "get_playlist_by_category",
                    "param": { "id": parseInt(id), "curPage": 1, "size": 40, "order": 5, "titleid": parseInt(id), }, "module": "playlist.PlayListPlazaServer"
                }
            }
    }
    let arry = await axios.get("/cgi-bin/musicu.fcg", {
        params: config
    });
    let data=null
    if (title == "推荐菜单") {
        data = [...arry.data.recomPlaylist.data.v_hot];
    }
    else {
        data=[...arry.data.playlist.data.v_playlist]
    }
    return data;
}

export async function getSheet(id) {
    let config = {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: parseInt(id),
        g_tk: 5381,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0
    }
    let data = await axios.get("/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg", {
        params: config
    });
    let cdlist = data.data.cdlist[0]
    let SheetObject = {
        songlist: [...cdlist.songlist].map((item) => {
            return {
                albumname: item.albumname,
                songname: item.songname,
                albummid: item.albummid,
                songmid: item.songmid,
                singer: item.singer,
                pay: item.pay
            }
        }),
        desc: cdlist.desc,
        title: cdlist.dissname,
        user: cdlist.nickname,
        logo: cdlist.logo,
        songnum: cdlist.songnum,
    }
    return SheetObject
}
export async function getPlay(id) {
    const config = {
        "-": "getplaysongvkey6884618897774599",
        g_tk: 1155999956,
        hostUin: 0,
        format: "json",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq.json",
        needNewCode: 0,
        data: { "req": { "module": "CDN.SrfCdnDispatchServer", "method": "GetCdnDispatch", "param": { "guid": "2961352985", "calltype": 0, "userip": "" } }, "req_0": { "module": "vkey.GetVkeyServer", "method": "CgiGetVkey", "param": { "guid": "2961352985", "songmid": [`${id}`], "songtype": [0], "uin": "0", "loginflag": 1, "platform": "20" } }, "comm": { "uin": 0, "format": "json", "ct": 24, "cv": 0 } }
    }
    let data = await axios.get("/cgi-bin/musicu.fcg", {
        params: config
    });
    let data2 = data.data.req_0.data.midurlinfo[0].purl;
    return data2
}