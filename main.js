// ==UserScript==
// @name         No BiliBili Danmaku CloudFilter
// @namespace    ndcf
// @version      0.0.1
// @description  干掉弹幕云屏蔽，恢复那些被隐藏的弹幕
// @author       CorePomelo
// @license      GPL-3.0
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

if (!unsafeWindow.Map.prototype._set) {
    unsafeWindow.Map.prototype._set = unsafeWindow.Map.prototype.set
    unsafeWindow.Map.prototype.set = function (key, value) {
        if (key && key.danmakuStore) {
            let bpx_player = key
            if (!bpx_player.danmakuStore._fetchDmSeg) {
                unsafeWindow.bpx_player = window.bpx_player = bpx_player
                let danmakuStore = bpx_player.danmakuStore
                danmakuStore._fetchDmSeg = danmakuStore.fetchDmSeg
                danmakuStore.fetchDmSeg = async function () {
                    let result = await danmakuStore._fetchDmSeg(...arguments)
                    for (let danmaku of result.details.elems) {
                        danmaku.weight = 11
                    }
                }
            }
        }
        this._set(key, value)
    }
}