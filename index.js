
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
    setCookie('cookieConsent', 'accepted', 365); // Set cookie to expire in 365 days
    // document.getElementById('cookieConsent').style.display = 'none';
    closeConsent();
    console.log("Cookies accepted");
}
// Function to handle rejecting cookies
function rejectCookies() {
    setCookie('cookieConsent', 'rejected', 1); // Set cookie to expire in 1 days
    // document.getElementById('cookieConsent').style.display = 'none';
    closeConsent();
    console.log("Cookies rejected");
}

function showCookieConsent() {
    document.getElementById('cookieConsent').style.display = 'flex';
    document.getElementById('overlayTint').style.display = 'block';
}
function closeConsent() {
    document.getElementById('cookieConsent').style.display = 'none';
    document.getElementById('overlayTint').style.display = 'none';
}

// Function to check if consent is given
function checkConsent() {
    const consent = getCookie('cookieConsent');
    if (consent === 'accepted' || consent === 'rejected') {
        document.getElementById('cookieConsent').style.display = 'none';
        document.getElementById('overlayTint').style.display = 'none';
    } else {
        // document.getElementById('cookieConsent').style.display = 'flex';
        showCookieConsent();
    }
}

// IN FILE JS STARTS BELOW HERE:

// Check consent on page load
window.onload = checkConsent;

function runConfetti() {
    confetti({
        particleCount: 400,
        spread: 90,
        origin: { x: 1, y: 0.9 },
    });

    confetti({
        particleCount: 400,
        spread: 90,
        origin: { x: 0, y: 0.9 },
    });
}

window.addEventListener('load', () => {
    // Random daily image logic
    const dailyImage = document.getElementById('dailyImage');
    const today = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
    const storedDate = localStorage.getItem('dailyImageDate');
    const storedImageIndex = localStorage.getItem('dailyImageIndex');

    let newImageIndex;

    if (storedDate === today && storedImageIndex) {
        newImageIndex = storedImageIndex;
    } else {
        newImageIndex = Math.floor(Math.random() * 131) + 1; // Generate a random number between 1 and 16
        localStorage.setItem('dailyImageDate', today); // Store the current date
        localStorage.setItem('dailyImageIndex', newImageIndex); // Store the new image index
    }

    dailyImage.src = `./assets/${newImageIndex}.png`;


});

function downloadDailyImage() {
    const dailyImage = document.getElementById('dailyImage');
    const link = document.createElement('a');
    link.href = dailyImage.src;
    link.download = dailyImage.src.split('/').pop(); // Extract the filename and set it as the download attribute
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById('celebrateButton').addEventListener('click', runConfetti);

document.getElementById('hamburgerMenu').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const galleryContainer = document.getElementById('gallery-container');

    // Create an array of image indices
    let imageIndexes = Array.from({ length: 131 }, (_, i) => i + 1);
    
    // Shuffle the array to randomize the order
    for (let i = imageIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageIndexes[i], imageIndexes[j]] = [imageIndexes[j], imageIndexes[i]];
    }

    // Generate HTML content for each image
    let htmlContent = '';
    imageIndexes.forEach(index => {
        htmlContent += `
            <div class="item">
                <img data-src="./assets/${index}.png" class="img-fluid lazy" alt="adorable cat">
                <div class="overlay">
                    <img src="./assets/download.svg" class="download-img" alt="Download Image" onclick="openDownloadPage('${index}.png')"/>
                </div>
            </div>
        `;
    });

    // Set the HTML content of the gallery container
    galleryContainer.innerHTML = htmlContent;

    function openDownloadPage(imageName) {
        window.location.href = `downloading.html?image=${imageName}`;
      }

    // Implement advanced lazy loading using IntersectionObserver
    const lazyImages = document.querySelectorAll("img.lazy");

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
        });
    }

    // Handle image download
document.querySelectorAll('.download-img').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the gallery item click event from firing
        const imgElement = this.closest('.item').querySelector('img');
        const imgSrc = imgElement.dataset.src; // Use data-src
        openDownloadPage(imgSrc.split('/').pop()); // Extract the filename and pass it to the function
    });
});

function openDownloadPage(imageName) {
    window.location.href = `downloading.html?image=${imageName}`;
}

});