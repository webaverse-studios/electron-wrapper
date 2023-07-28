export const ipcMain = {
	on: (channel: string, listener: (event: any, ...args: any[]) => void) => {
		window.addEventListener(channel, (event: any) => {
			listener(event, event.data);
		});
	},
	handle: (
		channel: string,
		listener: (event: any, ...args: any[]) => void
	): void => {
		window.addEventListener(channel, (event: any) => {
			listener(event, event.data);
		});
	},
	callRenderer: (window: any, channel: string, ...args: any[]) => {
		const event = new CustomEvent(channel, {
			detail: args,
		});

		window.dispatchEvent(event);
	},
};
