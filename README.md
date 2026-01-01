# Pit Stop

This app allows you to take orders and manage them from a Telegram chat. There is currently a pricing system but it doesn't affect the ordering process in any ways and is not really implemented.

To set this up we I Bun, but I'm pretty sure you can easily make it work with npm or yarn as well. I'd also like to note that this was built in a very tight timeline (2 days) and the project is quite rough for now (barely any comments, a lot of AI code, lack of propper components, etc).

The project is only in French for now.

## Setting up

You need to setup a database in [Neon](https://neon.com/) and copy the connection string to your `.env` file.

You will also need to setup the other environment variables as described in `.env.example`.

If you want to deploy the fastest way is by forking the project and using [Vercel](https://vercel.com/) to deploy the project. Otherwise you can look for "Building" section at the bottom of the `README.md`.

Finally you need to send the schema to the database using this command:
```bash
bun run db:push
```
Note that the database has no data and it's your job to fill it in. There are already some pictures in the `/static` directory that I use for my personal use. But I still recommend forking and changing the pictures.

Cheers!

## Developing

```sh
# install dependencies
bun install

# start the server
bun run dev

# or start the server and open the app in a new browser tab
bun run dev --open
```

## Building

To create a production version of the app:

```sh
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy the app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Contribution
Don't hesitate to ask on my [Telegram](https://t.me/LolouTheFox) if you want to help. Or you can of course use GitHub issues and create PRs!
