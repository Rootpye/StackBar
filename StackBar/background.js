// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "fetchStackOverflow") {
    const query = request.query;
    // Construct the Stack Exchange API URL
    // Fetches top 5 relevant results from Stack Overflow
    const apiUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=desc&sort=relevance&site=stackoverflow&q=${encodeURIComponent(query)}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.items && data.items.length > 0) {
          const results = data.items.map(item => ({
            title: item.title, // The title of the question
            link: item.link    // Direct link to the Stack Overflow question
          }));
          sendResponse({ success: true, data: results });
        } else {
          sendResponse({ success: true, data: [] }); // No items found
        }
      })
      .catch(error => {
        console.error("Error fetching from Stack Overflow API:", error);
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // Indicates that the response will be sent asynchronously
  }
});

// Log when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Stack Overflow Search Helper installed.");
  // You could set default storage values here if needed
  // chrome.storage.sync.set({ someDefaultSetting: true });
});
