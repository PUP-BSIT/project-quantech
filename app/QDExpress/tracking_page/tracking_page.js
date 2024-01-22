document.addEventListener("DOMContentLoaded", function () {
    const updateBtn = document.querySelector(".update-btn");
    const formPopup = document.querySelector(".form-popup");
    const overlay = document.querySelector(".overlay");
    const backBtn = document.querySelector(".back");
    const saveBtn = document.querySelector(".save");
    const form = document.querySelector("#updateForm");
    const updateStatusSelect = document.querySelector("#status");
    const locationInput = document.querySelector("#location");
    const descriptionTextarea = document.querySelector("#description");
    const displayArea = document.querySelector("#tracking-entries");
    const orderIdElement = document.getElementById('orderIdDisplay');

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    console.log('Fetched orderId from URL parameters:', orderId);

    if (orderId) {
        orderIdElement.textContent = orderId;
        fetchDeliveryDetails(orderId);

        const savedUpdates = JSON.parse(localStorage.getItem(`updates_${orderId}`)) || [];
        displaySavedUpdates(savedUpdates);
    } else {
        console.error('orderId not found in URL parameters');
    }

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
                const orderDetails = deliveryList.find(delivery => delivery.order_id == orderId);

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

    function showForm() {
        formPopup.style.display = "block";
        overlay.style.display = "block";
    }

    function centerForm() {
        const form = document.getElementById("updateForm");
        if (form) {
            form.style.top = "50%";
            form.style.left = "50%";
            form.style.transform = "translate(-50%, -50%)";
        }
    }

    function goBack() {
        formPopup.style.display = 'none';
        overlay.style.display = 'none';
    }

    function sendUpdateToLogistics(orderId, timestamp, location, description, updateStatus) {
        const apiUrl = 'https://cybertechlogistic.online/app/controller/update-delivery-api.php';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderId,
                timestamp: timestamp,
                location: location,
                description: description,
                updateStatus: updateStatus,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Update sent to logistics:', data);
        })
        .catch(error => {
            console.error('Error sending update to logistics:', error);
        });
    }

    function saveStatus() {
        const updateStatusValue = updateStatusSelect.value;
        const location = locationInput.value;
        const description = descriptionTextarea.value;

        console.log("Save button clicked");
        if (!updateStatusValue || !location || !description) {
            alert("Please fill in all required fields.");
            return;
        }

        const statusTexts = {
            'picked-up': 'Picked up from seller',
            'in-transit': 'In transit',
            'delivered': 'Delivered'
        };

        const updateStatus = statusTexts[updateStatusValue] || '';

        const currentDate = new Date();
        const timestamp = currentDate.toISOString();
        

        const savedUpdates = JSON.parse(localStorage.getItem(`updates_${orderId}`)) || [];
        savedUpdates.push({
            timestamp: currentDate.toISOString(),
            updateStatus,
            location,
            description
        });
        localStorage.setItem(`updates_${orderId}`, JSON.stringify(savedUpdates));

        sendUpdateToLogistics(orderId, timestamp, location, description, updateStatus);

        if (updateStatusValue === 'delivered') {
            const deliveryList = JSON.parse(localStorage.getItem('deliveryList')) || [];
        
            const deliveryToUpdate = deliveryList.find(delivery => delivery.order_id === orderId);

        if (deliveryToUpdate) {
            deliveryToUpdate.status = 2; 
        }

        localStorage.setItem('deliveryList', JSON.stringify(deliveryList));
        }

        const entryElement = document.createElement("div");
        entryElement.className = "tracking-entry";
        entryElement.innerHTML = `
            <div class="timestamp">${timestamp}</div>
            <div class="status">${updateStatus}</div>
            <div class="location">${location}</div>
            <div class="description">${description}</div>
        `;


        displayArea.appendChild(entryElement);

        formPopup.style.display = "none";
        overlay.style.display = "none";

        console.log("Update Status:", updateStatus);
        console.log("Location:", location);
        console.log("Description:", description);
        console.log("Save button clicked");
    }


    updateBtn.addEventListener("click", function () {
        showForm();
    });

    backBtn.addEventListener("click", function () {
        goBack();
    });

    saveBtn.addEventListener("click", function () {
        saveStatus();
    });

    function displaySavedUpdates(savedUpdates) {
        savedUpdates.forEach(update => {
            const entryElement = createEntryElement(update);
            displayArea.appendChild(entryElement);
        });
    }
    
    function createEntryElement(update) {
        const entryElement = document.createElement("div");
        entryElement.className = "tracking-entry";
        entryElement.innerHTML = `
            <div class="timestamp">${update.timestamp}</div>
            <div class="status">${update.updateStatus}</div>
            <div class="location">${update.location}</div>
            <div class="description">${update.description}</div>
        `;
    
        return entryElement;
    }


});
