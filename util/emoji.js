const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numWord = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

exports.textToIcon = (str) => {
  var icons = '';
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i).toLowerCase() !== str.charAt(i).toUpperCase())
       icons += ':regional_indicator_' + str.charAt(i).toLowerCase() + ': '
    else if ('0' <= str.charAt(i) && str.charAt(i) <= '9')
       icons += ':' + numWord[numList.indexOf(str.charAt(i))] + ': '
    else if (str.charAt(i) === '?') icons += ':question: '
    else if (str.charAt(i) === '!') icons += ':exclamation: '
    else if (str.charAt(i) === '.') icons += ':small_blue_diamond: '
    else if (str.charAt(i) === '-') icons += ':heavy_minus_sign: '
    else if (str.charAt(i) === '+') icons += ':heavy_plus_sign: '
    else if (str.charAt(i) === ' ') icons += '  ';
    else icons += str.charAt(i);
  }
  return icons;
}
