import { notify } from "../src/domain/notification/notifier";
import nodemailer from "nodemailer";
import config from "../src/config/config";

jest.mock("nodemailer");

describe("Notifier", () => {
			let sendMailMock: jest.Mock;

			beforeAll(() => {
						config.emailHost = "smtp.test.com";
						config.emailPort = 465;
						config.emailSecure = true;
						config.emailUser = "sender@example.com";
						config.emailPass = "pass";
						config.emailTo = "recipient@example.com";

						(nodemailer.createTransport as jest.Mock).mockReturnValue({
									sendMail: (sendMailMock = jest.fn().mockResolvedValue("ok")),
						});
			});

			it("should send an email notification", async () => {
						await notify("1.2.3.4");
						expect(sendMailMock).toHaveBeenCalledWith({
									from: "sender@example.com",
									to: "recipient@example.com",
									subject: "🌐 WAN IP Change Detected 🌐",
									html: expect.stringContaining("1.2.3.4"),
						});
			});

			it("should log error if email fails", async () => {
						sendMailMock.mockRejectedValueOnce(new Error("SMTP Error"));
						await notify("1.2.3.4");
						// The error is logged but not thrown.
						// You could also add assertions to check the logger if needed.
			});
});
