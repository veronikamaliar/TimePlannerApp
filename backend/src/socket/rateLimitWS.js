const rateLimitWS = (limit = 10, windowMs = 1000) => {
  const clients = new Map(); 

  return (socket, next) => {
    const userId = socket.userId || socket.id; 
    const now = Date.now();

    if (!clients.has(userId)) {
      clients.set(userId, { count: 1, lastReset: now });
      return next();
    }

    const data = clients.get(userId);

    if (now - data.lastReset > windowMs) {
      data.count = 1;
      data.lastReset = now;
      clients.set(userId, data);
      return next();
    }

    if (data.count >= limit) {
      socket.emit('error', 'Rate limit exceeded');
      return;
    }

    data.count += 1;
    clients.set(userId, data);

    next();
  };
};

module.exports = rateLimitWS;