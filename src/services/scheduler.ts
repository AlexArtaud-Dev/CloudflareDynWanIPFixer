import { Logger } from "../core/logger";
import config from "../config/config";
import { getPublicIp } from "../domain/ip/ipChecker";
import { getCloudflareRecordIp, updateCloudflareDns } from "../domain/dns/dnsUpdater";
import { notify } from "../domain/notification/notifier";

export async function checkAndUpdateIp(): Promise<void> {
			try {
						Logger.info("Checking current public IP...");
						const currentWanIp = await getPublicIp();
						Logger.info(`Current WAN IP: ${currentWanIp}`);

						Logger.info("Fetching current Cloudflare DNS record IP...");
						const cloudflareIp = await getCloudflareRecordIp();
						Logger.info(`Cloudflare DNS Record IP: ${cloudflareIp}`);

						if (currentWanIp !== cloudflareIp) {
									Logger.info("WAN IP differs from Cloudflare DNS IP, updating DNS and sending notification...");
									await updateCloudflareDns(currentWanIp);
									await notify(currentWanIp);
						} else {
									Logger.info("WAN IP and Cloudflare DNS IP match, no action taken.");
						}
			} catch (error: any) {
						Logger.error(`Error during IP check cycle: ${error.message}`);
			}
}

export function startScheduler(): void {
			checkAndUpdateIp();
			setInterval(checkAndUpdateIp, config.intervalSeconds * 1000);
}
