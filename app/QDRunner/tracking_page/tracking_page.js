document.addEventListener("DOMContentLoaded", function () {
    const updateStatusDropdown = document.getElementById("update_status_dropdown");
    const dropdownContent = document.getElementById("dropdown_content");
  
    // Toggle the visibility of the dropdown content
    updateStatusDropdown.addEventListener("click", function () {
      dropdownContent.classList.toggle("show-dropdown-content");
    });
  
    // Close the dropdown when clicking outside of it
    window.addEventListener("click", function (event) {
      if (!event.target.matches('.update-status')) {
        dropdownContent.classList.remove('show-dropdown-content');
      }
    });
  
    // Handle option click events
    function handleOptionClick(option) {
      console.log(`${option} option selected!`);
      // Add your logic for each option here
      dropdownContent.classList.remove("show-dropdown-content");
    }
  
    // Delivered option click event
    document.getElementById("delivered_option").addEventListener("click", function () {
      handleOptionClick("Delivered");
    });
  
    // In Transit option click event
    document.getElementById("in_transit_option").addEventListener("click", function () {
      handleOptionClick("In Transit");
    });
  
    // Sorting Center option click event
    document.getElementById("sorting_center_option").addEventListener("click", function () {
      handleOptionClick("Sorting Center");
    });
  });
  