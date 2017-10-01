This is a bot that reads GroupMe messages and forwards them to another server. In this case, the intent of this bot is to forward GroupMe messages to a custom Slackbot, which will post them.

##GroupMe Setup

This bot requires that you set up a bot on the GroupMe developer site. You will need a developer login.

https://dev.groupme.com/bots

When you create your bot, you will get a Bot ID and a Bot Name. Make sure the BOT_ID and BOT_NAME match the values in your .env file.

##Forwarding Server Setup

This bot is designed to forward content to a Slackbot, which will post that content in a slack channel.

This is the code for the accompanying bot.
https://github.com/EricFram/anderbot-slack-receiving-section-C

After setting up both bots, update the FORWARDING_ADDRESS to the URL of this other bot in the .env folder.

##Heroku Env Vars*

In your Heroku app, visit the settings tab and find the Config Variables section.

Add the following config variables based on your bot configuration

- BOT_ID (random numbers and letters assigned when you register bot on GroupMe)
- BOT_NAME (customer name assigned when you register bot on GroupMe)
- FORWARDING_ADDRESS (URL of your Slackbot)
