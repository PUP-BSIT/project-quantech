<script>
        document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.getElementById('searchInput');
            const table = document.getElementById('trackingTable');
            const rows = table.getElementsByTagName('tr');
            const currentPageUrl = window.location.href;

            const navigationLinks = document.querySelectorAll('.footer-navigation .navigation-button');

            // Iterate through the links and add the "active" class to the matching link
            navigationLinks.forEach(link => {
                if (link.href === currentPageUrl) {
                    link.classList.add('active');
                }
            });
            // Add an input event listener to filter rows based on the search input
            searchInput.addEventListener('input', function () {
                const inputValue = searchInput.value.toUpperCase();

                // Loop through all table rows, and hide those that don't match the search query
                for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
                    const cells = rows[i].getElementsByTagName('td');
                    let shouldHide = true;

                    for (let j = 0; j < cells.length; j++) {
                        const cellText = cells[j].textContent || cells[j].innerText;
                        if (cellText.toUpperCase().indexOf(inputValue) > -1) {
                            shouldHide = false;
                            break;
                        }
                    }

                    if (shouldHide) {
                        rows[i].style.display = 'none';
                    } else {
                        rows[i].style.display = '';
                    }
                }
            
            });
        });

        // Function to fetch and display weather using OpenWeatherMap API based on latitude and longitude
        function fetchWeather() {
            const weatherWidgetContainer = document.getElementById('weatherWidget');
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=<?php echo $latitude; ?>&lon=<?php echo $longitude; ?>&appid=<?php echo $apiKey; ?>&units=metric`;

            // Make a request to OpenWeatherMap API to get weather data
            fetch(apiUrl)
                .then(response => response.json())
                .then(weatherData => displayWeather(weatherData))
                .catch(error => console.error('Error fetching weather:', error));

            // Function to display weather data on the page
            function displayWeather(weatherData) {
                const temperature = weatherData.main.temp;
                const description = weatherData.weather[0].description;

                // Modified the weatherHtml to include the cloud icon
                const weatherHtml = `<div class="temperature-container">
                                        <img class="cloud-icon" src="upload/cloud.png" alt="Cloud Icon">
                                        <p class="temperature">${temperature} °C</p>
                                     </div>
                                     <p class="description">${description}</p>`;

                weatherWidgetContainer.innerHTML += weatherHtml;
            }
        }

        // Call fetchWeather() function when the page loads
        fetchWeather();

        function showMoreRows() {
            const tableBody = document.getElementById('trackingBody');
            const trackingData = [
                ['John Doe', '123 Main St, Cityville', 'Pending'],
                ['Jane Smith', '456 Oak St, Townsville', 'Completed'],
                ['Rose Fernandez', 'Lower Bicutan, Taguig City', 'Completed'],
                ['Nicole Alcid', 'Ususan, Taguig City', 'Pending'],
                ['Kaila Marie Alima', 'Betterliving, Parañaque City', 'Completed'],
                ['Simounne Cruz', 'Signal, Taguig City', 'Pending'],
            ];

            const rowLimit = 5;
            const startIndex = tableBody.children.length - 1;
            const endIndex = startIndex + rowLimit;

            for (let index = startIndex; index < Math.min(endIndex, trackingData.length); index++) {
                const rowClass = (index === 0) ? 'light-blue' : '';
                const newRow = document.createElement('tr');
                newRow.className = rowClass;

                trackingData[index].forEach((value, colIndex) => {
                    if (colIndex === 2) {
                        const cell = document.createElement('td');
                        cell.className = 'status-cell';
                        cell.innerHTML = value + '<button class="details-button">View Details</button>';
                        newRow.appendChild(cell);
                    } else {
                        const cell = document.createElement('td');
                        cell.innerHTML = value;
                        newRow.appendChild(cell);
                    }
                });

                tableBody.appendChild(newRow);
            }

            if (endIndex >= trackingData.length) {
                document.querySelector('.view-more-button').style.display = 'none';
                document.querySelector('.view-less-button').style.display = 'block';
            }
        }

        function showLessRows() {
            const tableBody = document.getElementById('trackingBody');
            const rowLimit = 5;
            const trackingData = [
                ['John Doe', '123 Main St, Cityville', 'Pending'],
                ['Jane Smith', '456 Oak St, Townsville', 'Completed'],
                ['Rose Fernandez', 'Lower Bicutan, Taguig City', 'Completed'],
                ['Nicole Alcid', 'Ususan, Taguig City', 'Pending'],
                ['Kaila Marie Alima', 'Betterliving, Parañaque City', 'Completed'],
                ['Simounne Cruz', 'Signal, Taguig City', 'Pending'],
            ];

            // Remove rows added by showMoreRows()
            for (let index = trackingData.length; index >= rowLimit; index--) {
                tableBody.removeChild(tableBody.lastChild);
            }

            document.querySelector('.view-more-button').style.display = 'block';
            document.querySelector('.view-less-button').style.display = 'none';
        }
    </script>
