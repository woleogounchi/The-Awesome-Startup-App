var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://randomuser.me/api/?results=12');
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var employees = JSON.parse(xhr.responseText);
        var galleryHTML = "";
        for (let i = 0; i < employees.results.length; i++) {
            galleryHTML += '<div class="card">';
            galleryHTML += '<div class="card-img-container">';
            galleryHTML += `<img class="card-img" src=${employees.results[i].picture.thumbnail} alt="profile picture">`;
            galleryHTML += '</div>';
            galleryHTML += '<div class="card-info-container">';
            galleryHTML += `<h3 id="name" class="card-name cap">${employees.results[i].name.first} ${employees.results[i].name.last}</h3>`
            galleryHTML += `<p class="card-text">${employees.results[i].email}</p>`
            galleryHTML += `<p class="card-text cap">${employees.results[i].location.city}, ${employees.results[i].location.state}</p>`
            galleryHTML += '</div>'
            galleryHTML += '</div>';
        }
        document.getElementById('gallery').innerHTML = galleryHTML;
    }
}
xhr.send();