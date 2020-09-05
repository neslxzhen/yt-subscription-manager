let runtimeObj;
let storeSessionId;

if( typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined' ){
	runtimeObj = chrome.runtime;
}else{
	runtimeObj = browser.runtime;
}

console.log("in background")

