let partnerId; 
let riderName; 

document.addEventListener('DOMContentLoaded', function () {
    partnerId = localStorage.getItem('partner_id');

    if (partnerId) {
        var apiUrl = 'https://cybertechlogistic.online/app/controller/' +
            'get-delivery-list.php?partner_id=' + partnerId;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    riderName = data.length > 0 ? data[0].rider_name : 'Unknown Rider';

                    document.getElementById('userNamePlaceholder').textContent = riderName;

                    updateTrackingTable(data);
                } else {
                    console.error('Failed to fetch delivery list:', data);
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });

        var filterButton = document.getElementById('filterButton');
        filterButton.addEventListener('click', showFilterModal);

        var applyFilterButton = document.getElementById('applyFilterButton');
        applyFilterButton.addEventListener('click', applyFilter);

        var searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', performSearch);

    } else {
        console.error('partner_id not available');
    }
});

function updateTrackingTable(deliveryList) {
    var trackingBody = document.getElementById('trackingBody');

    trackingBody.innerHTML = '';

    if (deliveryList.length > 0) {
        deliveryList.forEach(function (delivery) {
            var row = trackingBody.insertRow();

            var orderIdCell = row.insertCell(0);
            orderIdCell.textContent = delivery.order_id;

            var locationCell = row.insertCell(1);
            locationCell.textContent = delivery.destination_address;

            var descriptionCell = row.insertCell(2);
            descriptionCell.textContent = delivery.status === 1 ? 'Pending' : 'Completed';

            var riderNameCell = row.insertCell(3);
            riderNameCell.textContent = delivery.rider_name;

            var viewDetailsButton = document.createElement('button');
            viewDetailsButton.textContent = 'View Details';
            viewDetailsButton.className = 'details-button';
            viewDetailsButton.addEventListener('click', function () {
                redirectToOrderDetails(delivery.order_id);
            });

            viewDetailsButton.style.width = '100%';

            riderNameCell.appendChild(viewDetailsButton);

            row.addEventListener('mouseover', function () {
                viewDetailsButton.style.display = 'block';
            });

            row.addEventListener('mouseout', function () {
                viewDetailsButton.style.display = 'none';
            });
        });
    } else {
        var row = trackingBody.insertRow();

        var emptyCell = row.insertCell(0);
        emptyCell.colSpan = 5; 

        emptyCell.textContent = 'No deliveries available.';
    }
}

function showFilterModal() {
    var filterModal = document.getElementById('filterModal');
    filterModal.style.display = 'block';

    var filterButton = document.getElementById('filterButton');
    filterButton.style.display = 'none';
}

function applyFilter() {
    var pendingCheckbox = document.querySelector('.filter-checkbox[value="pending"]');
    var completedCheckbox = document.querySelector('.filter-checkbox[value="completed"]');

    var apiUrl = 'https://cybertechlogistic.online/app/controller/' +
        'get-delivery-list.php?partner_id=' + partnerId;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                var filteredList = data.filter(delivery => {
                    if (pendingCheckbox.checked && completedCheckbox.checked) {
                        return true; 
                    } else if (pendingCheckbox.checked) {
                        return delivery.status === 1; 
                    } else if (completedCheckbox.checked) {
                        return delivery.status !== 1; 
                    } else {
                        return true; 
                    }
                });

                updateTrackingTable(filteredList);
            } else {
                console.error('Failed to fetch delivery list:', data);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });

    var filterModal = document.getElementById('filterModal');
    filterModal.style.display = 'none';

    var filterButton = document.getElementById('filterButton');
    filterButton.style.display = 'block';
}

function performSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchQuery = searchInput.value.toLowerCase();

    var apiUrl = 'https://cybertechlogistic.online/app/controller/' +
        'get-delivery-list.php?partner_id=' + partnerId;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                // Filter the delivery list based on the search query
                var filteredList = data.filter(delivery => {
                    var orderIdString = String(delivery.order_id);

                    return (
                        orderIdString.toLowerCase().includes(searchQuery) ||
                        delivery.destination_address.toLowerCase().includes(searchQuery) ||
                        delivery.rider_name.toLowerCase().includes(searchQuery)
                    );
                });

                updateTrackingTable(filteredList);
            } else {
                console.error('Failed to fetch delivery list:', data);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
}

function redirectToOrderDetails(orderId) {
    window.location.href = '../order_details/?orderId=' + orderId;
}

// OpenWeatherMap integration
const weatherWidgetContainer = document.getElementById('weatherWidget');
const apiUrl =
'https://api.openweathermap.org/data/2.5/weather?' +
'lat=14.5204&lon=121.0190&' +
'appid=b08f0dc18be515f55ecea4bc67c6abb5&units=metric';

fetch(apiUrl)
    .then(response => response.json())
    .then(weatherData => displayWeather(weatherData))
    .catch(error => console.error('Error fetching weather:', error));

function displayWeather(weatherData) {
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;

    const weatherHtml = `<div class="temperature-container">
                            <img class="cloud-icon" src="../upload/cloud.png" 
                            alt="Cloud Icon">
                            <p class="temperature">${temperature} °C</p>
                         </div>
                         <p class="description">${description}</p>`;

    weatherWidgetContainer.innerHTML = weatherHtml;
}
