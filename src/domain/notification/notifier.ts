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
									subject: "🌐 WAN IP Change Detected 🌐",
									html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h1 style="color: #007BFF;">🌟 Cloudflare Dynamic WAN IP Fixer 🌟</h1>
          <p>Your WAN IP has changed!</p>
          <div style="margin: 20px 0; padding: 10px; background-color: #F0F8FF; border-radius: 10px;">
            <strong>New WAN IP:</strong> 
            <span style="font-size: 1.2em; color: #007BFF;">${ip}</span>
          </div>
          <p>This change has been updated in your Cloudflare DNS settings.</p>
          <hr />
          <p style="font-size: 0.9em; color: #555;">This is an automated message from your Cloudflare Dynamic WAN IP Fixer.</p>
        </div>
      `,
						};

						await transporter.sendMail(mailOptions);
						Logger.info(`Email notification sent for IP change: ${ip}`);
			} catch (error: any) {
						Logger.error(`Failed to send email notification: ${error.message}`);
			}
}
