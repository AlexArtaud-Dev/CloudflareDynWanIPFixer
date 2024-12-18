import { getCloudflareRecordIp, updateCloudflareDns } from "../src/domain/dns/dnsUpdater";
import axios from "axios";
import config from "../src/config/config";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DNS Updater", () => {
			beforeAll(() => {
						config.cloudflareZoneId = "fakeZoneId";
						config.cloudflareRecordId = "fakeRecordId";
						config.cloudflareRecordName = "example.com";
						config.cloudflareApiToken = "fakeToken";
			});

			describe("getCloudflareRecordIp", () => {
						it("should return the current IP of the DNS record", async () => {
									mockedAxios.get.mockResolvedValueOnce({
												data: {
															success: true,
															result: {
																		type: "A",
																		name: "example.com",
																		content: "1.2.3.4",
																		ttl: 1,
																		proxied: false
															}
												}
									});

									const ip = await getCloudflareRecordIp();
									expect(ip).toBe("1.2.3.4");
						});

						it("should throw if Cloudflare returns an error", async () => {
									mockedAxios.get.mockResolvedValueOnce({ data: { success: false } });
									await expect(getCloudflareRecordIp()).rejects.toThrow("Cloudflare API returned an error when fetching current record");
						});

						it("should throw on network errors", async () => {
									mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));
									await expect(getCloudflareRecordIp()).rejects.toThrow("Network Error");
						});
			});

			describe("updateCloudflareDns", () => {
						it("should update DNS record successfully with automatic TTL", async () => {
									mockedAxios.put.mockResolvedValueOnce({ data: { success: true } });
									await expect(updateCloudflareDns("1.2.3.4")).resolves.not.toThrow();
									expect(mockedAxios.put).toHaveBeenCalledWith(
															"https://api.cloudflare.com/client/v4/zones/fakeZoneId/dns_records/fakeRecordId",
															{
																		type: "A",
																		name: "example.com",
																		content: "1.2.3.4",
																		ttl: 1,
																		proxied: false
															},
															{
																		headers: {
																					Authorization: "Bearer fakeToken",
																					"Content-Type": "application/json",
																		},
															}
									);
						});

						it("should throw on failure", async () => {
									mockedAxios.put.mockResolvedValueOnce({ data: { success: false } });
									await expect(updateCloudflareDns("1.2.3.4")).rejects.toThrow("Cloudflare API returned an error during update");
						});
			});
});
