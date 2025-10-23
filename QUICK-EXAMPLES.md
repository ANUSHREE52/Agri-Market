# 🚀 QUICK EXAMPLES - API & UTILS IN ACTION

## 📝 PRACTICAL CODE EXAMPLES

### Example 1: User Registration Flow

```javascript
// User fills form and clicks Register
async function handleRegister(event) {
    event.preventDefault();
    
    const userData = {
        full_name: document.getElementById('regFullName').value,
        phone: document.getElementById('regPhone').value,
        password: document.getElementById('regPassword').value,
        user_type: document.getElementById('regUserType').value,
        city: document.getElementById('regCity').value,
        state: document.getElementById('regState').value,
        address: document.getElementById('regAddress').value
    };
    
    // Validate phone
    if (!isValidPhone(userData.phone)) {
        showToast('Invalid mobile number', 'error');
        return;
    }
    
    // Call API
    const result = await api.registerUser(userData);
    
    if (result.success) {
        showToast('Registration successful!', 'success');
        // Auto-login
        const loginResult = await api.loginUser(userData.phone, userData.password);
        if (loginResult.success) {
            window.location.href = `dashboard/${loginResult.user.user_type}-dashboard.html`;
        }
    } else {
        showToast(result.message, 'error');
    }
}
```

### Example 2: Farmer Adds Crop

```javascript
async function handleAddCrop(event) {
    event.preventDefault();
    
    const currentUser = getCurrentUser();
    
    const cropData = {
        farmer_id: currentUser.user_id,
        crop_name: document.getElementById('cropName').value,
        category: document.getElementById('cropCategory').value,
        quantity_available: parseInt(document.getElementById('cropQuantity').value),
        unit: document.getElementById('cropUnit').value,
        price_per_unit: parseFloat(document.getElementById('cropPrice').value),
        harvest_date: document.getElementById('cropHarvestDate').value,
        location: document.getElementById('cropLocation').value,
        description: document.getElementById('cropDescription').value,
        is_organic: document.getElementById('cropOrganic').checked
    };
    
    // Validate minimum quantity
    if (cropData.unit === 'kg' && cropData.quantity_available < 100) {
        showToast('Minimum quantity is 100 kg', 'error');
        return;
    }
    
    // Get crop image
    cropData.crop_image = api.getCropImage(cropData.crop_name, cropData.category);
    
    const result = await api.addCrop(cropData);
    
    if (result.success) {
        showToast('Crop added successfully!', 'success');
        closeModal('addCropModal');
        loadMyCrops();
    }
}
```

### Example 3: Buyer Places Order

```javascript
async function handlePlaceOrder(event, crop) {
    event.preventDefault();
    
    const currentUser = getCurrentUser();
    const quantity = parseInt(document.getElementById('orderQuantity').value);
    
    // Validate quantity
    if (quantity > crop.quantity_available) {
        showToast('Quantity not available', 'error');
        return;
    }
    
    if (quantity < 100) {
        showToast('Minimum order is 100 kg', 'error');
        return;
    }
    
    const transactionData = {
        crop_id: crop.crop_id,
        farmer_id: crop.farmer_id,
        buyer_id: currentUser.user_id,
        quantity_ordered: quantity,
        new_quantity: crop.quantity_available - quantity,
        price_per_unit: crop.price_per_unit,
        total_amount: quantity * crop.price_per_unit,
        delivery_address: document.getElementById('deliveryAddress').value,
        notes: document.getElementById('orderNotes').value
    };
    
    const result = await api.createTransaction(transactionData);
    
    if (result.success) {
        showToast('Order placed successfully!', 'success');
        closeModal('orderModal');
        loadCrops();
    }
}
```

### Example 4: Load Dashboard Statistics

```javascript
async function loadDashboard() {
    const currentUser = getCurrentUser();
    
    // Display user name
    document.getElementById('farmerName').textContent = currentUser.full_name;
    
    // Load statistics
    const stats = await api.getStatistics(currentUser.user_id, currentUser.user_type);
    
    if (currentUser.user_type === 'farmer') {
        document.getElementById('totalCrops').textContent = stats.total_crops;
        document.getElementById('activeCrops').textContent = stats.active_crops;
        document.getElementById('totalSales').textContent = stats.total_sales;
        document.getElementById('totalRevenue').textContent = formatCurrency(stats.total_revenue);
    } else {
        document.getElementById('totalOrders').textContent = stats.total_orders;
        document.getElementById('pendingOrders').textContent = stats.pending_orders;
        document.getElementById('completedOrders').textContent = stats.completed_orders;
        document.getElementById('totalSpent').textContent = formatCurrency(stats.total_spent);
    }
    
    // Load crops/orders
    await loadMyCrops();
    await loadTransactions();
}
```

### Example 5: Search with Debounce

```javascript
// Create debounced search function
const debouncedSearch = debounce(async function() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (query === '') {
        displayCrops(allCrops);
    } else {
        const filtered = allCrops.filter(crop => 
            crop.crop_name.toLowerCase().includes(query) ||
            crop.category.toLowerCase().includes(query) ||
            crop.farmer_city.toLowerCase().includes(query)
        );
        displayCrops(filtered);
    }
}, 300);

// Attach to input
document.getElementById('searchInput').addEventListener('keyup', debouncedSearch);
```

## 🎯 KEY TAKEAWAYS

### localStorage Operations
```javascript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Read
const data = JSON.parse(localStorage.getItem('key'));

// Delete
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

### Array Methods
```javascript
// filter - Select matching items
const farmers = users.filter(u => u.user_type === 'farmer');

// map - Transform items
const names = users.map(u => u.full_name);

// find - Get first match
const user = users.find(u => u.phone === '9876543210');

// some - Check if any match
const exists = users.some(u => u.phone === '9876543210');

// reduce - Aggregate values
const total = transactions.reduce((sum, t) => sum + t.total_amount, 0);

// sort - Order items
crops.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
```

### Async/Await Pattern
```javascript
async function loadData() {
    try {
        const result = await api.someMethod();
        if (result.success) {
            // Handle success
        } else {
            // Handle error
        }
    } catch (error) {
        console.error(error);
    }
}
```

## 📚 INTERVIEW TIPS

1. **Explain localStorage**: "Browser storage API that persists data as JSON strings"
2. **Explain async/await**: "Modern way to handle asynchronous operations, makes code readable"
3. **Explain validation**: "Check data before processing to prevent errors"
4. **Explain formatting**: "Convert raw data to user-friendly format"
5. **Explain debounce**: "Performance optimization to limit function calls"

**Good luck! 🌟**
