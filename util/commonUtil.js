const prodEnv = "PRODUCTION";

exports.randomTrue = () => {
    return Math.random() > 0.5;
}

exports.isProduction = () => {
    return process.env.CHITANDA_ENV && process.env.CHITANDA_ENV.toUpperCase() == prodEnv;
}