import {emit, emitSync, invoke} from './ipcMain.js'

let on = {};
let once = {};
let answer = {};

export const ipcRenderer = {
	invoke: async (channel, ...args) => {
		return await invoke(channel, args);
	},
	send: (channel, ...args) => {
		emit(channel, args);
	},
	sendSync: (channel, ...args) => {
		return emitSync(channel, args);
	},
	on: (channel, callback) => {
		if (!on[channel]) on[channel] = [];
		on[channel].push(callback);
	},
	once: (channel, callback) => {
		if (!once[channel]) once[channel] = [];
		once[channel].push(callback);
	},
	answerMain: (channel, cb) => {
		answer[channel] = cb;		
	},
	removeAllListeners: (channel) => {
		delete on[channel];
		delete once[channel];
	}
};

export async function callAnswer(channel, data) {
	if (!answer[channel]) return null;
	return await answer[channel](data);
}

window.webContents = {};
window.webContents.send = (channel, args) => {
	if (on[channel]) {
		for (const cb of on[channel]) {
			cb(null, args)
		}
	}
	if (once[channel]) {
		for (const cb of once[channel]) {
			cb(null, args)
		}
		delete once[channel];
	}
}