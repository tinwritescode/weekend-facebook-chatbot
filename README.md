# GPT Facebook Chatbot

This is a repository for the GPT Facebook Chatbot. It was built during the developer's weekend and is intended to provide users with an interactive chatbot experience on Facebook. The bot can be installed and deployed on [Fly.io](http://fly.io/), and there are instructions for setting it up and running it locally. For more support, please contact the developer at [https://facebook.com/npmrunstart](https://facebook.com/npmrunstart).

<!-- make 2 columns with 2 images -->

|  /help command | /gpt command |
| --- | --- |
| ![GPT Facebook Chatbot](./images/1.png) | ![GPT Facebook Chatbot](./images/2.png) |


## Installation

First, clone the repository:

```
git clone https://github.com/tinwritescode/weekend-facebook-chatbot
```

## Deploy on [Fly.io](http://fly.io/)

```bash
fly launch
```

## Setting up

In the `config` folder, you need a file named `cookie.json` that contains the Facebook cookie. To obtain the `cookie.json` file from Facebook, install [J2Team Cookie](<https://chrome.google.com/webstore/detail/j2team-cookies/okpidcojinmlaakglciglbpcpajaibco/related>), then navigate to the extension and press the export button.

After exporting the file, move it to the `/config` folder and replace the existing `cookie.json` file.

The contents of the file should be something like this.

```json
{
  "url": "<https://www.facebook.com>",
  "cookies": [
   // many stuffs
  ]
}

```

## Running locally

To install the necessary packages for the IDO specs GPT Facebook Chatbot, run the following command:

```bash
npm install
```

To develop the chatbot with autoreload, run:

```bash
npm run dev
```

And to start the chatbot, run:

```bash
npm run start
```

These commands are essential for running the chatbot locally. Make sure to include them in your workflow.

## Contributing

Pull requests are welcome. If you plan to make major changes, please open an issue first and discuss what you would like to change.

Make sure to update the tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
