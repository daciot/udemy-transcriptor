const transcriptPanelSelector = '[data-purpose="transcript-panel"]';
const transcriptBtnSelector = '[data-purpose="transcript-toggle"]';
const currentContainerSelector = '[class*="curriculum-item-link--is-current"]';
const titleSelector = '[data-purpose="item-title"]';
const transcriptSelector = '[data-purpose="cue-text"]';

function _getTranscriptPanelEl() {
    return document.querySelector(transcriptPanelSelector);
}

function _getToggleTranscriptBtn() {
    return document.querySelector(transcriptBtnSelector);
}

function _getCurrentTranscriptContainerEl() {
    return document.querySelector(currentContainerSelector);
}

function _getCurrentTranscriptTitle() {
    const activeContainer = _getCurrentTranscriptContainerEl();
    return activeContainer?.querySelector(titleSelector)?.innerText;
}

function _getTranscriptEl() {
    return document.querySelectorAll(transcriptSelector);
}

var dom = {
    getTranscriptPanelEl: _getTranscriptPanelEl,
    getToggleTranscriptBtn: _getToggleTranscriptBtn,
    getCurrentTranscriptTitle: _getCurrentTranscriptTitle,
    getTranscriptEl: _getTranscriptEl
}