# Turn-based games

My attampt at creating some client and server apps for turn-based games to play with friends. Based on [ts-express-cra-starter](https://github.com/brentkeller/ts-express-cra-starter).

## Scripts

| Script                | Description                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------- |
| bs                    | Run `build` then `start`                                                                  |
| build                 | Clean build of client and server. Works on heroku by default                              |
| build:client          | Build client app                                                                          |
| build:server          | Build server app                                                                          |
| clean                 | Cleans the `/build` directory                                                             |
| clean:nodemod         | Cleans the `node_modules` folder for all workspaces, including root                       |
| clean:nodemod:project | Cleans the `node_modules` folder for the root folder                                      |
| clean:nodemod:client  | Cleans the `node_modules` folder for the client folder                                    |
| clean:nodemod:server  | Cleans the `node_modules` folder for the server folder                                    |
| copy:client           | Copies the built client to `/build`                                                       |
| copy:server           | Copies the built server to `/build`                                                       |
| dev                   | Runs client and server `dev` commands in parallel                                         |
| dev:client            | Runs `dev` command for client app                                                         |
| dev:server            | Runs `dev` command for server app                                                         |
| start                 | Starts the compiled server app from the `/build` directory. Runs app on heroku by default |
| test:client           | Runs client tests in watch mode                                                           |
| test:server           | Runs server tests in watch mode                                                           |
