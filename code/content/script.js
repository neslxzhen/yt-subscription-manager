'use strict'

let fake_data={
    "group":{
        "asmr": [
            "UCzGEGjOCbgv9z9SF71QyI7g",
            "UCue0AhOm8SARARIcT-0mE1w",
            "UCAtFkapSeoEGPxm5bC3tvaw"
        ],
        "independent": [
            "UCyhTOPmMeUL4inFgjaA4QxA",
            "UCYAyQjEhGHKARXnZe0U__9g",
            "UCti3hdusePVagC6ZTXhJEow"
        ],
        "pop asia": [
            "UCqEfdEvLG5oQWNYlDQrGlKw",
            "UCneusl3ljZ-874Wgra8_zhw",
            "UC5Hi7VYG79vR8TOT4isIDiw",
            "UCrDkAvwZum-UTjHmzDI2iIw"
        ]
    },
    "group_meta":{
        "asmr": {
            "img": "chrome-extension://kdmnjgijlmjgmimahnillepgcgeemffb/icon/new_pack/_13.png"
        },
        "independent": {
            "img": "chrome-extension://kdmnjgijlmjgmimahnillepgcgeemffb/icon/new_pack/_26.png"
        },
        "pop asia": {
            "img": "chrome-extension://kdmnjgijlmjgmimahnillepgcgeemffb/icon/new_pack/_3.png"
        },
    }
}

function start() {
    chrome.storage.sync.get({
        // default config
        favoriteColor: 'red',
        likesColor: true
    }, installSideBar);
}

function installSideBar(config){
    let arr=config.side_sections;
    let v = $("#guide-renderer #sections")
    let y=v.children('ytd-guide-section-renderer:nth-child(1)')

    $.get(chrome.runtime.getURL("content/side_bar.ejs"), function(template){
        y.after(_.template(template)(fake_data))
    } );
}

$(start);
