export const contextBridge = {
	exposeInMainWorld: (apiKey, api) => {
		return ((window)[apiKey] = api);
	},
};
