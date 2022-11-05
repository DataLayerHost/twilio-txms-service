# TXMS Twilio service

You can deploy this function to create your own TXMS service on Twilio.

## Installation

Node.js 14 is expected

### Creation of environment variables

To start development version create `.env` file in the root of the project.

Contents of `.env` file:

```sh
ACCOUNT_SID=…
AUTH_TOKEN=…
DEBUG=…
PROVIDER=…
ENDPOINT=…
```

Where:
- ACCOUNT_SID: Twilio account SID
- AUTH_TOKEN: Twilio account token
- DEBUG: Debugging of the program - 1/true / 0/false
- PROVIDER: Url of the provider used (Currently [Blockbook](https://github.com/cryptohub-digital/blockbook) supported.)
- ENDPOINT: Endpoint for streaming the Core Transactions

### Installation of dependencies

To install the dependencies, run the command:

`npm i`

## Development

To run the development version, run command:

`npm run start`

## Deployment

### Development version

To deploy your project on the server, make sure you have correct rights and then run:

`npm run deploy -- -n=name --environment=dev`

Replace/delete name and environment if needed.

### Production version

`npm run deploy -- -n=name && npm run promote -- -n=name`

Replace/delete name if needed.

### Logs

Gather latest logs continuously.

`npm run logs`

### UI Editable

Make the deployment editable in the UI.

`npm run ui-active -- --sid ZS…`

## Epigram

> 「Cryptoni Confidimus」

## License

Licensed under the [CORE License](LICENSE).
