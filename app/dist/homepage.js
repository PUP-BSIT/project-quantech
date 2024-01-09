document.addEventListener('DOMContentLoaded', function () {
    
    const trackingData = [
        ['John Doe', '123 Main St, Cityville', 'Pending'],
        ['Jane Smith', '456 Oak St, Townsville', 'Completed'],
        ['Rose Fernandez', 'Lower Bicutan, Taguig City', 'Completed'],
        ['Nicole Alcid', 'Ususan, Taguig City', 'Pending'],
        ['Kaila Marie Alima', 'Betterliving, Parañaque City', 'Completed'],
        ['Simounne Cruz', 'Signal, Taguig City', 'Pending'],
    ];

    const filterButton = document.getElementById('filterButton');
    const filterModal = document.getElementById('filterModal');
    const backButton = document.getElementById('backButton');
    const applyFilterButton = document.getElementById('applyFilterButton');
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');

    let currentState; 

    filterButton.addEventListener('click', function () {
        currentState = window.location.href;
        filterModal.style.display = 'block';
    });

    backButton.addEventListener('click', function () {
        // If there is a stored state, navigate back to it
        if (currentState) {
            window.location.href = currentState;
        } else {
            // Go back in the browser history if no stored state
            history.back();
        }
    });

    applyFilterButton.addEventListener('click', function () {
        // Apply filter logic based on selected checkboxes
        const selectedFilters = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredData = filterTrackingDataByStatus(selectedFilters);
        updateTrackingTable(filteredData);

        // Hide the filter modal after applying the filter
        filterModal.style.display = 'none';
    });

    function filterTrackingDataByStatus(selectedFilters) {
        if (selectedFilters.length === 0) {
            return trackingData; // Show all items if no filters selected
        }

        return trackingData.filter(row => selectedFilters.includes
            (row[2].toLowerCase()));
    }

    const rowLimit = 5;
    let currentRowLimit = rowLimit;
    const tableBody = document.getElementById('trackingBody');
    const searchInput = document.getElementById('searchInput');
    const viewMoreButton = document.querySelector('.view-more-button');
    const viewLessButton = document.querySelector('.view-less-button');

    function populateTrackingData(data) {
         // Display only the specified number of rows initially
         for (let index = 0; index < currentRowLimit 
            && index < data.length; index++) {
            const rowClass = (index === 0) ? 'light-blue' : '';
            const newRow = createRow(data[index], rowClass);
            tableBody.appendChild(newRow);
        }

        if (data.length > rowLimit) {
            viewMoreButton.style.display = 'block';
        }
    }

        function createRow(data, rowClass) {
            const newRow = document.createElement('tr');
            newRow.className = rowClass;
    
            data.forEach((value, colIndex) => {
                const cell = document.createElement('td');
    
                if (colIndex === 2) {
                    cell.className = 'status-cell';
                    cell.innerHTML = `${value} 
                    <button class="details-button">View Details</button>`;
                    
                    const detailsButton = cell.querySelector('.details-button');
                    detailsButton.addEventListener('click', function () {
                        window.location.href = 
                        'order_details/order_details.html';
                    });
                } else {
                    cell.innerHTML = value;
                }
    
                newRow.appendChild(cell);
            });
            
        return newRow;
    }

    function showMoreRows() {
        currentRowLimit = trackingData.length; 
        updateTable();
    }

    function showLessRows() {
        currentRowLimit = rowLimit; 
        updateTable();
    }

    // Populate the table with the specified number of rows
    function updateTable() {
        tableBody.innerHTML = '';
        populateTrackingData(trackingData);
        viewMoreButton.style.display = (currentRowLimit < 
            trackingData.length) ? 'block' : 'none';
        viewLessButton.style.display = (currentRowLimit 
            > rowLimit) ? 'block' : 'none';
    }

    function filterTrackingData(query) {
        const filteredData = trackingData.filter(row => {
            const receiverName = row[0].toLowerCase();
            const receiverAddress = row[1].toLowerCase();
            const lowercasedQuery = query.toLowerCase();

            return receiverName.includes(lowercasedQuery) || 
            receiverAddress.includes(lowercasedQuery);
        });

        return filteredData;
    }

    function updateTrackingTable(filteredData) {
        tableBody.innerHTML = '';

        populateTrackingData(filteredData);
        if (filteredData.length > rowLimit) {
            document.querySelector('.view-more-button').style.display 
            = 'block';
        } else {
            document.querySelector('.view-more-button').style.display = 'none';
        }
    }

    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.trim();

        console.log('Search query:', searchQuery);

        if (searchQuery !== '') {
            const filteredData = filterTrackingData(searchQuery);
            updateTrackingTable(filteredData);
        } else {
            updateTrackingTable(trackingData);
        }
    });

    document.querySelector('.view-more-button').addEventListener
    ('click', showMoreRows);
    document.querySelector('.view-less-button').addEventListener
    ('click', showLessRows);

    populateTrackingData(trackingData);

    // OpenWeatherMap integration
    const weatherWidgetContainer = document.getElementById('weatherWidget');
    const apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?' +
    'lat=14.5204&lon=121.0190&' +
    'appid=b08f0dc18be515f55ecea4bc67c6abb5&units=metric';



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
                                <img class="cloud-icon" src="upload/cloud.png" 
                                alt="Cloud Icon">
                                <p class="temperature">${temperature} °C</p>
                             </div>
                             <p class="description">${description}</p>`;

        weatherWidgetContainer.innerHTML = weatherHtml;
    }

    
});
