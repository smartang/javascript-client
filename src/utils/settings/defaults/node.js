'use strict';

module.exports = {
  startup: {
    // stress the request time used while starting up the SDK.
    requestTimeoutBeforeReady: 15,
    // how many quick retries we will do while starting up the SDK.
    retriesOnFailureBeforeReady: 0,
    // maximun amount of time used before notifies me a timeout.
    readyTimeout: 0
  }
};
