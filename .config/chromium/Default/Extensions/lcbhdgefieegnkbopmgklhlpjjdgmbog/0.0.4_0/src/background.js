const SOURCES = ['screen', 'window', 'audio'];

const Commands = {
  SCREENSHARE: 'SCREENSHARE',
};

const Errors = {
  UNKNOWN_COMMAND: 0,
};

const ResponseTypes = {
  SCREENSHARE_START_SUCCESS: 'SCREENSHARE_START_SUCCESS',
  SCREENSHARE_START_CANCEL: 'SCREENSHARE_START_CANCEL',
  UNKNOWN_COMMAND: 'UNKNOWN_COMMAND',
};

function handleScreenshare(request, sender, sendResponse) {
  chrome.desktopCapture.chooseDesktopMedia(SOURCES, sender.tab, (streamId, options) => {
    if (streamId.length === 0) {
      sendResponse({type: ResponseTypes.SCREENSHARE_START_CANCEL});
    } else {
      sendResponse({type: ResponseTypes.SCREENSHARE_START_SUCCESS, streamId, options});
    }
  });
  return true;
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case Commands.SCREENSHARE:
      return handleScreenshare(request, sender, sendResponse);
    default:
      sendResponse({type: ResponseTypes.UNKNOWN_COMMAND, error: Errors.UNKNOWN_COMMAND});
      return false;
  }
});
