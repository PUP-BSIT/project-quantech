document.addEventListener('DOMContentLoaded', function () {
    // Get the dropdown button and content
    const dropdownButton = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Toggle the visibility of the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dropbtn')) {
            // Check if the clicked element is not the dropdown button
            // Close the dropdown if it is currently open
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});

// Close the dropdown if the user presses the Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});
