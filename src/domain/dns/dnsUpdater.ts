import axios from "axios";
import config from "../../config/config";
import { Logger } from "../../core/logger";

interface CloudflareDNSRecord {
			type: string;
			name: string;
			content: string;
			ttl: number;
			proxied: boolean;
}

export async function getCloudflareRecordIp(): Promise<string> {
			const url = `https://api.cloudflare.com/client/v4/zones/${config.cloudflareZoneId}/dns_records/${config.cloudflareRecordId}`;

			try {
						const response = await axios.get(url, {
									headers: {
												"Authorization": `Bearer ${config.cloudflareApiToken}`,
												"Content-Type": "application/json",
									},
						});

						if (!response.data.success) {
									throw new Error("Cloudflare API returned an error when fetching current record");
						}

						const record: CloudflareDNSRecord = response.data.result;
						return record.content;
			} catch (error: any) {
						Logger.error(`Failed to fetch Cloudflare record IP: ${error.message}`);
						throw error;
			}
}

export async function updateCloudflareDns(ip: string): Promise<void> {
			const url = `https://api.cloudflare.com/client/v4/zones/${config.cloudflareZoneId}/dns_records/${config.cloudflareRecordId}`;

			const record: Partial<CloudflareDNSRecord> = {
						type: "A",
						name: config.cloudflareRecordName,
						content: ip,
						ttl: 1, // Automatic TTL
						proxied: false,
			};

			try {
						const response = await axios.put(url, record, {
									headers: {
												"Authorization": `Bearer ${config.cloudflareApiToken}`,
												"Content-Type": "application/json",
									},
						});
						if (!response.data.success) {
									throw new Error("Cloudflare API returned an error during update");
						}
						Logger.info(`DNS updated successfully to ${ip} with TTL set to automatic.`);
			} catch (error: any) {
						Logger.error(`Failed to update DNS: ${error.message}`);
						throw error;
			}
}
