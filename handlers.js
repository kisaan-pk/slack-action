const fs = require("fs");
const _ = require("lodash");
const core = require("@actions/core");

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

const { SLACK_AVATAR, GITHUB_ACTOR, GITHUB_EVENT_NAME, GITHUB_REPOSITORY,SERVICE_NAME,SERVICE_URL,ENVIROMMENT,WORKFLOW } =
  process.env;

const EVENT_PAYLOAD = {};

const replaceMustaches = (data) =>
  _.template(data)({ ...process.env, EVENT_PAYLOAD });

// Override Slack message
exports.getMessage = () => {
  const args = core.getInput("args");
  const DEFAULT_MESSAGE = `@${GITHUB_ACTOR} (${GITHUB_EVENT_NAME}) at ${GITHUB_REPOSITORY}`;

  if (!args) return DEFAULT_MESSAGE;

  // If any arguments provided, parse moustaches on template string:
  return replaceMustaches(args) || DEFAULT_MESSAGE;
};

const SLACK_CUSTOM_PAYLOAD = JSON.stringify({
  channel: "C053L8SNEEQ",
  username: "Kisaan Bot",
  icon_url:
    "https://imgtr.ee/images/2023/09/21/df4d90e5256b6c6913d503daec08319f.jpeg",
  sender: {
    avatar_url:
      "https://imgtr.ee/images/2023/09/21/df4d90e5256b6c6913d503daec08319f.jpeg",
  },
  owner: {
    avatar_url:
      "https://imgtr.ee/images/2023/09/21/df4d90e5256b6c6913d503daec08319f.jpeg",
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Kissan ${SERVICE_NAME} Service has been deployed successfully:*`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Build Succeeded!",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Visit Dashboard",
          emoji: true,
        },
        value: "click_me_123",
        url: SERVICE_URL,
        action_id: "button-action",
        style: "primary",
      },
    },
    {
      type: "divider",
    },
  ],
  attachments: [
    {
      color: "12B76A",
      blocks: [
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: " *Environment*",
            },
            {
              type: "mrkdwn",
              text: "*Workflow*",
            },
            {
              type: "mrkdwn",
              text: ENVIROMMENT,
            },
            {
              type: "mrkdwn",
              text: WORKFLOW,
            },
          ],
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: "*Service*",
            },
            {
              type: "mrkdwn",
              text: " ",
            },
            {
              type: "mrkdwn",
              text: SERVICE_NAME,
            },
            {
              type: "mrkdwn",
              text: " ",
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Service has been deployed on AWS Staging Server. It may take 1-2 minutes for ECS to update task definition.",
          },
        },
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "image",
              image_url:
                "https://imgtr.ee/images/2023/09/21/df4d90e5256b6c6913d503daec08319f.jpeg",
              alt_text: "cute cat",
            },
            {
              type: "mrkdwn",
              text: "Kisaan Github Action, Maintained By: <https://github.com/HUSNAINGAUHER|Husnain Gauher>",
            },
          ],
        },
      ],
    },
  ],
});

// Custom slack payload
exports.parsePayload = () => JSON.parse(replaceMustaches(SLACK_CUSTOM_PAYLOAD));

// overrides default avatar
exports.selectAvatar = () => {
  switch (SLACK_AVATAR) {
    case "sender":
      return _.get(EVENT_PAYLOAD, "sender.avatar_url") || false;
    case "repository":
      return _.get(EVENT_PAYLOAD, "owner.avatar_url") || false;
    default:
      return SLACK_AVATAR || false;
  }
};
