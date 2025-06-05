document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');

    if (downloadButton) {
        // Optional: Add a console log to confirm the button was found
        console.log('Button found:', downloadButton);

        // Optional: Add an event listener for a custom action when clicked
        // For example, you could track clicks for analytics
        downloadButton.addEventListener('click', function(event) {
            console.log('Download button clicked!');
            // If you wanted to prevent the default link behavior and do something else,
            // you would use event.preventDefault(); here.
            // For simply opening the link, you don't need preventDefault().
        });
    } else {
        console.error('Download button with ID "downloadButton" not found.');
    }
});
