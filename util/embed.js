const Colors = require('./colors');

exports.create = (link, requester, text) => {
    return {
        description : text,
        image: {
            url: link
        },
        color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)]),
        footer: {
            text: requester
        }
    }
}