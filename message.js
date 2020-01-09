/*
  @description
  Message payload to be sent with Slack webhook
*/
import { selectAvatar, getMessage } from "./handlers.js";

const {
  SLACK_USERNAME,
  SLACK_CHANNEL,
} = process.env;

const messageSingleton = (() => {
  let instance;

  function createInstance() {
    const message = {};
    message.text = getMessage(); // Args || DEFAULT_MESSAGE

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
    }
  };
})();

export default messageSingleton;
