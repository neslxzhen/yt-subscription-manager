'use strict'

let fake_data = {
    "group": {
        "1": ["1", "2", "3"],
        "2": ["4", "5", "6"],
        "3": ["7", "8", "9", "10"]
    },
    "group_meta": {
        "1": {
            "title": "asmr",
            "img": "13.png"
        },
        "2": {
            "title": "independent",
            "img": "26.png"
        },
        "3": {
            "title": "pop asia",
            "img": "3.png"
        },
    },
    "channel_metas": {
        "1": {
            "title": "asmr zeitgeist",
            "path": "/channel/UCzGEGjOCbgv9z9SF71QyI7g",
            "img_id": "AATXAJzpQj0UtKIF0lOGe0XyWkNUcl0xwozNsEfQqvTC-g"
        },
        "2": {
            "title": "Hatomugi ASMR",
            "path": "/channel/UCue0AhOm8SARARIcT-0mE1w",
            "img_id": "AATXAJxPdSyuiI3GBvOwwzX8y5xE8gc88n4-TxF5FbYP7A"
        },
        "3": {
            "title": "ASMR PPOMO",
            "path": "/channel/UCAtFkapSeoEGPxm5bC3tvaw",
            "img_id": "AATXAJzZCyxDOZU2a9TLqkeBpW_NWfodZjRafGbUNZnHnQ"
        },
        "4": {
            "title": "好樂團 GoodBand",
            "path": "/channel/UCyhTOPmMeUL4inFgjaA4QxA",
            "img_id": "AATXAJxQ5j9kwcGaltx5nfFoayRgmD4r_VAJFlbtTN2lrA"
        },
        "5": {
            "title": "No Party For Cao Dong 草東沒有派對",
            "path": "/channel/UCYAyQjEhGHKARXnZe0U__9g",
            "img_id": "AATXAJyZRsmz_KJCFyk1CxcSLnYmI6bvfxBnIjt2GO2s"
        },
        "6": {
            "title": "Vast&Hazy",
            "path": "/channel/UCti3hdusePVagC6ZTXhJEow",
            "img_id": "AATXAJx5SpijicRmaBlhxjudE7kZZ-O6EgZPixKGJ9Pg"
        },
        "7": {
            "title": "The Arcadium",
            "path": "/channel/UCqEfdEvLG5oQWNYlDQrGlKw",
            "img_id": "AATXAJwor21EqqQzNvtC4Stt4_XopO1bXqWGKZT8bGlLKA"
        },
        "8": {
            "title": "TheFatRat",
            "path": "/channel/UCneusl3ljZ-874Wgra8_zhw",
            "img_id": "AATXAJy2VvrRvyg29dm8yMGTNzZzu73YK3ZBBtSwhOdI"
        },
        "9": {
            "title": "MDD 麻吉弟弟",
            "path": "/channel/UC5Hi7VYG79vR8TOT4isIDiw",
            "img_id": "AATXAJwLj4r8UV1vWXrhziz2sJOJ3f7T1aSLZknyMK6v7w"
        },
        "10": {
            "title": "Tobu",
            "path": "/channel/UCrDkAvwZum-UTjHmzDI2iIw",
            "img_id": "AATXAJyUfP93aN3_u6aUl9u2gMqiWhxc3nRJl41TjwaaZg"
        },
    }
}

start()

function start() {
    // chrome.storage.sync.get({
    //     // default config
    //     favoriteColor: 'red',
    //     likesColor: true
    // }, installSideBar);
    observeSideBar();

    let url = window.location.toString()
    if (url.match(/https:\/\/www\.youtube\.com\/watch\?v=\w+/) ||
        url.match(/https:\/\/www\.youtube\.com\/c\/.+/) ||
        url.match(/https:\/\/www\.youtube\.com\/channel\/.+/)
    ) {
        $("#primary #primary-inner #meta #subscribe-button").ready(() => {
            console.log('observe-Buttons ready')
            installButtons()
        });
    }

}

function observeSideBar() {
    let observer = new MutationObserver((mutations, observer) => {
        mutations.every(function (mutation) {
            if (mutation.target.querySelector('ytd-guide-section-renderer') !== null) {
                putSideBar()
                observer.disconnect();
                return false
            }
        });

    });

    // Sometimes components cannot be found
    // script.js:152 Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
    $("#guide-inner-content.ytd-app").ready(() => {
        console.log('observe-SideBar ready')
        observer.observe($("#guide-inner-content.ytd-app")[0], {
            childList: true,
            subtree: true,
        });
    });


}

function putSideBar() {

    $.get(chrome.runtime.getURL("content/side_bar.ejs"), function (template) {
        $("#guide-renderer #sections ytd-guide-section-renderer:nth-child(1)").after(_.template(template)(fake_data))

        // add click Listener 
        for (let i in fake_data['group_meta']) {
            $('div#side_bar a#group-' + i).click(function () {
                let child = $('div#side_bar a#group-' + i + '-children');
                if (child.css("display") == "none") {
                    child.css("display", "block");
                } else {
                    child.css("display", "none");
                }
            })
        }
    });
}

function installDialog() {

}

function installButtons() {
    $('div#subscribe-button ytd-subscribe-button-renderer').append(
        `<paper-button class="add-to-collection-button style-scope ytd-subscribe-button-renderer" role="button" >
        HEHE
        </paper-button>`
    )
    $('paper-button.add-to-collection-button').click(function () {
        // 布幕
        $('body').append(
            `<iron-overlay-backdrop style="z-index: 2201;" class="opened"></iron-overlay-backdrop>`
        )
        $('iron-overlay-backdrop').click(function () {
            disableOverlay()
        })

        $.get(chrome.runtime.getURL("content/add-to-collection.ejs"), function (template) {
            $("ytd-popup-container").append(_.template(template)(fake_data['group_meta']))

            // create Playlist
            $(".ytd-add-to-playlist-renderer .ytd-add-to-playlist-create-renderer a.ytd-compact-link-renderer").click(function () {
                $(this).hide()
                $('#create-playlist-form #name-input').show()
                $('#create-playlist-form #actions').show()
            })
            $('paper-button#ytd-add-to-playlist-create-button').click(function () {
                createPlaylist()
            })
        });
    })

}

function createPlaylist() {
    $("div#add_to_collection input.paper-input")
    disableOverlay()
}

function disableOverlay() {
    $('iron-overlay-backdrop').removeClass("opened")
    $("div#add_to_collection").remove()
}