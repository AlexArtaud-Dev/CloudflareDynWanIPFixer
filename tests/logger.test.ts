import { Logger } from "../src/core/logger";

describe("Logger", () => {
			let originalConsoleDebug: typeof console.debug;
			let debugMock: jest.Mock;

			beforeAll(() => {
						originalConsoleDebug = console.debug;
						debugMock = jest.fn();
						console.debug = debugMock;
			});

			afterAll(() => {
						console.debug = originalConsoleDebug;
			});

			it("should log debug messages", () => {
						Logger.debug("Test debug message");
						expect(debugMock).toHaveBeenCalledWith(expect.stringContaining("Test debug message"));
			});
});
