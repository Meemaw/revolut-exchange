module.exports = {
  target: 'serverless',
  env: {
    openExchangeRateAppId:
      process.env.OPEN_EXCHANGE_RATE_APP_ID || '95006d6af8ab4680bfb92c2059b6a8df',
  },
};
