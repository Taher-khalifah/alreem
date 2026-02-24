
// Products Data Management System
// Uses localStorage as primary storage (with Firebase sync as option)

const STORAGE_KEY = 'alreem_products';

// Initialize default products if empty or corrupted
function initData() {
    try {
        const existingData = localStorage.getItem(STORAGE_KEY);
        
        // Check if data is corrupted or invalid
        let products = [];
        if (existingData) {
            try {
                products = JSON.parse(existingData);
                // Verify it's an array
                if (!Array.isArray(products)) {
                    console.log('Data is corrupted, resetting...');
                    products = [];
                }
            } catch (e) {
                console.log('JSON parse error, resetting data:', e.message);
                products = [];
            }
        }
        
        if (products.length === 0) {
            // Load default products
            const defaultProducts = [
                // Water Paints
                {
                    id: 'water-1',
                    nameAr: 'بيانكو مَت',
                    nameEn: 'Bianco Matt',
                    category: 'water',
                    description: 'دهان مائي عالي الجودة بمظهر مطفي',
                    price: 45,
                    discount: 0,
                    quantity: 100,
                    minStock: 10,
                    color: 'blue',
                    icon: 'fa-tint',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'water-2',
                    nameAr: 'فلورا مت',
                    nameEn: 'Flora Matt',
                    category: 'water',
                    description: 'دهان مائي صديق للبيئة',
                    price: 55,
                    discount: 10,
                    quantity: 80,
                    minStock: 10,
                    color: 'green',
                    icon: 'fa-leaf',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'water-3',
                    nameAr: 'ألترا مَت إملشن',
                    nameEn: 'Ultra Matt Emulsion',
                    category: 'water',
                    description: 'دهان مائي فائق الجودة',
                    price: 65,
                    discount: 0,
                    quantity: 60,
                    minStock: 5,
                    color: 'gray',
                    icon: 'fa-star',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                // Decorative Paints
                {
                    id: 'decorative-1',
                    nameAr: 'لازورد',
                    nameEn: 'Lazaward',
                    category: 'decorative',
                    description: 'دهان ديكوري بلمسات فاخرة',
                    price: 120,
                    discount: 15,
                    quantity: 40,
                    minStock: 5,
                    color: 'indigo',
                    icon: 'fa-gem',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'decorative-2',
                    nameAr: 'جالاكسي',
                    nameEn: 'Galaxy',
                    category: 'decorative',
                    description: 'دهان ديكوري بمظهر كوني',
                    price: 150,
                    discount: 0,
                    quantity: 30,
                    minStock: 5,
                    color: 'pink',
                    icon: 'fa-star',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'decorative-3',
                    nameAr: 'كونكريتا',
                    nameEn: 'Concreta',
                    category: 'decorative',
                    description: 'دهان بمظهر خرساني',
                    price: 95,
                    discount: 0,
                    quantity: 50,
                    minStock: 8,
                    color: 'gray',
                    icon: 'fa-cube',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'decorative-4',
                    nameAr: 'ستوكو',
                    nameEn: 'Stucco',
                    category: 'decorative',
                    description: 'دهان ديكوري إيطالي',
                    price: 110,
                    discount: 5,
                    quantity: 35,
                    minStock: 5,
                    color: 'stone',
                    icon: 'fa-layer-group',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                // Floor Paints
                {
                    id: 'floor-1',
                    nameAr: 'إيبوكسي ميتاليك',
                    nameEn: 'Metallic Epoxy',
                    category: 'floor',
                    description: 'دهان إيبوكسي معدني للأرضيات',
                    price: 200,
                    discount: 0,
                    quantity: 25,
                    minStock: 3,
                    color: 'purple',
                    icon: 'fa-star',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'floor-2',
                    nameAr: 'إيبوكسي سيلر',
                    nameEn: 'Epoxy Sealer',
                    category: 'floor',
                    description: 'سيلر إيبوكسي للحماية',
                    price: 85,
                    discount: 0,
                    quantity: 45,
                    minStock: 5,
                    color: 'cyan',
                    icon: 'fa-shield-alt',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'floor-3',
                    nameAr: 'بولي كريت',
                    nameEn: 'Polycrete',
                    category: 'floor',
                    description: 'دهان بولي يوريثان للأرضيات',
                    price: 175,
                    discount: 10,
                    quantity: 20,
                    minStock: 3,
                    color: 'indigo',
                    icon: 'fa-cube',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                // Oil Paints
                {
                    id: 'oil-1',
                    nameAr: 'زيتي نصف لمعة',
                    nameEn: 'Semi-Gloss Oil Paint',
                    category: 'oil',
                    description: 'دهان زيتي بنصف لمعة لمظهر أنيق',
                    price: 85,
                    discount: 0,
                    quantity: 50,
                    minStock: 5,
                    color: 'yellow',
                    icon: 'fa-paint-brush',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'oil-2',
                    nameAr: 'زيتي مطفي',
                    nameEn: 'Matt Oil Paint',
                    category: 'oil',
                    description: 'دهان زيتي بمظهر مطفي أنيق',
                    price: 75,
                    discount: 0,
                    quantity: 45,
                    minStock: 5,
                    color: 'gray',
                    icon: 'fa-paint-roller',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'oil-3',
                    nameAr: 'زيتي لماع',
                    nameEn: 'Gloss Oil Paint',
                    category: 'oil',
                    description: 'دهان زيتي عالي اللمعان',
                    price: 95,
                    discount: 5,
                    quantity: 40,
                    minStock: 5,
                    color: 'amber',
                    icon: 'fa-gem',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'oil-4',
                    nameAr: 'ساتين وود',
                    nameEn: 'Satin Wood',
                    category: 'oil',
                    description: 'دهان خشبي ساتين للمظهر النهائي',
                    price: 110,
                    discount: 0,
                    quantity: 35,
                    minStock: 3,
                    color: 'orange',
                    icon: 'fa-tree',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
            console.log('Default products loaded:', defaultProducts.length);
        }
    } catch (e) {
        console.error('Error initializing data:', e);
        // Force reset on error
        localStorage.removeItem(STORAGE_KEY);
    }
}

// Function to reset/fix corrupted data
function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    initData();
    console.log('Data has been reset to defaults');
    alert('تم إعادة تعيين البيانات بنجاح!');
    location.reload();
}

// Ensure oil products exist
function ensureOilProducts() {
    try {
        const existingProducts = JSON.parse(localStorage.getItem(STORAGE_KEY));
        const hasOilProducts = existingProducts.some(p => p.category === 'oil');
        
        if (!hasOilProducts) {
            const oilProducts = [
                {
                    id: 'oil-1',
                    nameAr: 'زيتي نصف لمعة',
                    nameEn: 'Semi-Gloss Oil Paint',
                    category: 'oil',
                    description: 'دهان زيتي بنصف لمعة لمظهر أنيق',
                    price: 85,
                    discount: 0,
                    quantity: 50,
                    minStock: 5,
                    color: 'yellow',
                    icon: 'fa-paint-brush',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'oil-2',
                    nameAr: 'زيتي مطفي',
                    nameEn: 'Matt Oil Paint',
                    category: 'oil',
                    description: 'دهان زيتي بمظهر مطفي أنيق',
                    price: 75,
                    discount: 0,
                    quantity: 45,
                    minStock: 5,
                    color: 'gray',
                    icon: 'fa-paint-roller',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'oil-3',
                    nameAr: 'زيتي لماع',
                    nameEn: 'Gloss Oil Paint',
                    category: 'oil',
                    description: 'دهان زيتي عالي اللمعان',
                    price: 95,
                    discount: 5,
                    quantity: 40,
                    minStock: 5,
                    color: 'amber',
                    icon: 'fa-gem',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'oil-4',
                    nameAr: 'ساتين وود',
                    nameEn: 'Satin Wood',
                    category: 'oil',
                    description: 'دهان خشبي ساتين للمظهر النهائي',
                    price: 110,
                    discount: 0,
                    quantity: 35,
                    minStock: 3,
                    color: 'orange',
                    icon: 'fa-tree',
                    bestSeller: true,
                    createdAt: new Date().toISOString()
                }
            ];
            existingProducts.push(...oilProducts);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(existingProducts));
            console.log('Oil products added:', oilProducts.length);
        }
    } catch (e) {
        console.error('Error ensuring oil products:', e);
    }
}

// Get all products from localStorage
function getProducts() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const products = data ? JSON.parse(data) : [];
        console.log('Loaded products:', products.length);
        return products;
    } catch (e) {
        console.error('Error getting products:', e);
        return [];
    }
}

// Get products by category
function getProductsByCategory(category) {
    return getProducts().filter(p => p.category === category);
}

// Get best sellers
function getBestSellers() {
    return getProducts().filter(p => p.bestSeller);
}

// Get product by ID
function getProductById(id) {
    return getProducts().find(p => p.id === id);
}

// Add new product
function addProduct(product) {
    const products = getProducts();
    product.id = product.id || 'prod-' + Date.now();
    product.createdAt = new Date().toISOString();
    products.push(product);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    console.log('Product added:', product.nameAr);
    return product;
}

// Update product
function updateProduct(id, updates) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        console.log('Product updated:', products[index].nameAr);
        return products[index];
    }
    return null;
}

// Delete product
function deleteProduct(id) {
    try {
        const products = getProducts();
        const initialLength = products.length;
        const filtered = products.filter(p => p.id !== id);
        
        if (filtered.length === initialLength) {
            console.log('Product not found:', id);
            return false;
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        console.log('Product deleted:', id, 'Remaining:', filtered.length);
        return true;
    } catch (e) {
        console.error('Error deleting product:', e);
        return false;
    }
}

// Update stock quantity
function updateStock(id, quantity) {
    return updateProduct(id, { quantity });
}

// Apply discount
function applyDiscount(id, discountPercent) {
    return updateProduct(id, { discount: discountPercent });
}

// Get category name in Arabic
function getCategoryName(category) {
    const names = {
        'water': 'دهانات مائية',
        'decorative': 'دهانات ديكورية',
        'floor': 'دهانات أرضيات',
        'interior': 'دهانات داخلية',
        'exterior': 'دهانات خارجية',
        'industrial': 'دهانات صناعية',
        'oil': 'دهانات زيتية'
    };
    return names[category] || category;
}

// Get color class
function getColorClass(color) {
    const colors = {
        'blue': 'bg-blue-500',
        'purple': 'bg-purple-500',
        'green': 'bg-green-500',
        'red': 'bg-red-500',
        'yellow': 'bg-yellow-500',
        'gray': 'bg-gray-500',
        'indigo': 'bg-indigo-500',
        'pink': 'bg-pink-500',
        'cyan': 'bg-cyan-500',
        'orange': 'bg-orange-500',
        'stone': 'bg-stone-500',
        'amber': 'bg-amber-500'
    };
    return colors[color] || 'bg-blue-500';
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initData,
        getProducts,
        getProductsByCategory,
        getBestSellers,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        applyDiscount,
        getCategoryName,
        getColorClass
    };
}

