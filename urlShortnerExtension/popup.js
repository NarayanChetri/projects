document.addEventListener('DOMContentLoaded', function () {
  var shortenButton = document.getElementById('shortenButton');
  var urlInput = document.getElementById('urlInput');
  var shortenedUrl = document.getElementById('shortenedUrl');
  var copyButton = document.getElementById('copyButton');
  var toastMessage = document.getElementById('toastMessage'); // Add this line

  shortenButton.addEventListener('click', function () {
    var apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    var accessToken = '6e9114ddfb59d92cd6ba1adc17338dc49345d138'; // Replace with your Bitly access token

    var longUrl = urlInput.value;

    if (longUrl !== '') {
      // Send a POST request to Bitly API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ long_url: longUrl }),
      })
        .then(response => response.json())
        .then(data => {
          // Display the shortened URL
          shortenedUrl.textContent = 'Shortened URL: ' + data.id;

          // Enable the copy button
          copyButton.disabled = false;

          // Set the shortened URL as a data attribute for the copy button
          copyButton.setAttribute('data-clipboard-text', data.id);
        })
        .catch(error => {
          console.error('Error shortening URL:', error);
          shortenedUrl.textContent = 'Error shortening URL';
        });
    } else {
      shortenedUrl.textContent = 'Please enter a URL';
    }
  });

  // Add event listener for the copy button
  copyButton.addEventListener('click', function () {
    var clipboardText = copyButton.getAttribute('data-clipboard-text');

    // Copy the shortened URL to the clipboard
    var tempInput = document.createElement('input');
    tempInput.value = clipboardText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show the toast message
    toastMessage.textContent = 'URL copied to clipboard';
    toastMessage.classList.add('show');

    // Hide the toast after 3 seconds (adjust as needed)
    setTimeout(function () {
      toastMessage.classList.remove('show');
    }, 2000);
  });
});
