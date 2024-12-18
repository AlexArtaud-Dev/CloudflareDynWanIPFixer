import { startScheduler } from "./services/scheduler";
import { Logger } from "./core/logger";

(async () => {
			Logger.info("Starting WAN IP watcher...");
			startScheduler();
})();
