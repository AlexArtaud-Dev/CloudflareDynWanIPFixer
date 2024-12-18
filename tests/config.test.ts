describe("Config", () => {
			let originalEnv: NodeJS.ProcessEnv;

			beforeAll(() => {
						originalEnv = { ...process.env };
			});

			afterAll(() => {
						process.env = originalEnv;
			});

			it("should load defaults when no environment variables are set", async () => {
						delete process.env.INTERVAL_SECONDS;
						delete process.env.CLOUDFLARE_API_TOKEN;
						delete process.env.CLOUDFLARE_ZONE_ID;
						delete process.env.CLOUDFLARE_RECORD_ID;
						delete process.env.CLOUDFLARE_RECORD_NAME;
						delete process.env.FAKE_MODE;
						delete process.env.EMAIL_HOST;
						delete process.env.EMAIL_PORT;
						delete process.env.EMAIL_SECURE;
						delete process.env.EMAIL_USER;
						delete process.env.EMAIL_PASS;
						delete process.env.EMAIL_TO;

						jest.resetModules();

						await jest.isolateModules(async () => {
									const config = (await import("../src/config/config")).default;
									expect(config.intervalSeconds).toBe(300);
									expect(config.fakeMode).toBe(false);
						});
			});

			it("should respect environment variables", async () => {
						process.env.INTERVAL_SECONDS = "600";
						process.env.FAKE_MODE = "true";
						jest.resetModules();

						await jest.isolateModules(async () => {
									const config = (await import("../src/config/config")).default;
									expect(config.intervalSeconds).toBe(600);
									expect(config.fakeMode).toBe(true);
						});
			});
			it("should handle EMAIL_PORT and EMAIL_SECURE environment variables", async () => {
						process.env.EMAIL_PORT = "587";
						process.env.EMAIL_SECURE = "false";
						jest.resetModules();

						await jest.isolateModules(async () => {
									const config = (await import("../src/config/config")).default;
									expect(config.emailPort).toBe(587);
									expect(config.emailSecure).toBe(false);
						});
			});
});
