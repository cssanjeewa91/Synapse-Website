// Main JS for Synapse Solution

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple Admin Auth Simulation (for demo)
    // Simplified Admin Auth
    const adminLink = document.getElementById('admin-link');
    if (adminLink && !window.location.pathname.includes('admin.html')) {
        adminLink.addEventListener('click', (e) => {
            const pass = prompt('Enter Admin Password:');
            if (pass !== 'admin123') {
                e.preventDefault();
                alert('Access Denied!');
            }
        });
    }

    // Add To Cart Animation
    const cartBtns = document.querySelectorAll('.add-to-cart-btn');
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check mr-2"></i> Added!';
            this.classList.add('bg-green-600');

            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('bg-green-600');
            }, 2000);
        });
    });
});

// Product Management Logic (Local Storage)
const ProductManager = {
    getProducts: () => JSON.parse(localStorage.getItem('synapse_products') || '[]'),

    saveProduct: (product) => {
        let products = ProductManager.getProducts();
        products.push({ ...product, id: Date.now() });
        localStorage.setItem('synapse_products', JSON.stringify(products));
    },

    deleteProduct: (id) => {
        let products = ProductManager.getProducts().filter(p => p.id !== id);
        localStorage.setItem('synapse_products', JSON.stringify(products));
    },

    initProductsPage: () => {
        const container = document.getElementById('products-grid');
        if (!container) return;

        const allProducts = ProductManager.getProducts();
        if (allProducts.length === 0) {
            // Optional: Initial seed data if empty
            const seed = [
                { id: 1, name: "MacBook Air M3", category: "Laptops", price: "1099", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500" },
                { id: 2, name: "Sony WF-1000XM5", category: "Audio", price: "299", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=500" },
                { id: 3, name: "Asus RT-AX88U Pro", category: "Networking", price: "349", image: "https://images.unsplash.com/photo-1614624532983-4ce03362f6c3?q=80&w=500" }
            ];
            localStorage.setItem('synapse_products', JSON.stringify(seed));
            return ProductManager.initProductsPage();
        }

        container.innerHTML = allProducts.map(p => `
            <div class="glass p-4 rounded-3xl group">
                <div class="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                    <img src="${p.image || 'https://images.unsplash.com/photo-1555617766-c94804975da3?w=500'}" class="w-full h-full object-cover group-hover:scale-110 transition-all">
                </div>
                <p class="text-[10px] font-bold text-blue-500 uppercase">${p.category}</p>
                <h3 class="font-bold mb-2">${p.name}</h3>
                <p class="text-xs text-gray-500 mb-4 line-clamp-2">${p.desc || 'No description available.'}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xl font-bold font-mono">$${p.price}</span>
                    <button class="add-to-cart-btn w-10 h-10 bg-white/5 rounded-xl hover:bg-blue-600 transition-colors"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `).join('');

        // Re-attach cart listeners for new elements
        const cartBtns = document.querySelectorAll('.add-to-cart-btn');
        cartBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('bg-green-600');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-plus"></i>';
                    this.classList.remove('bg-green-600');
                }, 1500);
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            const pass = prompt('Enter Admin Password:');
            if (pass !== 'admin123') { e.preventDefault(); alert('Access Denied!'); }
        });
    }

    ProductManager.initProductsPage();
});
