import axios from "axios";
import config from "../../config/config";
import { getFakePublicIp } from "./fakeIpProvider";

export async function getPublicIp(): Promise<string> {
			if (config.fakeMode) {
						return getFakePublicIp();
			}
			const res = await axios.get("https://api.ipify.org?format=json", { timeout: 5000 });
			if (!res.data.ip) {
						throw new Error("No IP in response");
			}
			return res.data.ip;
}
