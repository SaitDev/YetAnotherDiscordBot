const Colors = require('./colors');

exports.create = (link, text) => {
    return {
        description : text,
        image: {
            url: link
        },
        color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)])
    }
}