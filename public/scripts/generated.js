const texts = ["Finding best parts...", "Checking compatibility...", "Calculating performance...", "Testing quality...", "One moment", "Almost there..."];
        const loadingText = document.querySelector('.loading-text');
        let textIndex = 0;

        function changeText() {
            // Fade out the text
            loadingText.classList.remove('text-visible');

            // After a short delay to allow the fade out, change the text and fade it back in
            setTimeout(() => {
                loadingText.textContent = texts[textIndex++ % texts.length];
                loadingText.classList.add('text-visible');
            }, 1000); // This should match the duration of the CSS transition
        }

        changeText();

        setInterval(changeText, 4000);

        function showNotification(message) {
            const notificationDiv = document.getElementById('notification');
            const notificationMessage = document.getElementById('notification-message');
            notificationMessage.textContent = message;
            notificationDiv.style.display = 'block';

            // Hide the notification after 4 seconds
            setTimeout(() => {
                notificationDiv.style.display = 'none';
            }, 4000);
        }
