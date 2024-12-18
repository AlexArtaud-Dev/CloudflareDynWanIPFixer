import { checkAndUpdateIp } from "../src/services/scheduler";
import * as ipChecker from "../src/domain/ip/ipChecker";
import * as dnsUpdater from "../src/domain/dns/dnsUpdater";
import * as notifier from "../src/domain/notification/notifier";

jest.mock("../src/domain/ip/ipChecker");
jest.mock("../src/domain/dns/dnsUpdater");
jest.mock("../src/domain/notification/notifier");

const mockedGetPublicIp = ipChecker.getPublicIp as jest.MockedFunction<typeof ipChecker.getPublicIp>;
const mockedGetCloudflareRecordIp = dnsUpdater.getCloudflareRecordIp as jest.MockedFunction<typeof dnsUpdater.getCloudflareRecordIp>;
const mockedUpdateCloudflareDns = dnsUpdater.updateCloudflareDns as jest.MockedFunction<typeof dnsUpdater.updateCloudflareDns>;
const mockedNotify = notifier.notify as jest.MockedFunction<typeof notifier.notify>;

describe("Scheduler additional error handling tests", () => {
			beforeEach(() => {
						jest.resetAllMocks();
						mockedGetPublicIp.mockResolvedValue("1.1.1.1");
						mockedGetCloudflareRecordIp.mockResolvedValue("2.2.2.2");
			});

			it("should handle errors from updateCloudflareDns", async () => {
						mockedUpdateCloudflareDns.mockRejectedValueOnce(new Error("Update DNS Error"));
						await expect(checkAndUpdateIp()).resolves.toBeUndefined();
						// This ensures the catch block with lines 30-31 is exercised.
			});

			it("should handle errors from notify", async () => {
						// Force IP change so updateCloudflareDns runs successfully first
						mockedGetCloudflareRecordIp.mockResolvedValueOnce("9.9.9.9");
						mockedUpdateCloudflareDns.mockResolvedValueOnce();
						mockedNotify.mockRejectedValueOnce(new Error("Notify Error"));
						await expect(checkAndUpdateIp()).resolves.toBeUndefined();
						// This also ensures the catch block is hit.
			});
});
