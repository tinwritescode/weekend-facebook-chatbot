import fs from 'fs/promises'

export const readJsonFile = (path: string) => {
	return fs.readFile(path, 'utf8').then(JSON.parse);
}

// convert cookie to appstate
export const convertCookieToAppState = async (cookieContent: {
	cookies: any[]
}) => {
	const cookie = cookieContent?.cookies;
	if (!cookie) {
		throw new Error('cookie is not found');
	}

	// replace all "name" with "key"
	cookie.forEach((item: any) => {
		item.key = item.name;
		delete item.name;
	});

	return cookie;
}