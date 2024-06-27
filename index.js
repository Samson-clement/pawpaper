
// Initially hide all but the first 10 images
window.addEventListener('load', () => {
    const galleryItems = document.querySelectorAll('.gallery .item');
    galleryItems.forEach((item, index) => {
        if (index >= 6) {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
});

// Function to show more images
function showMore() {
    const hiddenItems = document.querySelectorAll('.gallery .item.hidden');
    const itemsToShow = Array.from(hiddenItems).slice(0, 6);
    itemsToShow.forEach(item => {
        item.classList.remove('hidden');
        item.style.display = 'block';
    });

    const gallery = document.querySelector('.gallery');
    const currentPadding = parseInt(window.getComputedStyle(gallery).getPropertyValue('padding-bottom'), 10);
    gallery.style.paddingBottom = `${currentPadding + 0}px`; // Update padding as needed
}

// Load more images when the user scrolls down
window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // Check if the user is near the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 100) { // Adjust the threshold as needed
        const hiddenItems = document.querySelectorAll('.gallery .item.hidden');
        if (hiddenItems.length > 0) {
            showMore(); // Automatically load more images
        }
    }
});



document.querySelectorAll('.gallery .item').forEach(item => {
    item.addEventListener('click', function() {
        const overlay = this.querySelector('.overlay');
        overlay.style.visibility = (overlay.style.visibility === 'visible') ? 'hidden' : 'visible';
    });
});

document.querySelectorAll('.daily .item').forEach(item => {
    item.addEventListener('click', function() {
        const overlay = this.querySelector('.overlay');
        overlay.style.visibility = (overlay.style.visibility === 'visible') ? 'hidden' : 'visible';
    });
});

// document.querySelectorAll('.download-img').forEach(button => {
//     button.addEventListener('click', function(e) {
//         e.stopPropagation(); // Prevent the gallery item click event from firing
//         const imgSrc = this.closest('.item').querySelector('img').src;
//         const link = document.createElement('a');
//         link.href = imgSrc;
//         link.download = imgSrc.split('/').pop(); // Extract the filename and set it as the download attribute
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     });
// });

document.addEventListener('DOMContentLoaded', (event) => {
    // Get the title element by its ID
    const titleElement = document.getElementById('title');
    
    // Add a click event listener to the title element
    titleElement.addEventListener('click', () => {
        // Navigate to index.html
        window.location.href = 'index.html';
    });
});


document.getElementById('getRandomCat').addEventListener('click', function(e) {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * 131) + 1;
    const imgSrc = `./assets/${randomIndex}.png`;
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = imgSrc.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// function to close cookie window
function closeConsent() {
    document.getElementById('cookieConsent').style.display = 'none';
}
document.querySelector('.cookie-consent .close').addEventListener('click', closeConsent);

// cookies
function acceptCookies() {
    document.getElementById('cookieConsent').style.display = 'none';
    console.log("Cookies accepted");
}

function rejectCookies() {
    document.getElementById('cookieConsent').style.display = 'none';
    // Your logic to handle cookie rejection
    console.log("Cookies rejected");
}
// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Function to handle accepting cookies
function acceptCookies() {
    setCookie('cookieConsent', 'accepted', 7); // Set cookie to expire in 7 days
    document.getElementById('cookieConsent').style.display = 'none';
    console.log("Cookies accepted");
}
// Function to handle rejecting cookies
function rejectCookies() {
    setCookie('cookieConsent', 'rejected', 1); // Set cookie to expire in 1 days
    document.getElementById('cookieConsent').style.display = 'none';
    console.log("Cookies rejected");
}

// Function to check if consent is given
function checkConsent() {
    const consent = getCookie('cookieConsent');
    if (consent === 'accepted' || consent === 'rejected') {
        document.getElementById('cookieConsent').style.display = 'none';
    } else {
        document.getElementById('cookieConsent').style.display = 'flex';
    }
}
// Check consent on page load
window.onload = checkConsent;

