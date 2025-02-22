// Product data (Can be replaced with an API or database later)
const products = {
    1: {
        name: "Classic Men's Shirt",
        price: "$50",
        description: "A timeless classic, crafted with high-quality cotton for all-day comfort. Perfect for both casual and formal wear.",
        images: ["images/p1.png", "images/p1.png", "images/p1.png"]
    },
    2: {
        name: "Premium Formal Shirt",
        price: "$75",
        description: "Upgrade your wardrobe with this premium formal shirt. Designed with a modern fit and breathable fabric for ultimate style and comfort.",
        images: ["images/p2.png", "images/p2.png", "images/p2.png"]
    },
    3: {
        name: "Elegant Women's Dress",
        price: "$50",
        description: "A beautifully designed dress that combines elegance with comfort. Made with lightweight fabric for a graceful look.",
        images: ["images/p3.png", "images/p3.png", "images/p3.png"]
    },
    4: {
        name: "Chic Summer Dress",
        price: "$50",
        description: "Stay cool and stylish with this chic summer dress. The vibrant colors and soft fabric make it a must-have for warm days.",
        images: ["images/p4.png", "images/p4.png", "images/p4.png"]
    },
    5: {
        name: "Casual Polo T-Shirt",
        price: "$50",
        description: "A perfect blend of casual and sporty. This breathable cotton polo T-shirt is great for everyday wear and outdoor activities.",
        images: ["images/p5.png", "images/p5.png", "images/p5.png"]
    },
    6: {
        name: "Luxury Silk Saree",
        price: "$50",
        description: "Embrace traditional elegance with this luxurious silk saree. Perfect for weddings, parties, and festive occasions.",
        images: ["images/p6.png", "images/p6.png", "images/p6.png"]
    },
    7: {
        name: "Trendy Denim Jacket",
        price: "$50",
        description: "Add an edge to your outfit with this trendy denim jacket. A versatile piece that pairs well with any casual look.",
        images: ["images/p7.png", "images/p7.png", "images/p7.png"]
    },
    8: {
        name: "Modern Women's Blazer",
        price: "$50",
        description: "Stay stylish and professional with this modern women's blazer. Tailored for a sharp and confident look.",
        images: ["images/p8.png", "images/p8.png", "images/p8.png"]
    },
    9: {
        name: "Comfy Cotton Kurta",
        price: "$50",
        description: "A blend of tradition and comfort. This soft cotton kurta is perfect for both casual and festive occasions.",
        images: ["images/p9.png", "images/p9.png", "images/p9.png"]
    },
    10: {
        name: "Stylish Hooded Sweatshirt",
        price: "$50",
        description: "A cozy and stylish hoodie, perfect for chilly days. Features a soft fleece lining for extra warmth and comfort.",
        images: ["images/p10.png", "images/p10.png", "images/p10.png"]
    },
    11: {
        name: "Athletic Sports Tracksuit",
        price: "$50",
        description: "Stay active in style with this athletic tracksuit. Made with stretchable and breathable fabric for maximum performance.",
        images: ["images/p11.png", "images/p11.png", "images/p11.png"]
    },
    12: {
        name: "Elegant Party Gown",
        price: "$50",
        description: "Turn heads at any event with this elegant party gown. Designed with intricate details and a flowing silhouette.",
        images: ["images/p12.png", "images/p12.png", "images/p12.png"]
    }
};



// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Load product details dynamically
if (products[productId]) {
    const product = products[productId];

    // Set product details
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText = product.price;
    document.getElementById("productDescription").innerText = product.description;

    // Load images into the gallery
    const galleryContainer = document.querySelector(".gallery-container");
    product.images.forEach((imageSrc) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = product.name;
        galleryContainer.appendChild(img);
    });
} else {
    document.body.innerHTML = "<h2>Product not found</h2><a href='index.html'>Back to Home</a>";
}

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

const gallery = document.querySelector(".gallery-container");

gallery.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

gallery.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) {
        // Swipe right (previous image)
        moveToImage(currentIndex - 1);
    } else if (swipeDistance < -50) {
        // Swipe left (next image)
        moveToImage(currentIndex + 1);
    }
}

// Navigation arrows
let currentIndex = 0;

document.querySelector(".left-arrow").addEventListener("click", () => {
    moveToImage(currentIndex - 1);
});

document.querySelector(".right-arrow").addEventListener("click", () => {
    moveToImage(currentIndex + 1);
});

function moveToImage(index) {
    const images = document.querySelectorAll(".gallery-container img");
    if (index < 0) index = images.length - 1; // Loop to last image
    if (index >= images.length) index = 0; // Loop to first image

    gallery.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

