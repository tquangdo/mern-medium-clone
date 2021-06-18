# mern-medium-clone 🚀

[![Report an issue](https://img.shields.io/badge/Support-Issues-green)](https://github.com/tquangdo/mern-medium-clone/issues/new)
***********
![structure](screenshot/structure.png)

## deploy local
### BE
1. `$npm i`
### FE
1. `cd react-ui`
2. `$npm i`
3. `$npm run dev`
>if NOT run at `react-ui $`, there will have error because can NOT read  `react-ui/.env` 
4. access "localhost:3000"
>"localhost:5000" is for BE server

## heroku
![Heroku](https://heroku-badge.herokuapp.com/?app=mern-medium-clone-dotq)
### install
- `npm i -g heroku`
### dashboard on website
![heroku](screenshot/heroku.png)
***********
### setting
https://github.com/tquangdo/node-zoom-clone-app/blob/master/memo.txt
#### check buildpacks
- `heroku buildpacks -a mern-medium-clone-dotq`
- -> `heroku/nodejs`
![buildpacks](screenshot/buildpacks.png)
#### config vars
1. `ATLAS_URI`: https://github.com/tquangdo/mern-medium-clone/blob/master/server/index.js#L13
2. `REACT_APP_DOMAINNAME`: https://github.com/tquangdo/mern-medium-clone/blob/master/react-ui/src/constants/ConfigConst.js#L1

## atlas
- file: https://github.com/tquangdo/mern-medium-clone/blob/master/react-ui/.env
- dbname: `medium`
![db](screenshot/db.png)
- username: `mean123`
![user_pw](screenshot/user_pw.png)
- Network Access: NW Access > IP Whitelist > Add IP address > Whitelist Entry: "0.0.0.0/0"
![nw_access](screenshot/nw_access.png)
- Cluster connect: Clusters > Cluster0: Overview > Connect > Connect your application > Driver="Node.js" & Version="2.2.12 OR LATER"!!!
![cluster_cnt](screenshot/cluster_cnt.png)

## GG_CLIENT_ID
* file: https://github.com/tquangdo/mern-medium-clone/blob/master/react-ui/src/constants/ConfigConst.js#L2
>tra GG: "npm react-google-login"
* "console.developers.google.com/apis/credentials" -> project: `netflix-clone-app` -> create "OAuth 2.0 Client IDs" -> edit "Authorised JavaScript origins"
 -> Add URI: "http://localhost:3000" & "http://localhost:5000"
![gg_client_id](screenshot/gg_client_id.png)
***********
* with PROD (Heroku): add OAuth consent screen
![oauth_consent](screenshot/oauth_consent.png)

## api
https://github.com/tquangdo/mern-medium-clone/blob/master/server/assets/cmd/cmd.bat
![api](screenshot/api.png)

## note
* `cloudinary`: upload image như busboy
* file: "https://github.com/tquangdo/mern-medium-clone/blob/master/server/index.js"

## scribe doc generator
https://scribe-js.readthedocs.io/

### 1) install
```shell
cd server
server$ npm i @knuckleswtf/scribe-express
```
- => create `server/.scribe.config.js`

### 2) setting
1. `server/.scribe.config.js`: postman & openapi: `enabled: true`
2. `server/index.js`: change to `const url = 'mongodb...'`

### 3) generate
```shell
cd server
server$ npx scribe generate -a index
```

### 4) result
1. access browser `file:///Users/NC00011462/Documents/GitHub/mern-medium-clone/server/public/docs/index.html#endpoints`
![result1](screenshot/result1.png)
2. click `View Postman collection`
![result2](screenshot/result2.png)

