import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    out: {
      type: 'console',
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'info', enableCallStack: true },
  },
});

const logger = log4js.getLogger();
logger.level = 'debug';

export default logger;
