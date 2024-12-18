import dotenv from "dotenv";

dotenv.config();

interface Config {
			intervalSeconds: number;
			cloudflareApiToken: string;
			cloudflareZoneId: string;
			cloudflareRecordId: string;
			cloudflareRecordName: string;
			fakeMode: boolean;
			emailHost: string;
			emailPort: number;
			emailSecure: boolean;
			emailUser: string;
			emailPass: string;
			emailTo: string;
}

const config: Config = {
			intervalSeconds: parseInt(process.env.INTERVAL_SECONDS || "300", 10),
			cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN || "",
			cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID || "",
			cloudflareRecordId: process.env.CLOUDFLARE_RECORD_ID || "",
			cloudflareRecordName: process.env.CLOUDFLARE_RECORD_NAME || "",
			fakeMode: (process.env.FAKE_MODE === "true"),
			emailHost: process.env.EMAIL_HOST || "smtp.gmail.com",
			emailPort: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 465,
			emailSecure: process.env.EMAIL_SECURE === "true",
			emailUser: process.env.EMAIL_USER || "",
			emailPass: process.env.EMAIL_PASS || "",
			emailTo: process.env.EMAIL_TO || "",
};

export default config;
