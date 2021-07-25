const choo = require('choo');
const html = require('choo/html');
const raw = require('nanohtml/raw');

function listItem(item, emit) {
    return html `
        <div class="list-item" onclick="${() => { emit('click', item.id)}}">
            <span class="item-title">${item.title ? item.title : "Untitled"}</span>
            <span class="item-meta">${item.created_at}</span>
        </div>
    `
}

function imageBlock(state) {
    return html `
        <img class="preview" src="${state.image.square.url}">
    `
}

function channelBlock(state) {
    return html `
        <div class="channel">
            <span class="channel-title">
                ${state.title}
            </span>
        </div>
    `
}

function textBlock(state) {
    return html `
        <div class="text">
            ${raw(state.content_html)}
        </div>
    `
}

module.exports = {
    listItem,
    imageBlock,
    channelBlock,
    textBlock
}