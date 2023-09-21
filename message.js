/**
  @description
  Message payload to be sent with Slack webhook
*/
const { selectAvatar, parsePayload } = require("./handlers");

const { SLACK_USERNAME, SLACK_CHANNEL } = process.env;

const messageSingleton = (() => {
  let instance;

  function createInstance() {
    return parsePayload();

    const message = {};

    message.text = {};

    // override username
    if (SLACK_USERNAME) message.username = SLACK_USERNAME;

    // override channel
    if (SLACK_CHANNEL) message.channel = SLACK_CHANNEL;

    /*
      If provided avatar add it,
      also can use use sender, or repository image.
      defaults to webhook slack app;
    */
    if (selectAvatar()) message.icon_url = selectAvatar();

    return message;
  }

  return {
    get() {
      if (!instance) instance = createInstance();
      return instance;
    },
  };
})();

module.exports = messageSingleton;
