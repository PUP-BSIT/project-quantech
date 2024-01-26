document.addEventListener('DOMContentLoaded', function () {
    const partnerId = localStorage.getItem('partner_id');

    if (partnerId) {
        const apiUrl = `https://cybertechlogistic.online/app/controller/get-delivery-list.php?partner_id=${partnerId}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    const riderName = data.length > 0 ? data[0].rider_name : 'Unknown Rider';
                    document.getElementById('fullname-display').textContent = `Welcome, ${riderName}!`;
                    document.getElementById('rider_name').textContent = riderName;
                } else {
                    console.error('Failed to fetch rider details:', data);
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });

        const username = localStorage.getItem('username');
        document.getElementById('username').textContent = username;

        const logoutButton = document.getElementById('logout-btn');
        logoutButton.addEventListener('click', function () {
            window.location.href = '../';
        });
    } else {
        console.error('partner_id not available');
    }
});
