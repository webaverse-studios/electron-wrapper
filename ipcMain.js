import { callAnswer } from "./ipcRenderer";

let on = {};
let once = {};
let handle = {};

export const ipcMain = {
	on: (channel, callback) => {
		if (!on[channel]) on[channel] = [];
		on[channel].push(callback);		
	},
	handle: (channel, callback) => {
		if (!handle[channel]) handle[channel] = [];
		handle[channel].push(callback);
	},
	once: (channel, callback) => {
		if (!once[channel]) once[channel] = [];
		once[channel].push(callback);		
	},
	callRenderer: async (_window, channel, data) => {
		await callAnswer(channel, data)
	}
};

export function emit(channel, args) {
	if (on[channel]) {
		for (const cb of on[channel]) {
			cb(null, ...args);
		}
	}
	if (once[channel]) {
		for (const cb of once[channel]) {
			cb(null, ...args);
		}
		delete once[channel]
	};
}

export function emitSync(channel, args) {
	if (!on[channel]) return null;
	for (const cb of on[channel]) {
		return cb(null, ...args);
	}
}

export async function invoke(channel, args) {
	if (!handle[channel]) return null;
	for (const cb of handle[channel]) {
		return await cb(null, ...args);		
	}
}

