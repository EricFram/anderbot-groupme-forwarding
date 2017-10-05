This is a bot that reads GroupMe messages and forwards them to another server. In this case, the intent of this bot is to forward GroupMe messages to a custom Slackbot, which will post them.

This readme assumes that you are using Heroku to host your bots.

## GroupMe Setup

This bot requires that you set up a bot on the GroupMe developer site. You will need a developer login.

https://dev.groupme.com/bots

When you create your bot, you will get a BOT_ID and a BOT_NAME.

## Forwarding Server Setup

This bot is designed to forward content to a Slackbot, which will post that content in a slack channel.

This is the code for the accompanying bot.
https://github.com/EricFram/anderbot-slack-receiving-section-C

## Heroku Env Vars

In your Heroku app, visit the settings tab and find the Config Variables section.

Add the following config variables based on your bot configuration

- BOT_ID (random numbers and letters assigned when you register bot on GroupMe)
- BOT_NAME (custom name assigned when you register bot on GroupMe)
- FORWARDING_ADDRESS (URL of your Slackbot)

## TODOs

- Functionality to respond to GroupMe messages with reminders and links to Slack channel  

## Notes

The configuration of this bot was based off the GroupMe Node bot tutorial project. https://github.com/groupme/bot-tutorial-nodejs

For help setting up the bot or Heroku, follow their guide.

MIT License  
