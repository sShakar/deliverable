const TOKEN_KEY = 'shakar7859xd';

/**
 * @description get token form sessionStorage
 */
function getToken(): string | null {
	return sessionStorage.getItem(TOKEN_KEY);
}

/**
 * @description save token into sessionStorage
 * @param token
 */
function saveToken(token: string): void {
	sessionStorage.setItem(TOKEN_KEY, token);
}

/**
 * @description remove token form sessionStorage
 */
function destroyToken(): void {
	sessionStorage.removeItem(TOKEN_KEY);
}

/**
 * @description clear local and session storage
 */
function clear(): void {
	localStorage.clear();
	sessionStorage.clear();
}

export default {
	getToken,
	saveToken,
	destroyToken,
	clear
};
