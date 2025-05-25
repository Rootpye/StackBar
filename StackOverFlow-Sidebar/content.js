// Function to create or update the sidebar
function setupSidebar() {
  let sidebar = document.getElementById('stack-overflow-sidebar-ext');
  if (!sidebar) {
    sidebar = document.createElement('div');
    sidebar.id = 'stack-overflow-sidebar-ext';
    // Enhanced styling for the sidebar
    sidebar.style.position = 'fixed';
    sidebar.style.top = '70px'; // Adjusted top position
    sidebar.style.right = '15px'; // Adjusted right position
    sidebar.style.width = '320px'; // Slightly wider
    sidebar.style.maxHeight = 'calc(100vh - 90px)'; // Adjusted max height
    sidebar.style.backgroundColor = '#ffffff'; // Cleaner white background
    sidebar.style.border = '1px solid #e0e0e0'; // Softer border
    sidebar.style.borderRadius = '0 12px 12px 12px'; // More rounded corners
    sidebar.style.padding = '20px'; // Increased padding
    sidebar.style.boxSizing = 'border-box';
    sidebar.style.zIndex = '10000';
    sidebar.style.fontFamily = '"Segoe UI", Roboto, Arial, sans-serif'; // Modern font stack
    sidebar.style.fontSize = '14px';
    sidebar.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)'; // More pronounced shadow
    sidebar.style.color = '#333333'; // Default text color
    sidebar.style.transition = 'transform 0.3s ease-in-out'; // Add transition for smooth open/close
    sidebar.style.transform = 'translateX(0)'; // Initialize sidebar to be visible (open)

    document.body.appendChild(sidebar);
  }

  // Clear previous content and add title and internal close button
  sidebar.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eeeeee;">
      <div style="display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; color: #f48024;">
          <path d="M18 16.5V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12.5a2.5 2.5 0 0 0 2.5 2.5h11A2.5 2.5 0 0 0 18 16.5z"></path>
          <polyline points="14 2 14 8 8 8"></polyline>
          <line x1="12" y1="12" x2="6" y2="12"></line>
          <line x1="10" y1="16" x2="6" y2="16"></line>
        </svg>
        <h3 style="margin:0; font-size: 18px; font-weight: 600; color: #2d3748;">
          Stack Overflow Related Questions
        </h3>
      </div>
      <button id="sidebar-internal-close-button" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #777; padding: 0; line-height: 1; transition: color 0.2s ease-in-out;">
        &times;
      </button>
    </div>
    <ul id="stack-overflow-results-list-ext" style="list-style-type: none; padding: 0; margin: 0; overflow-y: auto; max-height: calc(100vh - 180px);"></ul>
    <p id="stack-overflow-status-ext" style="font-size: 13px; color: #555555; margin-top: 15px; text-align: center;"></p>
  `;

  // Add event listener for the internal close button
  const internalCloseButton = document.getElementById('sidebar-internal-close-button');
  if (internalCloseButton) {
    internalCloseButton.addEventListener('click', () => {
      sidebar.style.transform = 'translateX(100%)'; // Hide sidebar
      updateToggleButtonState(); // Update the external button state
    });
  }

  return sidebar;
}

// Function to create or update the external toggle button
function setupExternalToggleButton() {
  let toggleButton = document.getElementById('sidebar-external-toggle-button');
  const sidebar = document.getElementById('stack-overflow-sidebar-ext');

  if (!toggleButton) {
    toggleButton = document.createElement('button');
    toggleButton.id = 'sidebar-external-toggle-button';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '70px'; // Align with sidebar's top
    toggleButton.style.width = '30px'; // Small width for the button
    toggleButton.style.height = '320px'; // Height for the button
    toggleButton.style.backgroundColor = '#ffffff'; // White background
    toggleButton.style.color = '#777'; // Dark grey icon color
    toggleButton.style.border = '1px solid #e0e0e0'; // Subtle border
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '10001'; // Higher z-index than sidebar
    toggleButton.style.fontSize = '20px';
    toggleButton.style.display = 'flex';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.justifyContent = 'center';
    toggleButton.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; // Subtle shadow
    toggleButton.style.transition = 'right 0.3s ease-in-out, border-radius 0.3s ease-in-out, border-left 0.3s ease-in-out, border-right 0.3s ease-in-out'; // Smooth transition for position and border

    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
      if (sidebar.style.transform === 'translateX(100%)') {
        // Sidebar is hidden, open it (slide left)
        sidebar.style.transform = 'translateX(0)';
      } else {
        // Sidebar is visible, hide it (slide right)
        sidebar.style.transform = 'translateX(100%)';
      }
      updateToggleButtonState(); // Update the button's icon and position
    });
  }
  updateToggleButtonState(); // Set initial state
  return toggleButton;
}

// Function to update the external toggle button's icon and position based on sidebar state
function updateToggleButtonState() {
  const sidebar = document.getElementById('stack-overflow-sidebar-ext');
  const toggleButton = document.getElementById('sidebar-external-toggle-button');

  if (!sidebar || !toggleButton) return;

  const sidebarWidth = 320;
  const sidebarRightOffset = 15; // Sidebar's distance from the right edge of the viewport

  if (sidebar.style.transform === 'translateX(100%)') {
    // Sidebar is hidden (closed, translated 100% to the right)
    toggleButton.innerHTML = '&lt;'; // Show '<' to open (slide left)
    toggleButton.style.right = sidebarRightOffset + 'px'; // Button at the very right edge of the screen
    toggleButton.style.borderRadius = '12px 0 0 12px'; // Rounded on the left, flat on the right to match screen edge
    toggleButton.style.borderRight = '1px solid #e0e0e0'; // Add right border
    toggleButton.style.borderLeft = '1px solid #e0e0e0'; // Add left border
  } else {
    // Sidebar is visible (open, translated 0)
    toggleButton.innerHTML = '&gt;'; // Show '>' to close (slide right)
    // Position button to the left of the sidebar, precisely at its left edge
    toggleButton.style.right = (sidebarRightOffset + sidebarWidth) + 'px';
    toggleButton.style.borderRadius = '12px 0 0 12px'; // Rounded on the left, flat on the right (to stick to sidebar)
    toggleButton.style.borderRight = 'none'; // No right border, as it blends with sidebar
    toggleButton.style.borderLeft = '1px solid #e0e0e0'; // Keep left border
  }
}


// Function to display results in the sidebar
function displayResults(results) {
  const resultsList = document.getElementById('stack-overflow-results-list-ext');
  const statusElement = document.getElementById('stack-overflow-status-ext');

  if (!resultsList || !statusElement) {
    console.error("Sidebar elements not found for displaying results.");
    return;
  }
  resultsList.innerHTML = ''; // Clear previous results

  if (results && results.length > 0) {
    results.forEach(item => {
      const listItem = document.createElement('li');
      listItem.style.marginBottom = '12px';
      listItem.style.paddingBottom = '12px';
      listItem.style.borderBottom = '1px solid #f0f0f0'; // Lighter separator
      listItem.style.transition = 'background-color 0.2s ease-in-out'; // Hover effect
      listItem.style.borderRadius = '6px';
      listItem.style.padding = '8px';


      const link = document.createElement('a');
      link.href = item.link;
      link.innerHTML = decodeHtmlEntities(item.title); // Use innerHTML for decoded entities
      link.target = '_blank';
      link.style.textDecoration = 'none';
      link.style.color = '#007acc'; // Standard link blue
      link.style.fontWeight = '500';
      link.style.display = 'block'; // Make the whole area clickable
      link.style.wordBreak = 'break-word';


      listItem.addEventListener('mouseover', () => {
        listItem.style.backgroundColor = '#f0f8ff'; // Light blue hover
        link.style.color = '#005ea6'; // Darker blue on hover
      });
      listItem.addEventListener('mouseout', () => {
        listItem.style.backgroundColor = 'transparent';
        link.style.color = '#007acc';
      });

      listItem.appendChild(link);
      resultsList.appendChild(listItem);
    });
    statusElement.textContent = `💡 Found ${results.length} related questions.`;
    statusElement.style.color = '#28a745'; // Green for success
  } else {
    statusElement.textContent = '🤷‍♂️ No related Stack Overflow questions found.';
    statusElement.style.color = '#777777'; // Grey for not found
  }
}

// Utility function to decode HTML entities (like &quot;, &amp;, etc.)
function decodeHtmlEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Main execution
function main() {
  const sidebar = setupSidebar(); // Ensure sidebar is created or updated
  setupExternalToggleButton(); // Setup the external toggle button
  const statusElement = document.getElementById('stack-overflow-status-ext');

  // Extract search query from URL
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');

  if (query && statusElement) {
    statusElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px; animation: spin 1s linear infinite;">
          <path d="M12 2V6" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 18V22" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.93 4.93L7.76 7.76" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.24 16.24L19.07 19.07" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12H6" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 12H22" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.93 19.07L7.76 16.24" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.24 7.76L19.07 4.93" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Searching Stack Overflow...</span>
      </div>
      <style> @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } </style>
    `;
    statusElement.style.color = '#555555';

    // Send message to background script to fetch data
    chrome.runtime.sendMessage({ type: "fetchStackOverflow", query: query }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background:", chrome.runtime.lastError.message);
        if (statusElement) {
            statusElement.textContent = '⚠️ Error: Failed to connect to background script';
            statusElement.style.color = '#dc3545'; // Red for error
        }
        return;
      }

      if (response && response.success) {
        displayResults(response.data);
      } else if (response) {
        console.error("Failed to fetch Stack Overflow results:", response.error);
        if (statusElement) {
            statusElement.textContent = `⚠️ Error: ${response.error || 'Unknown API error'}`;
            statusElement.style.color = '#dc3545';
        }
      } else {
        console.error("No response or invalid response from background script.");
        if (statusElement) {
            statusElement.textContent = '⚠️ Error: No response from background';
            statusElement.style.color = '#dc3545';
        }
      }
    });
  } else if (statusElement) {
    statusElement.textContent = 'Could not find query to search.';
    statusElement.style.color = '#ffc107'; // Yellow for warning
  }
}

// Run the main function when the content script is loaded
main();

// Using MutationObserver to detect URL changes or title changes (often indicative of new search)
const observer = new MutationObserver((mutationsList, observer) => {
    const newQuery = new URLSearchParams(window.location.search).get('q');
    if (newQuery !== window.currentQueryForSOExt) {
        window.currentQueryForSOExt = newQuery;
        console.log("Search query changed, re-fetching Stack Overflow results.");
        main();
    }
});

window.currentQueryForSOExt = new URLSearchParams(window.location.search).get('q');

const titleElement = document.querySelector('title');
if (titleElement) {
    observer.observe(titleElement, { childList: true });
} else {
    console.warn("Stack Overflow Sidebar Extension: Could not find <title> element to observe for changes.");
}
