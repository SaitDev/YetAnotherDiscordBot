const Command = require('../Command');
const weirdo = '¡¢£¤¥¦§¨ª«¬¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽž'
const nextWordChance = 0.15;
const maxChar = 16;

const info = {
    name: "broken",
    aliases: [],
    description: 'Print a weird text',
    runIn: ["text"],
    ownerOnly: false
}

class Broken extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        if (msg.deletable) {
            msg.delete();
        }

        var words = Math.floor(Math.random() * 30 + 20);
        var message = '';
        for (var i = 1; i <= words; i++) {
            message += weirdo.charAt(Math.floor(Math.random() * (weirdo.length - 1)));
            var char = 0;
            while (char < maxChar && Math.random() >= nextWordChance) {
                message += weirdo.charAt(Math.floor(Math.random() * (weirdo.length - 1)));
                char ++;
            }
            message += '   ';
        }
        this.sendFromMessage(msg, message)
    }
}

module.exports = Broken;