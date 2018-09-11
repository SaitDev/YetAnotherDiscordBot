exports.simplify = (message) => {
    if (typeof message === 'undefined' || message == null) return message;
    return exports.removeNonLatin(exports.removeSpace(message))
        .replace('.', '').replace('-', '').replace('_', '')
        .toUpperCase();
}

exports.removeSpace = (message) => {
    if (typeof message === 'undefined' || message == null) return message;
    return message.replace(/\s/g, '');
}

exports.removeNonLatin = (message) => {
    if (typeof message === 'undefined' || message == null) return message;
    return message.replace(/([^\x00-\xFF]|\s)*$/g, '');
}