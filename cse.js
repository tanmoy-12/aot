    document.addEventListener('DOMContentLoaded', function() {
        // Fetch news data from the JSON file
        fetch('cse/news.json')
            .then(response => response.json())
            .then(newsData => {
                // Get the container element where news items will be added
                const newsContainer = document.querySelector('.cs-news-data');

                // Function to get random news items
                function getRandomNewsItems(count) {
                    const shuffledNews = newsData.sort(() => 0.5 - Math.random()); // Shuffle the news array
                    return shuffledNews.slice(0, count); // Get the first 'count' items
                }

                // Add 15 random news items to the HTML
                const randomNewsItems = getRandomNewsItems(15);
                randomNewsItems.forEach(news => {
                    // Create a new div for each news item
                    const newsDiv = document.createElement('div');
                    newsDiv.classList.add('cs-news');

                    // Format the date (if needed)
                    const formattedDate = new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

                    // Populate the news div with title, date, and content
                    newsDiv.innerHTML = `
                        <i class="fa-solid fa-newspaper"></i>
                        <p><strong>${news.title}</strong><br>Date: ${formattedDate}<br>${news.content}</p>
                    `;

                    // Append the news div to the container
                    newsContainer.appendChild(newsDiv);
                });
            })
            .catch(error => console.error('Error fetching news data:', error));
    });
