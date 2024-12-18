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

describe("Integration", () => {
			beforeEach(() => {
						jest.resetAllMocks();
			});

			it("should update DNS and notify if IP differs", async () => {
						mockedGetPublicIp.mockResolvedValueOnce("1.1.1.1");
						mockedGetCloudflareRecordIp.mockResolvedValueOnce("2.2.2.2");

						await checkAndUpdateIp();

						expect(mockedUpdateCloudflareDns).toHaveBeenCalledWith("1.1.1.1");
						expect(mockedNotify).toHaveBeenCalledWith("1.1.1.1");
			});

			it("should do nothing if IP is the same", async () => {
						mockedGetPublicIp.mockResolvedValueOnce("1.1.1.1");
						mockedGetCloudflareRecordIp.mockResolvedValueOnce("1.1.1.1");

						await checkAndUpdateIp();

						expect(mockedUpdateCloudflareDns).not.toHaveBeenCalled();
						expect(mockedNotify).not.toHaveBeenCalled();
			});
});
