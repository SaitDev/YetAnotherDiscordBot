const Colors = require('./colors');

/**
 * Create an message embed object
 * @param {string} link image url
 * @param {string} requester footer text
 * @param {string} text embed description
 * @param {string} title embed title
 * @param {import('discord.js').MessageEmbedField} embedFields fields of this embed
 * @param {import('discord.js').MessageEmbedAuthor} embedAuthor author of this embed
 * @param {string} requesterAvatar icon on footer
 */
exports.create = (link, requester, text, title, embedFields, embedAuthor, requesterAvatar) => {
    return {
        author: embedAuthor,
        color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)]),
        title: title,
        description : text,
        image: {
            url: link
        },
        fields: embedFields,
        footer: {
            text: requester
        }
    }
}

exports.createAuthor = (author, link, icon) => {
    return {
        name: author,
        url: link,
        iconURL: icon
    }
}

exports.createField = (fieldName, body, isInline) => {
    return {
        name: fieldName,
        value: body,
        inline: isInline ? isInline : false
    }
}

/**
 *
 * @param {import('discord.js').Message} msg
 */
exports.createRequester = (msg) => {
    return exports.createFooter(msg.author.tag);
}

exports.createFooter = (name, link, proxyLink) => {
    return {
        text: name,
        iconURL: link,
        proxyIconUrl: proxyLink
    }
}