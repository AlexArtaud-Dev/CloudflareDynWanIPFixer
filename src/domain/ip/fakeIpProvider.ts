let currentIp = "1.1.1.1";
export function getFakePublicIp(): Promise<string> {
			// Alternate IP to simulate changes
			currentIp = currentIp === "1.1.1.1" ? "2.2.2.2" : "1.1.1.1";
			return Promise.resolve(currentIp);
}
