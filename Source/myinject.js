console.log("logging");
const originalSend = WebSocket.prototype.send;
window.sockets = [];
WebSocket.prototype.send = function(...args) {
  if (window.sockets.indexOf(this) === -1)
    window.sockets.push(this);
  return originalSend.call(this, ...args);
};
setTimeout(() => {
  // or create a button which, when clicked, does something with the sockets
  console.log(window.sockets);
}, 10000);