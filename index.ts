import fs from 'fs/promises'
const login = require("facebook-chat-api");
import dotenv from 'dotenv'
import {
	convertCookieToAppState, readJsonFile
} from './utils'

dotenv.config();


(async function() {
	const cookieFileContent = await readJsonFile('cookie.json');
	const appState = await convertCookieToAppState(cookieFileContent);

	await login({ appState }, (err, api) => {
		if (err) return console.error(err);

		api.sendMessage('Hello', 'npmrunstart');
	});

})();