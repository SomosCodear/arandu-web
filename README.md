# Arandu Web [WIP]
This is the frontend for the application that manages events' CFPs

## Local setup
### 1. Node && dependencies

The project uses Node 12 or above, and you can either install it manually or use nvm as there's a .nvmrc file.

You can use either Yarn or NPM for the dependencies, but have in mind that we use Yarn, so if you are planning on changing dependencies, you'll probably want to use it too.

```bash
$ yarn
#OR npm i
```

### 2. API && ENV
The frontend depends on [arandu-api](https://github.com/SomosCodear/arandu-api) to work, so once you have the API set up, we need to hint the project to know were to point at to access it.

That can be do through the `API_URL` env variable, that can be set locally on your `.env` file, for example:
```
API_URL=http://localhost:8000
```

### 3. Running the app
Once the deps are installed and the API is up and configured, we can run the frontend by using:

```bash
$ yarn dev
#OR npm run dev
```

If the you seeded your database as indicated on the API setup instructions, you can see an example CFP form (and start editing it) by going to `http://localhost:3000/admin/cfp/encuentros-codear` on your browser.
