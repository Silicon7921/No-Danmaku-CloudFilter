// ==UserScript==
// @name         No BiliBili Danmaku CloudFilter
// @namespace    fkcr
// @version      0.0.2
// @description  干掉弹幕云屏蔽，恢复那些被隐藏的弹幕
// @author       CorePomelo
// @license      GPL-3.0
// @match        https://www.bilibili.com/video/*
// @run-at       document-start
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @updateURL https://raw.githubusercontent.com/Silicon7921/No-Danmaku-CloudFilter/main/main.js
// @downloadURL https://raw.githubusercontent.com/Silicon7921/No-Danmaku-CloudFilter/main/main.js
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