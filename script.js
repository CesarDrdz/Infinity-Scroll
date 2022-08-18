const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api 
const count = 30;
const apiKey = `Nnbc9XY__ZdaOS_ShhTENsVT-oV5jjfE0YZRsNoKKaY`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

    }
}

// Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



// Create Elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photos Array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        // Keeping it dry
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img>  for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        // Keeping it dry
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when finished laoding 
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside an imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos fro. Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();


    } catch (error) {
        // catch error here 
    }

}

// Checck to see if scrolling near bottom of page, Loads more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});

// on load
getPhotos();