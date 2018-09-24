String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
}

String.prototype.simplify = function() {
    return this.removeNonLatin().removeSpace()
        .replace('.', '').replace('-', '').replace('_', '')
        .toUpperCase();
}

String.prototype.removeSpace = function() {
    return this.replace(/\s/g, '');
}

String.prototype.removeDuplicateSpace = function() {
    return this.replace(/\s+/g, ' ');
}

String.prototype.removeNonLatin = function() {
    return this.replace(/([^\x00-\xFF]|\s)*$/g, '');
}