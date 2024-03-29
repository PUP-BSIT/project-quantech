document.addEventListener('DOMContentLoaded', function () {

    function fetchDeliveryDetails(orderId) {
        let partnerId = localStorage.getItem('partner_id');
        let apiUrl = 'https://cybertechlogistic.online/app/controller/get-delivery-list.php?partner_id=' + partnerId;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(deliveryList => {
                const orderDetails = deliveryList.find(delivery => parseInt(delivery.order_id) === parseInt(orderId));

                if (orderDetails) {
                    updateOrderDetailsUI(orderDetails);
                } else {
                    console.error('Order details not found for orderId:', orderId);
                }
            })
            .catch(error => {
                console.error('Error fetching delivery list:', error);
            });
    }

    function updateOrderDetailsUI(orderDetails) {

        console.log("Updating UI with order details:", orderDetails);
        
        const trackingNumberElement = document.getElementById('trackingNumber');
        const receiverNameElement = document.getElementById('receiverName');
        const senderNameElement = document.getElementById('senderName');
        const receiverAddressElement = document.getElementById('receiverAddress');
        const senderAddressElement = document.getElementById('senderAddress');

        trackingNumberElement.textContent = orderDetails.order_id;
        receiverNameElement.textContent = orderDetails.receiver_name;
        senderNameElement.textContent = orderDetails.source_name;
        receiverAddressElement.textContent = orderDetails.destination_address;
        senderAddressElement.textContent = orderDetails.src_address;

        updateMap(orderDetails);
    }

    // Function to initialize and update the map
    function updateMap(orderDetails) {
        const geomap = L.map('geomap');

        function setLocation(position) {
            const latlng = [position.coords.latitude, position.coords.longitude];
            geomap.setView(latlng, 13);

            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(geomap);

            const marker = L.marker(latlng).addTo(geomap);
            marker.bindPopup("<b>Your driver is here!</b>").openPopup();
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(setLocation, function (error) {
                console.error('Error getting location:', error);
                geomap.setView([51.505, -0.50], 13);

                const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                const tiles = L.tileLayer(tileUrl, { attribution });
                tiles.addTo(geomap);
            });
        } else {
            geomap.setView([51.505, -0.50], 13);

            const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(geomap);
        }
    }

    // Fetch orderId 
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    console.log('Fetched orderId from URL parameters:', orderId);

    if (orderId) {
        fetchDeliveryDetails(orderId);
    } else {
        console.error('orderId not found in URL parameters');
    }

    const updateStatusBtn = document.getElementById('updateStatusBtn');
    updateStatusBtn.addEventListener('click', function () {
        window.location.href = '../tracking_page/?orderId=' + orderId;
    });

});
