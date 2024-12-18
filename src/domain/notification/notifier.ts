import nodemailer from "nodemailer";
import config from "../../config/config";
import { Logger } from "../../core/logger";

export async function notify(ip: string): Promise<void> {
			try {
						const transporter = nodemailer.createTransport({
									host: config.emailHost,
									port: config.emailPort,
									secure: config.emailSecure,
									auth: {
												user: config.emailUser,
												pass: config.emailPass,
									},
						});

						const mailOptions = {
									from: config.emailUser,
									to: config.emailTo,
									subject: "WAN IP Changed",
									text: `Your WAN IP has changed to: ${ip}`
						};

						await transporter.sendMail(mailOptions);
						Logger.info(`Email notification sent for IP change: ${ip}`);
			} catch (error: any) {
						Logger.error(`Failed to send email notification: ${error.message}`);
			}
}
