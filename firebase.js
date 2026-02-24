
// Firebase Configuration for Alreem Paints
// Initialize Firebase with Firestore

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDbyNAkYlvzaTUdbzCET5jofSM1DvXWZH0",
  authDomain: "alreem-10295.firebaseapp.com",
  projectId: "alreem-10295",
  storageBucket: "alreem-10295.firebasestorage.app",
  messagingSenderId: "666732074356",
  appId: "1:666732074356:web:687b46985b0df6af304821",
  measurementId: "G-GNMDQ4FQDF"
};

// Firebase App Instance
let firebaseApp = null;
let db = null;

// Initialize Firebase
async function initFirebase() {
    try {
        // Check if firebase is loaded
        if (typeof firebase !== 'undefined') {
            // Initialize Firebase app if not already initialized
            if (!firebase.apps.length) {
                firebaseApp = firebase.initializeApp(firebaseConfig);
            } else {
                firebaseApp = firebase.apps[0];
            }
            
            // Initialize Firestore
            db = firebase.firestore();
            
            // Enable offline persistence
            if (db) {
                await db.enablePersistence({ synchronizeTabs: true }).catch(err => {
                    console.log('Persistence not available:', err.code);
                });
            }
            
            // Initialize Analytics
            if (firebase.analytics) {
                const analytics = firebase.analytics();
                analytics.logEvent('page_view');
            }
            
            console.log('Firebase & Firestore initialized successfully');
            return { app: firebaseApp, db: db };
        } else {
            console.log('Firebase SDK not loaded - falling back to localStorage');
            return null;
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        return null;
    }
}

// Load Firebase SDK
function loadFirebaseSDK() {
    // Load Firebase and Firestore scripts dynamically
    const scripts = [
        'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
        'https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js',
        'https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js'
    ];
    
    let loadedCount = 0;
    
    scripts.forEach(src => {
        // Check if script already loaded
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
            loadedCount++;
            if (loadedCount === scripts.length) {
                initFirebase();
            }
            return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loadedCount++;
            if (loadedCount === scripts.length) {
                initFirebase();
            }
        };
        script.onerror = () => {
            loadedCount++;
            console.error('Failed to load:', src);
            if (loadedCount === scripts.length) {
                initFirebase();
            }
        };
        document.head.appendChild(script);
    });
}

// ==================== Firestore Database Functions ====================

// Get all products from Firestore
async function getProductsFromFirestore() {
    if (!db) return null;
    
    try {
        const snapshot = await db.collection('products').get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('Error getting products:', error);
        return null;
    }
}

// Get products by category from Firestore
async function getProductsByCategoryFromFirestore(category) {
    if (!db) return null;
    
    try {
        const snapshot = await db.collection('products')
            .where('category', '==', category)
            .get();
        const products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (error) {
        console.error('Error getting products by category:', error);
        return null;
    }
}

// Add product to Firestore
async function addProductToFirestore(product) {
    if (!db) return null;
    
    try {
        const docRef = await db.collection('products').add({
            ...product,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Product added with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding product:', error);
        return null;
    }
}

// Update product in Firestore
async function updateProductInFirestore(productId, updates) {
    if (!db) return null;
    
    try {
        await db.collection('products').doc(productId).update({
            ...updates,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Product updated:', productId);
        return true;
    } catch (error) {
        console.error('Error updating product:', error);
        return false;
    }
}

// Delete product from Firestore
async function deleteProductFromFirestore(productId) {
    if (!db) return null;
    
    try {
        await db.collection('products').doc(productId).delete();
        console.log('Product deleted:', productId);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}

// Initialize default products in Firestore (only if empty)
async function initializeDefaultProducts() {
    if (!db) return false;
    
    try {
        const snapshot = await db.collection('products').get();
        
        if (snapshot.empty) {
            console.log('Firestore is empty, adding default products...');
            
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
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
                    bestSeller: true
                }
            ];

            // Add all products in batch
            const batch = db.batch();
            defaultProducts.forEach(product => {
                const docRef = db.collection('products').doc(product.id);
                batch.set(docRef, product);
            });
            
            await batch.commit();
            console.log('Default products added to Firestore');
            return true;
        }
        
        return false; // Firestore already has products
    } catch (error) {
        console.error('Error initializing default products:', error);
        return false;
    }
}

// Check if using Firebase
function isUsingFirebase() {
    return db !== null;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFirebaseSDK);
} else {
    loadFirebaseSDK();
}

