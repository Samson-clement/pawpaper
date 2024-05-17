window.addEventListener('load', () => {
    const galleryItems = document.querySelectorAll('.gallery .item');
    galleryItems.forEach((item, index) => {
        if (index >= 10) {
            item.classList.add('hidden');
            item.style.display = 'none';
        }
    });
});

function showMore() {
    const hiddenItems = document.querySelectorAll('.gallery .item.hidden');
    const itemsToShow = Array.from(hiddenItems).slice(0, 10);
    itemsToShow.forEach(item => {
        item.classList.remove('hidden');
        item.style.display = 'block';
    });

    const gallery = document.querySelector('.gallery');
    const currentPadding = parseInt(window.getComputedStyle(gallery).getPropertyValue('padding-bottom'), 10);
    gallery.style.paddingBottom = `${currentPadding + 0}px`; // Update padding as needed
}

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

document.querySelectorAll('.download-img').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the gallery item click event from firing
        const imgSrc = this.closest('.item').querySelector('img').src;
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = imgSrc.split('/').pop(); // Extract the filename and set it as the download attribute
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
