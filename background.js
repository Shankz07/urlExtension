chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'saveUrl') {
      chrome.storage.sync.get({ savedUrls: [] }, function (data) {
        var savedUrls = data.savedUrls;
        savedUrls.push(request.url);
        chrome.storage.sync.set({ savedUrls: savedUrls });
        sendResponse({ success: true });
      });
  
      return true;
    }
  });
  