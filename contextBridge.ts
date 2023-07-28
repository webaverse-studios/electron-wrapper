interface Window {
	[key: string]: any;
}

export const contextBridge = {
	exposeInMainWorld: (apiKey: string, api: any) => {
		return ((window as Window)[apiKey] = api);
	},
};
