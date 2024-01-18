document.addEventListener('DOMContentLoaded', function () {

    function initMap() {
        const geomap = L.map('geomap');

        // Function to set map view based on user's location
        function setLocation(position) {
            const latlng = [position.coords.latitude, position.coords.longitude];
            geomap.setView(latlng, 13);

            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(geomap);

            const marker = L.marker(latlng).addTo(geomap);
            marker.bindPopup("<b>Your driver is here!</b>").openPopup();
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(setLocation, function (error) {
                console.error('Error getting location:', error);
                geomap.setView([51.505, -0.50], 13);

                const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                const tiles = L.tileLayer(tileUrl, { attribution });
                tiles.addTo(geomap);
            });
        } else {
            geomap.setView([51.505, -0.50], 13);

            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(geomap);
        }

        const updateStatusBtn = document.getElementById('updateStatusBtn');
        updateStatusBtn.addEventListener('click', function () {
            window.location.href = '../tracking_page/tracking_page.html';
        });

    }

    initMap();
}); 
