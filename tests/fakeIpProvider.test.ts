import { getFakePublicIp } from "../src/domain/ip/fakeIpProvider";

describe("Fake IP Provider", () => {
			it("should alternate IP addresses", async () => {
						const ip1 = await getFakePublicIp();
						expect(ip1).toBe("2.2.2.2");

						const ip2 = await getFakePublicIp();
						expect(ip2).toBe("1.1.1.1");
						expect(ip2).not.toBe(ip1);
			});
});
