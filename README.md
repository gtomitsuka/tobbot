# tobbot - a bot for research purposes
tobbot is a research project for machine learning.
it plans to give smart answers to questions and comments
sent via DMs. It uses Twitter's REST API and

It doesn't plan to reply on Tweets because one can see what
happened to Microsoft's Tay.

It's online under [@tobbot_gt](https://twitter.com/tobbot_gt)

This isn't developed by a professor with years of AI experience,
just by a young guy interested in the field trying to do some 
experiments with it. Don't expect to much from it.

## Getting Started
Clone this repo and create a config.json, based on sample-config.json.
You'll need a Google Cloud Platform account and a project with Cloud Datastore.
Read Google's documentation for knowing how to use [Google Cloud datastore on Node](https://cloud.google.com/appengine/docs/flexible/nodejs/using-cloud-datastore).
activated, and a [Twitter API app](https://apps.twitter.com), with read/write/direct-message permission.
I recommend access tokens.

For starting, just run `npm start`. Keep in mind it won't work if Google Cloud
isn't setup correctly.