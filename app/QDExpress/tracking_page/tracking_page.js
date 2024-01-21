function showForm() {
  document.getElementById("updateForm").style.display = "block";
}

function goBack() {
  document.getElementById("updateForm").style.display = "none";
}

function saveStatus() {
  // Add your logic to save the selected status
  alert("Status saved!");
  document.getElementById("updateForm").style.display = "none";
}