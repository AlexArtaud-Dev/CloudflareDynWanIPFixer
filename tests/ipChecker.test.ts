import { getPublicIp } from "../src/domain/ip/ipChecker";
import axios from "axios";
import config from "../src/config/config";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("IP Checker", () => {
			beforeAll(() => {
						// Ensure that fake mode is off so we actually hit the axios call
						config.fakeMode = false;
			});

			it("should return IP from ipify", async () => {
						mockedAxios.get.mockResolvedValueOnce({ data: { ip: "123.123.123.123" } });
						const ip = await getPublicIp();
						expect(ip).toBe("123.123.123.123");
			});

			it("should throw if ipify is unreachable", async () => {
						mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));
						await expect(getPublicIp()).rejects.toThrow("Network Error");
			});

			it("should handle missing ip field in response", async () => {
						mockedAxios.get.mockResolvedValueOnce({ data: {} });
						await expect(getPublicIp()).rejects.toThrow("No IP in response");
			});
});
