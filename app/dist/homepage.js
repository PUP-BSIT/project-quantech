document.addEventListener('DOMContentLoaded', function () {
    const trackingData = [
        ['John Doe', '123 Main St, Cityville', 'Pending'],
        ['Jane Smith', '456 Oak St, Townsville', 'Completed'],
        ['Rose Fernandez', 'Lower Bicutan, Taguig City', 'Completed'],
        ['Nicole Alcid', 'Ususan, Taguig City', 'Pending'],
        ['Kaila Marie Alima', 'Betterliving, Parañaque City', 'Completed'],
        ['Simounne Cruz', 'Signal, Taguig City', 'Pending'],
    ];

    const rowLimit = 5;
    const tableBody = document.getElementById('trackingBody');

    function populateTrackingData() {
        trackingData.slice(0, rowLimit).forEach((rowData, index) => {
            const rowClass = (index === 0) ? 'light-blue' : '';
            const newRow = createRow(rowData, rowClass);
            tableBody.appendChild(newRow);
        });

        if (trackingData.length > rowLimit) {
            document.querySelector('.view-more-button').style.display = 'block';
        }
    }

    function createRow(data, rowClass) {
        const newRow = document.createElement('tr');
        newRow.className = rowClass;

        data.forEach((value, colIndex) => {
            if (colIndex === 2) {
                const cell = document.createElement('td');
                cell.className = 'status-cell';
                cell.innerHTML = `${value}<button class="details-button">View Details</button>`;
                newRow.appendChild(cell);
            } else {
                const cell = document.createElement('td');
                cell.innerHTML = value;
                newRow.appendChild(cell);
            }
        });

        return newRow;
    }

    populateTrackingData();

    function showMoreRows() {
        const startIndex = tableBody.children.length;
        const endIndex = startIndex + rowLimit;

        for (let index = startIndex; index < endIndex && index < trackingData.length; index++) {
            const rowClass = (index === 0) ? 'light-blue' : '';
            const newRow = createRow(trackingData[index], rowClass);
            tableBody.appendChild(newRow);
        }

        if (endIndex >= trackingData.length) {
            document.querySelector('.view-more-button').style.display = 'none';
            document.querySelector('.view-less-button').style.display = 'block';
        }
    }

    function showLessRows() {
        const rowLimit = 5;

        // Remove rows added by showMoreRows()
        for (let index = trackingData.length; index >= rowLimit; index--) {
            tableBody.removeChild(tableBody.lastChild);
        }

        document.querySelector('.view-more-button').style.display = 'block';
        document.querySelector('.view-less-button').style.display = 'none';
    }

    document.querySelector('.view-more-button').addEventListener('click', showMoreRows);
    document.querySelector('.view-less-button').addEventListener('click', showLessRows);

    // OpenWeatherMap integration
    const weatherWidgetContainer = document.getElementById('weatherWidget');
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=14.5204&lon=121.0190&appid=b08f0dc18be515f55ecea4bc67c6abb5&units=metric';

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

        weatherWidgetContainer.innerHTML = weatherHtml;
    }
});
