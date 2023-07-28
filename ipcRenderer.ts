export const ipcRenderer = {
	invoke: async (channel: string, ...args: any[]) => {
		return new Promise((resolve, reject) => {
			const responseChannel = `${channel}_response`;

			const responseHandler = (event: any) => {
				window.removeEventListener(responseChannel, responseHandler);
				const { error, response } = event.detail;
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			};

			window.addEventListener(responseChannel, responseHandler);

			const event = new CustomEvent(channel, {
				detail: args,
			});

			window.dispatchEvent(event);
		});
	},
	send: (channel: string, ...args: any[]) => {
		const event = new CustomEvent(channel, {
			detail: args,
		});
		window.dispatchEvent(event);
	},
	sendSync: (channel: string, ...args: any[]) => {
		const event = new CustomEvent(channel, {
			detail: args,
		});

		window.dispatchEvent(event);
	},
	on: (channel: string, listener: (event: any, ...args: any[]) => void) => {
		window.addEventListener(channel, (event: any) => {
			listener(event, event.data);
		});
	},
	answerMain: (
		channel: string,
		listener: (event: any, ...args: any[]) => void
	) => {
		window.addEventListener(channel, (event: any) => {
			listener(event, event.data);
		});
	},
};
