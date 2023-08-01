# TxMS Twilio Service

Deploy this function to establish your own TxMS service via Twilio.

## Installation

Ensure you have Node.js 14 installed.

### Setting Up Environment Variables

For the development version, create a `.env` file in the project's root directory. The `.env` file should contain the following:

```sh
ACCOUNT_SID=…
AUTH_TOKEN=…
DEBUG=…
PROVIDER=…
ENDPOINT=…
```

Where:
- ACCOUNT_SID: Your Twilio account SID
- AUTH_TOKEN: Your Twilio account token
- DEBUG: Program debugging setting - 1/true or 0/false
- PROVIDER: URL of the provider in use (Currently, [Blockbook](https://github.com/trezor/blockbook) is supported.)
- ENDPOINT: Endpoint for streaming Core Transactions

### Dependency Installation

Install the necessary dependencies by running the command:

`npm i`

## Development

To launch the development version, run the following command:

`npm run start`

## Deployment

### Development Version

To deploy your project on a server, ensure you have the necessary permissions, then execute:

`npm run deploy -- -n=name --environment=dev`

Alter or remove the name and environment as necessary.

### Production Version

`npm run deploy -- -n=name && npm run promote -- -n=name`

Alter or remove the name as necessary.

### Logs

To continuously collect the latest logs, run:

`npm run logs`

### UI Editability

To make the deployment editable in the UI, use:

`npm run ui-active -- --sid ZS…`

## Motto

> 「Cryptoni Confidimus」

## License

This service is licensed under the [CORE License](LICENSE).
