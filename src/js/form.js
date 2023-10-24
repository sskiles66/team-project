button = document.getElementById("news-form");
button.addEventListener('submit', function(event){
    event.preventDefault(); // Prevent the default form submission

     // Replace the form with the "thank you" message
    document.getElementById("news-form").style.display = "none";
    document.getElementById("thankYouMessage").style.display = "block";
});