const prodEnv = "PRODUCTION";

exports.prefixPattern = '%prefix%';
exports.mentionBotPattern = '%mentionBot%';
exports.mentionUserPattern = '%mentionUser%';
exports.botNamePattern = '%botName%';
exports.botNicknamePattern = '%botNickname%';
exports.userNamePattern = '%userName%';
exports.userNicknamePattern = '%userNickname%';

exports.randomTrue = () => {
    return Math.random() > 0.5;
}

exports.isProduction = () => {
    return !!process.env.CHITANDA_ENV && process.env.CHITANDA_ENV.toUpperCase() == prodEnv;
}