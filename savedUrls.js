function showSavedUrls() {
    // Retrieve saved URLs from storage and display them
    chrome.storage.sync.get({ savedUrls: [] }, function (data) {
      var savedUrls = data.savedUrls;
      updateSavedUrlsList(savedUrls);
    });
  }
  
  function updateSavedUrlsList(savedUrls) {
    var savedUrlsList = document.getElementById('savedUrlsList');
    savedUrlsList.innerHTML = ''; 
  
    if (savedUrls.length === 0) {
      savedUrlsList.innerHTML = '<p>No saved URLs.</p>';
    } else {
      savedUrls.forEach(function (url) {
        var listItem = document.createElement('li');
        var hyperlink = document.createElement('a');
        hyperlink.textContent = url;
        hyperlink.href = url;
        hyperlink.target = '_blank'; 
  
        listItem.appendChild(hyperlink);
        savedUrlsList.appendChild(listItem);
      });
    }
  }
  