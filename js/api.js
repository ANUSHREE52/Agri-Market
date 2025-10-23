/**
 * Agri-Market API Client
 * Handles all data operations using localStorage and JSON
 */

class AgriMarketAPI {
    constructor() {
        this.initializeStorage();
    }

    // Initialize storage with empty arrays if not exists
    initializeStorage() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('crops')) {
            localStorage.setItem('crops', JSON.stringify([]));
        }
        if (!localStorage.getItem('transactions')) {
            localStorage.setItem('transactions', JSON.stringify([]));
        }
    }

    // Get crop image based on crop name and category
    getCropImage(cropName, category) {
        const cropImages = {
            // Vegetables
            'tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80',
            'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
            'onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80',
            'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80',
            'beans': 'https://images.unsplash.com/photo-1607624628992-e83c4e5e2b8f?w=400&q=80',
            'cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&q=80',
            'cauliflower': 'https://images.unsplash.com/photo-1568584711271-61000e4d8b14?w=400&q=80',
            'brinjal': 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=400&q=80',
            'eggplant': 'https://images.unsplash.com/photo-1659261200833-ec8761558af7?w=400&q=80',
            'ladyfinger': 'https://images.unsplash.com/photo-1631708697818-8b2917d1c0f8?w=400&q=80',
            'okra': 'https://images.unsplash.com/photo-1631708697818-8b2917d1c0f8?w=400&q=80',
            'pumpkin': 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400&q=80',
            'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&q=80',
            'beetroot': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&q=80',
            'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80',
            
            // Fruits
            'mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80',
            'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80',
            'apple': 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healing_foods_slideshow/1800ss_getty_rf_apples.jpg?resize=750px:*&output-quality=75',
            'watermelon': 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&q=80',
            'orange': 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400&q=80',
            'grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80',
            'papaya': 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400&q=80',
            'guava': 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=400&q=80',
            'pomegranate': 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400&q=80',
            'strawberry': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80',
            
            // Grains & Cereals
            'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80',
            'rice': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_a2EsuSBF1V-B3dr6I-t3pDzcsdIpVu_vGw&s',
            'paddy': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM163TTrjUncLfJvRk4-13Iyu5KJBlJ4s38g&s',
            'corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
            'maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=80',
            'sugarcane': 'https://media.istockphoto.com/id/965303384/photo/the-sugar-cane.jpg?s=612x612&w=0&k=20&c=-nwpqHxhmDCaB9s8KfR15ZnMVbos6yQ39Yl0vzCOt2E=',
            'jowar': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4UMuriCVKD1eSLNlpelyFTEj_jw2nbGkFmw&s',
            'sorghum': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4UMuriCVKD1eSLNlpelyFTEj_jw2nbGkFmw&s',
            'ragi': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5AzVo-fJE2r5XAMgGfRfoGS2mukGwjkk-Q&s',
            'finger millet': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM5AzVo-fJE2r5XAMgGfRfoGS2mukGwjkk-Q&s',
            'millet': 'https://www.naario.com/cdn/shop/articles/Resized_Perspective_Millets-in-I_81d61461-2e06-42b4-be31-85da92a07caa.jpg?v=1754049909',
            'millets': 'https://www.naario.com/cdn/shop/articles/Resized_Perspective_Millets-in-I_81d61461-2e06-42b4-be31-85da92a07caa.jpg?v=1754049909',
            'bajra': 'https://images.unsplash.com/photo-1599909533730-f9d7a34f0e0d?w=400&q=80',
            'pearl millet': 'https://images.unsplash.com/photo-1599909533730-f9d7a34f0e0d?w=400&q=80',
            'barley': 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&q=80',
            
            // Pulses
            'chickpea': 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400&q=80',
            'lentil': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
            'moong': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
            'toor': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
            'urad': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
            'masoor': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
            
            // Spices
            'turmeric': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80',
            'chilli': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80',
            'pepper': 'https://images.unsplash.com/photo-1607965448365-78b5c8c8b8c8?w=400&q=80',
            'ginger': 'https://images.unsplash.com/photo-1599909533730-f9d7a34f0e0d?w=400&q=80',
            'garlic': 'https://images.unsplash.com/photo-1588184344470-7e162c1e6f66?w=400&q=80',
            'coriander': 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?w=400&q=80',
            'cumin': 'https://images.unsplash.com/photo-1596040033229-a0b3b83d6e0c?w=400&q=80',
        };

        // Try to find exact match
        const lowerCropName = cropName.toLowerCase();
        if (cropImages[lowerCropName]) {
            return cropImages[lowerCropName];
        }

        // Try partial match
        for (const key in cropImages) {
            if (lowerCropName.includes(key) || key.includes(lowerCropName)) {
                return cropImages[key];
            }
        }

        // Return default based on category
        const categoryDefaults = {
            'Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
            'Fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400',
            'Grains': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
            'Pulses': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
            'Spices': 'https://images.unsplash.com/photo-1596040033229-a0b3b83d6e0c?w=400',
            'Others': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400'
        };

        return categoryDefaults[category] || categoryDefaults['Others'];
    }

    // Generate unique ID
    generateId(prefix, data) {
        const count = data.length + 1;
        return `${prefix}${String(count).padStart(4, '0')}`;
    }

    // USER OPERATIONS
    async registerUser(userData) {
        try {
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Check if phone number exists
            if (users.some(u => u.phone === userData.phone)) {
                throw new Error('Mobile number already registered');
            }

            // Generate user ID
            const prefix = userData.user_type.charAt(0).toUpperCase();
            const userCount = users.filter(u => u.user_type === userData.user_type).length + 1;
            const user_id = `${prefix}${String(userCount).padStart(3, '0')}`;

            const newUser = {
                id: this.generateId('U', users),
                user_id: user_id,
                ...userData,
                password: btoa(userData.password), // Simple encoding (use proper hashing in production)
                created_at: new Date().toISOString(),
                is_verified: false,
                profile_image: 'assets/images/default-avatar.png'
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            return { success: true, message: 'Registration successful', user: newUser };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async loginUser(phone, password) {
        try {
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.phone === phone);

            if (!user) {
                throw new Error('Mobile number not registered');
            }

            if (atob(user.password) !== password) {
                throw new Error('Invalid password');
            }

            // Store session
            const session = {
                id: user.id,
                user_id: user.user_id,
                full_name: user.full_name,
                user_type: user.user_type,
                phone: user.phone,
                city: user.city,
                address: user.address,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(session));
            
            return { success: true, message: 'Login successful', user: session };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    logout() {
        localStorage.removeItem('currentUser');
        return { success: true, message: 'Logged out successfully' };
    }

    async getUserById(user_id) {
        const users = JSON.parse(localStorage.getItem('users'));
        return users.find(u => u.user_id === user_id);
    }

    async resetPassword(phone, fullName, newPassword) {
        try {
            const users = JSON.parse(localStorage.getItem('users'));
            const userIndex = users.findIndex(u => u.phone === phone);

            if (userIndex === -1) {
                throw new Error('Mobile number not registered');
            }

            // Verify full name matches (case insensitive)
            if (users[userIndex].full_name.toLowerCase() !== fullName.toLowerCase()) {
                throw new Error('Full name does not match our records');
            }

            // Update password
            users[userIndex].password = btoa(newPassword);
            localStorage.setItem('users', JSON.stringify(users));

            return { success: true, message: 'Password reset successful' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // CROP OPERATIONS
    async addCrop(cropData) {
        try {
            const crops = JSON.parse(localStorage.getItem('crops'));
            
            const newCrop = {
                id: this.generateId('C', crops),
                crop_id: this.generateId('CR', crops),
                ...cropData,
                is_available: true,
                created_at: new Date().toISOString()
            };

            crops.push(newCrop);
            localStorage.setItem('crops', JSON.stringify(crops));
            
            return { success: true, message: 'Crop added successfully', crop: newCrop };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getAllCrops() {
        const crops = JSON.parse(localStorage.getItem('crops'));
        const users = JSON.parse(localStorage.getItem('users'));
        
        // Filter available crops with quantity > 0
        const availableCrops = crops.filter(c => c.is_available && c.quantity_available > 0);
        
        // Add farmer details
        return availableCrops.map(crop => {
            const farmer = users.find(u => u.user_id === crop.farmer_id);
            return {
                ...crop,
                farmer_name: farmer?.full_name || 'Unknown',
                farmer_phone: farmer?.phone || '',
                farmer_city: farmer?.city || ''
            };
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    async getCropsByFarmer(farmer_id) {
        const crops = JSON.parse(localStorage.getItem('crops'));
        return crops
            .filter(c => c.farmer_id === farmer_id)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    async getCropById(crop_id) {
        const crops = JSON.parse(localStorage.getItem('crops'));
        const users = JSON.parse(localStorage.getItem('users'));
        
        const crop = crops.find(c => c.crop_id === crop_id);
        if (crop) {
            const farmer = users.find(u => u.user_id === crop.farmer_id);
            return {
                ...crop,
                farmer_name: farmer?.full_name || 'Unknown',
                farmer_phone: farmer?.phone || '',
                farmer_email: farmer?.email || '',
                farmer_city: farmer?.city || '',
                farmer_address: farmer?.address || ''
            };
        }
        return null;
    }

    async updateCrop(crop_id, updates) {
        try {
            const crops = JSON.parse(localStorage.getItem('crops'));
            const index = crops.findIndex(c => c.crop_id === crop_id);
            
            if (index === -1) {
                throw new Error('Crop not found');
            }

            crops[index] = { ...crops[index], ...updates, updated_at: new Date().toISOString() };
            localStorage.setItem('crops', JSON.stringify(crops));
            
            return { success: true, message: 'Crop updated successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async deleteCrop(crop_id) {
        try {
            const crops = JSON.parse(localStorage.getItem('crops'));
            const filtered = crops.filter(c => c.crop_id !== crop_id);
            
            localStorage.setItem('crops', JSON.stringify(filtered));
            
            return { success: true, message: 'Crop deleted successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async searchCrops(query) {
        const allCrops = await this.getAllCrops();
        return allCrops.filter(crop => 
            crop.crop_name.toLowerCase().includes(query.toLowerCase()) ||
            crop.category.toLowerCase().includes(query.toLowerCase())
        );
    }

    // TRANSACTION OPERATIONS
    async createTransaction(transactionData) {
        try {
            const transactions = JSON.parse(localStorage.getItem('transactions'));
            
            const newTransaction = {
                id: this.generateId('T', transactions),
                transaction_id: this.generateId('TXN', transactions),
                ...transactionData,
                status: 'pending',
                transaction_date: new Date().toISOString()
            };

            transactions.push(newTransaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));

            // Update crop quantity
            await this.updateCrop(transactionData.crop_id, {
                quantity_available: transactionData.new_quantity
            });
            
            return { success: true, message: 'Order placed successfully', transaction: newTransaction };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async getTransactionsByFarmer(farmer_id) {
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        const crops = JSON.parse(localStorage.getItem('crops'));
        const users = JSON.parse(localStorage.getItem('users'));
        
        return transactions
            .filter(t => t.farmer_id === farmer_id)
            .map(transaction => {
                const crop = crops.find(c => c.crop_id === transaction.crop_id);
                const buyer = users.find(u => u.user_id === transaction.buyer_id);
                return {
                    ...transaction,
                    crop_name: crop?.crop_name || 'Unknown',
                    buyer_name: buyer?.full_name || 'Unknown',
                    buyer_type: buyer?.user_type || 'Unknown'
                };
            })
            .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
    }

    async getTransactionsByBuyer(buyer_id) {
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        const crops = JSON.parse(localStorage.getItem('crops'));
        const users = JSON.parse(localStorage.getItem('users'));
        
        return transactions
            .filter(t => t.buyer_id === buyer_id)
            .map(transaction => {
                const crop = crops.find(c => c.crop_id === transaction.crop_id);
                const farmer = users.find(u => u.user_id === transaction.farmer_id);
                return {
                    ...transaction,
                    crop_name: crop?.crop_name || 'Unknown',
                    farmer_name: farmer?.full_name || 'Unknown'
                };
            })
            .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date));
    }

    async updateTransactionStatus(transaction_id, status) {
        try {
            const transactions = JSON.parse(localStorage.getItem('transactions'));
            const index = transactions.findIndex(t => t.transaction_id === transaction_id);
            
            if (index === -1) {
                throw new Error('Transaction not found');
            }

            transactions[index].status = status;
            transactions[index].updated_at = new Date().toISOString();
            
            localStorage.setItem('transactions', JSON.stringify(transactions));
            
            return { success: true, message: 'Transaction status updated successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // STATISTICS
    async getStatistics(user_id, user_type) {
        const crops = JSON.parse(localStorage.getItem('crops'));
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        
        if (user_type === 'farmer') {
            const myCrops = crops.filter(c => c.farmer_id === user_id);
            const myTransactions = transactions.filter(t => t.farmer_id === user_id);
            const totalRevenue = myTransactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
            
            return {
                total_crops: myCrops.length,
                active_crops: myCrops.filter(c => c.is_available && c.quantity_available > 0).length,
                total_sales: myTransactions.length,
                total_revenue: totalRevenue
            };
        } else {
            const myTransactions = transactions.filter(t => t.buyer_id === user_id);
            const totalSpent = myTransactions.reduce((sum, t) => sum + (t.total_amount || 0), 0);
            
            return {
                total_orders: myTransactions.length,
                pending_orders: myTransactions.filter(t => t.status === 'pending').length,
                completed_orders: myTransactions.filter(t => t.status === 'completed').length,
                total_spent: totalSpent
            };
        }
    }
}

// Create global API instance
const api = new AgriMarketAPI();
