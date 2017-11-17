/**==== Copy right
    Sait 2017
=================*/
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const Leetscript = require('leetscript')
const LeetAdvanced = new Leetscript()
const LeetSimple = new Leetscript(true)

const prefix = config.prefix;
const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numWord = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

client.on('ready', async () => {
  return console.log('[Info] I am ready!');
});

client.on('reconnecting', () => {
  console.log('[Warn] Attempt to reconnect');
});

client.on('disconnect', () => {
  console.log('[Error] Disconnected.');
});

client.on('warn', info => {
  console.warn('[Warn] ' + info);
});

client.on('error', error => {
  console.error('[Error] ' + error.message);
});


client.on('message', message => {
try {
  if (message.guild != null && !config.guilds.includes(message.guild.id)) return;
  if (message.isMemberMentioned(client.user)) {
    if (message.author.id != config.owner) {
      if (message.content.includes('.bigtext') || message.content.includes('.leet') || message.content.includes('.ping'))
        message.reply('Dont trick me! You aint Sait');
      else if (message.content.toLowerCase().includes('is') &&
              (message.content.toLowerCase().includes('gay') || message.content.toLowerCase().includes('gei'))) {
        message.reply('Ofc, NO.');
      }
    } else if (message.content.includes('.test') && message.channel.type === 'text') {
      if (Math.random() < 0.5) message.channel.send('OK, worked!')
      else message.channel.send('Yep, Im working!');
    }
    else if (message.content.toLowerCase().includes('is') &&
            (message.content.toLowerCase().includes('gay') || message.content.toLowerCase().includes('gei'))) {
      message.channel.send('Ofc, NO.');
    }
  }
  else if (message.channel.type === 'dm') {
    var owner = message.author.id == config.owner;
    var username = message.author.username;
    var cmd = message.content;
    if (cmd.startsWith(prefix)) cmd = cmd.substring(1, cmd.length);
    if (cmd.startsWith('help')) {
      logRequest(owner, username);
      message.channel.send('Current public command: `bigtext`  `leet`  `leethard`');
    }
    else if (cmd.startsWith('bigtext')) {
      logRequest(owner, username);
      message.channel.send('Copy and paste this to where you need');
      message.channel.send('`' + textToIcon(cmd.substring(8, cmd.length)) + '`');
    }
    else if (cmd.startsWith('leethard')) {
      logRequest(owner, username);
      message.channel.send(LeetAdvanced.encode(cmd.substring(9, cmd.length)));
    }
    else if (cmd.startsWith('leet')) {
      logRequest(owner, username);
      message.channel.send(LeetSimple.encode(cmd.substring(5, cmd.length)));
    }
    else if (cmd.startsWith('antileet')) {
      logRequest(owner, username);
      console.log('cmd in development...');
    }
  }
  else if (message.author.id == config.owner && message.content.charAt(0) === prefix) {
    var cmd = message.content.substring(1, message.content.length);
    if (cmd.charAt(0) !== prefix) console.log('Command requesting...');
    console.log(cmd);
    if (cmd.startsWith('ping')) {
      message.reply('pong');

    } else if (cmd.startsWith('bigtextd')) {
      args = cmd.substring(9, cmd.length);
      message.edit(textToIcon(args));

    } else if (cmd.startsWith('bigtext')) {
      args = cmd.substring(8, cmd.length);
      console.log(args);
      message.channel.send(textToIcon(args));

    } else if (cmd.startsWith('leethard')) {
      message.edit(LeetAdvanced.encode(cmd.substring(9, cmd.length)));

    } else if (cmd.startsWith('leet')) {
      message.edit(LeetSimple.encode(cmd.substring(5, cmd.length)));

    } else if (cmd.startsWith('antileet')) {
      console.log('cmd in development...');
    } else if (cmd.startsWith('autodelete')) {
      message.delete(3000);

    } else if (cmd.startsWith('autodel')) {
      message.delete();

    } else if (cmd.startsWith('embed')) {
      args = cmd.substring(6, cmd.length);
      var embed = new Discord.RichEmbed();
      // embed.setTitle('Embed');
      embed.setColor('GREEN');
      embed.setDescription(args);
      // embed.setFooter('In testing');
      message.edit(embed);

    } else if (cmd.startsWith('gender')) {
      if (message.mentions.members.first() == null) message.reply('Mention the one whom you wonder about.')
      else if (cmd.toLowerCase().includes('gay') || cmd.toLowerCase().includes('gei')) message.reply('Definitely gay.')
      else if (cmd.toLowerCase().includes('man') || cmd.toLowerCase().includes('manly') || cmd.toLowerCase().includes('cute'))
          message.reply('AFAIK, thats NO');

    } else if (cmd.startsWith('error')) {
      if (something.notExist == null) { console.log('No exception??');}
    }
  }
  // else if (message.content === 'serverid') {
    // message.reply(message.guild.id);
  // } else if (message.content === 'channelid') {
    // message.reply(message.channel.id);
  // }
} catch (err) {
  console.error(err.stack);
}
});

function textToIcon(text) {
  var bigtext = '';
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i).toLowerCase() !== text.charAt(i).toUpperCase())
       bigtext += ':regional_indicator_' + text.charAt(i).toLowerCase() + ':'
    else if ('0' <= text.charAt(i) && text.charAt(i) <= '9')
       bigtext += ':' + numWord[numList.indexOf(text.charAt(i))] + ':'
    else if (text.charAt(i) === '?') bigtext += ':question:'
    else if (text.charAt(i) === '!') bigtext += ':exclamation:'
    else if (text.charAt(i) === '.') bigtext += ':small_blue_diamond:'
    else if (text.charAt(i) === '-') bigtext += ':heavy_minus_sign:'
    else bigtext += text.charAt(i);
  }
  return bigtext;
}

function logRequest(isOwner, name) {
  if (!isOwner) console.log('Command request by : ' + name);
}

client.login(config.token);
