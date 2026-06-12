# Blobber Royale

Blobber Royale is a real-time two-player arena game controlled by voice commands. Players shout directions to move their blob and knock the other player out of the arena. Keyboard controls remain available for local testing.

## Stack

Node.js, Express, Handlebars, Socket.IO, Phaser, Sequelize, MySQL, and speech-recognition integrations.

## Local Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Create the configured MySQL database.
4. If testing Google Cloud Speech, create a new service-account key at `credentials/service-account.json`.
5. Run `npm start`.

Database passwords, `.env`, and cloud credential files are ignored by Git. Production can use `JAWSDB_URL` for its Sequelize connection.

## Notes

The prototype supports two players and a single game instance. Voice recognition latency and accuracy depend on the speech provider and microphone setup.

## Security

Never commit speech-provider credentials. Revoke any cloud key previously exposed in repository history before creating a replacement.
