document.addEventListener('DOMContentLoaded', function () {
    var shortenButton = document.getElementById('shortenButton');
    var savedUrlsButton = document.getElementById('savedUrlsButton');
  
    shortenButton.addEventListener('click', function () {
      showSection('shortenSection');
      shortenUrlFromInput();
    });
  
    savedUrlsButton.addEventListener('click', function () {
      showSection('savedUrlsSection');
      showSavedUrls();
    });
  
    function showSection(sectionId) {
      var sections = ['shortenSection', 'savedUrlsSection'];
      sections.forEach(function (section) {
        var element = document.getElementById(section);
        if (section === sectionId) {
          element.classList.remove('hidden');
        } else {
          element.classList.add('hidden');
        }
      });
    }
  
    function shortenUrlFromInput() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentTab = tabs[0];
        var currentUrl = currentTab.url;
  
        shortenUrl(currentUrl, function (shortenedUrl) {
          displayShortenedUrl(shortenedUrl);
  
          
          saveUrl(shortenedUrl);
        });
      });
    }
  
    function shortenUrl(longUrl, callback) {
      var apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
  
      fetch(apiUrl)
        .then(response => response.text())
        .then(responseText => {
          callback(responseText.trim());
        })
        .catch(error => console.error('Error shortening URL:', error));
    }
  
    function displayShortenedUrl(shortenedUrl) {
      var shortenedUrlDisplay = document.getElementById('shortenedUrl');
      shortenedUrlDisplay.textContent = 'Shortened: ' + shortenedUrl;
    }
  
    function saveUrl(url) {
      chrome.runtime.sendMessage({ action: 'saveUrl', url: url });
    }
  });
  