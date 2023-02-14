# 2023 EyeClick Test: Online Shop Frontend
- Code Base: NextJS Typescript
- Environment: Node 16

## Setting Up
- Run `npm install` in command prompt
- If you're using a diffent port or hostname than `localhost:4000` for the API you will have to change the `destination` url to match you API localhost url properties for the proxy in `next.config.js`
- Run `npm run dev` to start the project
## Functions
- User registration
- Authencation via RestAPI
- Show and search item list with pagination
- A shopping cart utilize the localStorage to save data.
## Important Folders and Files
- `pages`: contains the `.tsx` files that will display pages of the website.
- `components`: contains the component `.tsx` will be used as component by pages files
- `store`: contains config, store, reducer with next-redux that will provide persist states through out the website.
- `styles`: contains css file for styling and theme file for MUI theme
- `utility`: contains file that will provide methods and config for other files through out the project like API setting and requesting, config emotion cache.
- `pages/_document.tsx`: this is the file that will be use to render the DOM by Next, all of the changes and config for DOM will be done here.
- `pages/_app.tsx`: this file will init the config and element for ReactJS firstime.
- `pages/index.tsx`: contains the function and html of the index page.

[Here is a small video to demonstrate the website in local machine](https://www.loom.com/share/bd5a59715f2b470caa3e2a9a5e8f7fb7)
