// Product data (Can be replaced with an API or database later)
const products = {
    1: {
        name: "Classic Men's Shirt",
        price: "$50",
        description: "A timeless classic, crafted with high-quality cotton for all-day comfort. Perfect for both casual and formal wear.",
        image: "images/p1.png"
    },
    2: {
        name: "Premium Formal Shirt",
        price: "$75",
        description: "Upgrade your wardrobe with this premium formal shirt. Designed with a modern fit and breathable fabric for ultimate style and comfort.",
        image: "images/p2.png"
    },
    3: {
        name: "Elegant Women's Dress",
        price: "$50",
        description: "A beautifully designed dress that combines elegance with comfort. Made with lightweight fabric for a graceful look.",
        image: "images/p3.png"
    },
    4: {
        name: "Chic Summer Dress",
        price: "$50",
        description: "Stay cool and stylish with this chic summer dress. The vibrant colors and soft fabric make it a must-have for warm days.",
        image: "images/p4.png"
    },
    5: {
        name: "Casual Polo T-Shirt",
        price: "$50",
        description: "A perfect blend of casual and sporty. This breathable cotton polo T-shirt is great for everyday wear and outdoor activities.",
        image: "images/p5.png"
    },
    6: {
        name: "Luxury Silk Saree",
        price: "$50",
        description: "Embrace traditional elegance with this luxurious silk saree. Perfect for weddings, parties, and festive occasions.",
        image: "images/p6.png"
    },
    7: {
        name: "Trendy Denim Jacket",
        price: "$50",
        description: "Add an edge to your outfit with this trendy denim jacket. A versatile piece that pairs well with any casual look.",
        image: "images/p7.png"
    },
    8: {
        name: "Modern Women's Blazer",
        price: "$50",
        description: "Stay stylish and professional with this modern women's blazer. Tailored for a sharp and confident look.",
        image: "images/p8.png"
    },
    9: {
        name: "Comfy Cotton Kurta",
        price: "$50",
        description: "A blend of tradition and comfort. This soft cotton kurta is perfect for both casual and festive occasions.",
        image: "images/p9.png"
    },
    10: {
        name: "Stylish Hooded Sweatshirt",
        price: "$50",
        description: "A cozy and stylish hoodie, perfect for chilly days. Features a soft fleece lining for extra warmth and comfort.",
        image: "images/p10.png"
    },
    11: {
        name: "Athletic Sports Tracksuit",
        price: "$50",
        description: "Stay active in style with this athletic tracksuit. Made with stretchable and breathable fabric for maximum performance.",
        image: "images/p11.png"
    },
    12: {
        name: "Elegant Party Gown",
        price: "$50",
        description: "Turn heads at any event with this elegant party gown. Designed with intricate details and a flowing silhouette.",
        image: "images/p12.png"
    }
};

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Load product details dynamically
if (products[productId]) {
    document.getElementById("productImage").src = products[productId].image;
    document.getElementById("productName").innerText = products[productId].name;
    document.getElementById("productPrice").innerText = products[productId].price;
    document.getElementById("productDescription").innerText = products[productId].description;
} else {
    document.body.innerHTML = "<h2>Product not found</h2><a href='index.html'>Back to Home</a>";
}
