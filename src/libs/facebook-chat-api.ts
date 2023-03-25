export const options = {
  forceLogin: true,
  logLevel: /^win/.test(process.platform) ? "verbose" : "warn",
  listenEvents: true,
  // selfListen: true,
  updatePresence: true,
  autoMarkDelivery: true,
  autoMarkRead: true,
};
