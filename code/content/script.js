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

$(start);

function start() {
    chrome.storage.sync.get({
        // default config
        favoriteColor: 'red',
        likesColor: true
    }, installSideBar);
}

function installSideBar(config) {
    let arr = config.side_sections;

    $.get(chrome.runtime.getURL("content/side_bar.ejs"), function (template) {
        $("#guide-renderer #sections ytd-guide-section-renderer:nth-child(1)").after(_.template(template)(fake_data))

        // add click Listener 
        for (let i in fake_data['group_meta']) {
            $('div#nesl a#group-' + i).click(function () {
                let child = $('div#nesl a#group-' + i + '-children');
                if (child.css("display") == "none") {
                    child.css("display", "block");
                } else {
                    child.css("display", "none");
                }
                console.log(i);
            })
        }

        // TODO: notify https://www.youtube.com/feed/subscriptions
    });
}

