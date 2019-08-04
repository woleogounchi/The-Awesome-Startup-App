// *----Get and display 12 random users----*
// We create a new variable xhr to hold our XML Http request through which, 
// we will get data from the "Random User" api. 
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=U');
xhr.onreadystatechange = function() {
    // Upon readiness...
    if (xhr.readyState === 4 && xhr.status === 200) {
        // ...we parse the provided data on JSON format
        var employees = JSON.parse(xhr.responseText);

        for (let i = 0; i < employees.results.length; i++) {
            const thumbnail = employees.results[i].picture.thumbnail;
            const firstName = employees.results[i].name.first;
            const lastName = employees.results[i].name.last;
            const email = employees.results[i].email;
            const city = employees.results[i].location.city;
            const state = employees.results[i].location.state;
            // We create a "galleryHTML" variable to hold the data 
            // for each card
            const galleryHTML = `
            <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${thumbnail}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city}, ${state}</p>
                    </div>
                </div>
            `
                // Add the employees' cards to the page
            $('.gallery').append(galleryHTML);
        }

        // function for displaying employee card
        function displayCard(i) {
            const thumbnail = employees.results[i].picture.thumbnail;
            const firstName = employees.results[i].name.first;
            const lastName = employees.results[i].name.last;
            const email = employees.results[i].email;
            const city = employees.results[i].location.city;
            const state = employees.results[i].location.state;
            // Additional data displayed when employee's card is clicked
            const phone = employees.results[i].phone;
            const street = employees.results[i].location.street.toUpperCase();
            const birthMonth = employees.results[i].dob.date.slice(5, 7);
            const birthDate = employees.results[i].dob.date.slice(8, 10);
            const birthYear = employees.results[i].dob.date.slice(0, 4);
            // The markup for each card when clicked
            const modal = `
            <div class="modal-container">
                <div class="modal">
                <button type="button" id ="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class ="modal-img" src="${thumbnail}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3> 
                    <p class="modal-text">${email}</p> 
                    <p class="modal-text cap">${city}</p> 
                    <hr>
                    <p class="modal-text">${phone}</p> 
                    <p class="modal-text">${street}, ${city}, ${state} 97204</p> 
                    <p class="modal-text">Birthday: ${birthMonth}/${birthDate}/${birthYear}</p> 
                </div> 
            </div>
            `
                // Append html to pop up window
            $("body").append(modal);

            // Closing the employee card 
            $(".modal-close-btn").on("click", function() {
                $(".modal-container").remove();
            });
        }

        // When clicked on employee card, modal container appears
        $('#gallery').on("click", ".card", function() {
            i = ($(this).index())
            displayCard(i);
        });
    }
}
xhr.send();