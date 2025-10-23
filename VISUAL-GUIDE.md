# 🎨 VISUAL GUIDE - UNDERSTANDING THE FLOW

## 🗺️ COMPLETE USER JOURNEY

### Journey 1: Farmer Registration to Crop Sale

```
┌─────────────────────────────────────────────────────────────────┐
│                    FARMER'S JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘

Step 1: REGISTRATION
┌──────────────┐
│ index.html   │  Farmer clicks "Register"
│              │  ↓
│ [Register]   │  Fills form:
│   Form       │  - Name: Ravi Kumar
│              │  - Phone: 9876543210
│              │  - Type: Farmer
└──────┬───────┘
       │
       ↓ api.registerUser()
┌──────────────┐
│ localStorage │  users: [{
│              │    user_id: "F001",
│  [users]     │    full_name: "Ravi Kumar",
│              │    password: "cmF2aTEyMw=="
│              │  }]
└──────────────┘

Step 2: LOGIN
┌──────────────┐
│ index.html   │  Farmer enters credentials
│              │  ↓
│ [Login]      │  Phone: 9876543210
│   Form       │  Password: ravi123
└──────┬───────┘
       │
       ↓ api.loginUser()
┌──────────────┐
│ localStorage │  currentUser: {
│              │    user_id: "F001",
│ [currentUser]│    user_type: "farmer"
│              │  }
└──────┬───────┘
       │
       ↓ Redirect
┌──────────────────────┐
│ farmer-dashboard.html│
│                      │
│ Welcome, Ravi Kumar! │
│ Total Crops: 0       │
│ Revenue: ₹0          │
└──────────────────────┘

Step 3: ADD CROP
┌──────────────────────┐
│ farmer-dashboard.html│
│                      │
│ [Add New Crop] ←─────┼─── Farmer clicks
└──────┬───────────────┘
       │
       ↓ Modal opens
┌──────────────────────┐
│  Add Crop Form       │
│                      │
│  Crop: Tomato        │
│  Quantity: 500 kg    │
│  Price: ₹30/kg       │
│  [Submit]            │
└──────┬───────────────┘
       │
       ↓ api.addCrop()
┌──────────────┐
│ localStorage │  crops: [{
│              │    crop_id: "CR0001",
│  [crops]     │    farmer_id: "F001",
│              │    crop_name: "Tomato",
│              │    quantity: 500,
│              │    price: 30
│              │  }]
└──────┬───────┘
       │
       ↓ Refresh dashboard
┌──────────────────────┐
│ farmer-dashboard.html│
│                      │
│ Total Crops: 1       │
│ Active Crops: 1      │
│                      │
│ ┌────────────────┐   │
│ │ Tomato         │   │
│ │ 500 kg @ ₹30   │   │
│ │ [Delete]       │   │
│ └────────────────┘   │
└──────────────────────┘

Step 4: BUYER PLACES ORDER
┌──────────────────────┐
│ marketplace.html     │
│                      │
│ ┌────────────────┐   │
│ │ Tomato         │   │
│ │ ₹30/kg         │   │
│ │ Available: 500 │   │
│ │ [View Details] │←──┼─── Buyer clicks
│ └────────────────┘   │
└──────┬───────────────┘
       │
       ↓ Modal opens
┌──────────────────────┐
│  Order Form          │
│                      │
│  Quantity: 200 kg    │
│  Total: ₹6,000       │
│  [Place Order]       │
└──────┬───────────────┘
       │
       ↓ api.createTransaction()
┌──────────────┐
│ localStorage │  transactions: [{
│              │    transaction_id: "TXN0001",
│[transactions]│    farmer_id: "F001",
│              │    buyer_id: "W001",
│              │    quantity: 200,
│              │    amount: 6000
│              │  }]
│              │
│  [crops]     │  crops[0].quantity = 300 ← Updated!
└──────┬───────┘
       │
       ↓ Farmer sees notification
┌──────────────────────┐
│ farmer-dashboard.html│
│                      │
│ Purchase Requests:   │
│ ┌────────────────┐   │
│ │ TXN0001        │   │
│ │ Tomato - 200kg │   │
│ │ Amount: ₹6,000 │   │
│ │ Buyer: Suresh  │   │
│ └────────────────┘   │
│                      │
│ Total Revenue: ₹6,000│
└──────────────────────┘
```

---

## 🔄 DATA FLOW DIAGRAM

### How Data Moves Through the System

```
┌─────────────────────────────────────────────────────────────┐
│                         USER ACTIONS                        │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────┐
│                      HTML PAGES                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐      │
│  │ index    │  │marketplace│  │ dashboards           │      │
│  │ .html    │  │ .html     │  │ (farmer/wholesaler)  │      │
│  └──────────┘  └──────────┘  └──────────────────────┘      │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓ Function calls
┌─────────────────────────────────────────────────────────────┐
│                    JAVASCRIPT LAYER                         │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │     utils.js         │  │      api.js          │        │
│  │                      │  │                      │        │
│  │ • formatCurrency()   │  │ • registerUser()     │        │
│  │ • formatDate()       │  │ • loginUser()        │        │
│  │ • isValidPhone()     │  │ • addCrop()          │        │
│  │ • showToast()        │  │ • getAllCrops()      │        │
│  │ • getCurrentUser()   │  │ • createTransaction()│        │
│  └──────────────────────┘  └──────────────────────┘        │
└────────────┬────────────────────────────────────────────────┘
             │
             ↓ Read/Write operations
┌─────────────────────────────────────────────────────────────┐
│                    localStorage (DATABASE)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   users     │  │   crops     │  │transactions │        │
│  │   [...]     │  │   [...]     │  │   [...]     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│  ┌─────────────┐                                           │
│  │ currentUser │  (Active session)                         │
│  │   {...}     │                                           │
│  └─────────────┘                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎭 COMPONENT INTERACTION

### How api.js and utils.js Work Together

```
┌────────────────────────────────────────────────────────────┐
│                    USER REGISTERS                          │
└────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌────────────────────────────────────────────────────────────┐
│  handleRegister() in index.html                            │
│                                                            │
│  1. Get form values                                        │
│  2. if (!isValidPhone(phone)) ← UTILS.JS                  │
│       showToast('Invalid') ← UTILS.JS                      │
│       return                                               │
│  3. result = await api.registerUser(data) ← API.JS        │
│  4. if (result.success)                                    │
│       showToast('Success') ← UTILS.JS                      │
│       api.loginUser() ← API.JS                             │
└────────────────────────────────────────────────────────────┘
                           │
                           ↓
┌────────────────────────────────────────────────────────────┐
│  api.registerUser() in api.js                              │
│                                                            │
│  1. Check duplicate phone                                  │
│  2. Generate user_id                                       │
│  3. Encode password: btoa()                                │
│  4. Save to localStorage                                   │
│  5. Return {success: true, user}                           │
└────────────────────────────────────────────────────────────┘
```

---

## 📊 localStorage STRUCTURE

### Visual Representation of Data

```
localStorage
│
├── "users" → JSON Array
│   │
│   ├── [0] {
│   │     id: "U0001",
│   │     user_id: "F001",
│   │     full_name: "Ravi Kumar",
│   │     phone: "9876543210",
│   │     password: "cmF2aTEyMw==",
│   │     user_type: "farmer",
│   │     city: "Pune",
│   │     created_at: "2024-10-15T16:30:00.000Z"
│   │   }
│   │
│   └── [1] {
│         id: "U0002",
│         user_id: "W001",
│         full_name: "Suresh Patil",
│         phone: "9876543211",
│         user_type: "wholesaler",
│         city: "Mumbai"
│       }
│
├── "crops" → JSON Array
│   │
│   ├── [0] {
│   │     id: "C0001",
│   │     crop_id: "CR0001",
│   │     farmer_id: "F001",
│   │     crop_name: "Tomato",
│   │     category: "Vegetables",
│   │     quantity_available: 300,
│   │     unit: "kg",
│   │     price_per_unit: 30,
│   │     is_organic: true,
│   │     is_available: true,
│   │     created_at: "2024-10-15T16:40:00.000Z"
│   │   }
│   │
│   └── [1] {
│         crop_id: "CR0002",
│         farmer_id: "F001",
│         crop_name: "Onion",
│         quantity_available: 500,
│         price_per_unit: 25
│       }
│
├── "transactions" → JSON Array
│   │
│   └── [0] {
│         id: "T0001",
│         transaction_id: "TXN0001",
│         crop_id: "CR0001",
│         farmer_id: "F001",
│         buyer_id: "W001",
│         quantity_ordered: 200,
│         price_per_unit: 30,
│         total_amount: 6000,
│         status: "pending",
│         transaction_date: "2024-10-15T16:45:00.000Z"
│       }
│
└── "currentUser" → JSON Object
    {
      id: "U0001",
      user_id: "F001",
      full_name: "Ravi Kumar",
      user_type: "farmer",
      phone: "9876543210",
      city: "Pune",
      loginTime: "2024-10-15T16:35:00.000Z"
    }
```

---

## 🔐 AUTHENTICATION FLOW

```
┌──────────────────────────────────────────────────────────┐
│                    LOGIN PROCESS                         │
└──────────────────────────────────────────────────────────┘

Step 1: User enters credentials
┌─────────────────┐
│  Phone: 9876... │
│  Password: ***  │
│  [Login]        │
└────────┬────────┘
         │
         ↓
Step 2: api.loginUser(phone, password)
┌─────────────────────────────────────────┐
│  1. Get all users from localStorage     │
│  2. Find user by phone                  │
│  3. Decode password: atob(user.password)│
│  4. Compare with input password         │
└────────┬────────────────────────────────┘
         │
         ↓
Step 3: Create session
┌─────────────────────────────────────────┐
│  session = {                            │
│    user_id: "F001",                     │
│    user_type: "farmer",                 │
│    full_name: "Ravi Kumar"              │
│  }                                      │
│                                         │
│  localStorage.setItem('currentUser',   │
│    JSON.stringify(session))            │
└────────┬────────────────────────────────┘
         │
         ↓
Step 4: Redirect to dashboard
┌─────────────────────────────────────────┐
│  window.location.href =                 │
│    `dashboard/${user_type}-dashboard`   │
└─────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│              PROTECTED PAGE ACCESS                       │
└──────────────────────────────────────────────────────────┘

User visits: farmer-dashboard.html
         │
         ↓
┌─────────────────────────────────────────┐
│  window.onload = function() {           │
│    if (!requireAuth()) return;          │
│    loadDashboard();                     │
│  }                                      │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│  function requireAuth() {               │
│    if (!localStorage.getItem(          │
│        'currentUser')) {                │
│      window.location.href =             │
│        'index.html';                    │
│      return false;                      │
│    }                                    │
│    return true;                         │
│  }                                      │
└─────────────────────────────────────────┘
```

---

## 🛒 TRANSACTION FLOW

```
┌──────────────────────────────────────────────────────────┐
│              BUYER PLACES ORDER                          │
└──────────────────────────────────────────────────────────┘

Before Transaction:
┌─────────────────┐
│ Crop: Tomato    │
│ Quantity: 500kg │
│ Price: ₹30/kg   │
└─────────────────┘

Buyer Orders 200kg:
         │
         ↓
┌─────────────────────────────────────────┐
│  transactionData = {                    │
│    crop_id: "CR0001",                   │
│    farmer_id: "F001",                   │
│    buyer_id: "W001",                    │
│    quantity_ordered: 200,               │
│    new_quantity: 300,  ← 500 - 200      │
│    total_amount: 6000  ← 200 × 30       │
│  }                                      │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│  api.createTransaction(transactionData) │
│                                         │
│  1. Create transaction record           │
│  2. Save to localStorage.transactions   │
│  3. Update crop quantity to 300         │
│  4. Save updated crop                   │
└────────┬────────────────────────────────┘
         │
         ↓
After Transaction:
┌─────────────────┐     ┌─────────────────┐
│ Crop: Tomato    │     │ Transaction     │
│ Quantity: 300kg │     │ TXN0001         │
│ Price: ₹30/kg   │     │ 200kg - ₹6,000  │
└─────────────────┘     └─────────────────┘

Farmer Dashboard:        Buyer Dashboard:
┌─────────────────┐     ┌─────────────────┐
│ Revenue: ₹6,000 │     │ Spent: ₹6,000   │
│ Sales: 1        │     │ Orders: 1       │
└─────────────────┘     └─────────────────┘
```

---

## 🎨 UI COMPONENTS

### Modal System

```
┌──────────────────────────────────────────────────────────┐
│                    MODAL WORKFLOW                        │
└──────────────────────────────────────────────────────────┘

Initial State:
┌─────────────────────────────────────────┐
│  <div id="loginModal" class="modal">    │
│    <!-- Hidden by default -->           │
│  </div>                                 │
└─────────────────────────────────────────┘
CSS: .modal { display: none; }

User clicks "Login":
         │
         ↓
┌─────────────────────────────────────────┐
│  function showLoginModal() {            │
│    document.getElementById('loginModal')│
│      .classList.add('show');            │
│  }                                      │
└────────┬────────────────────────────────┘
         │
         ↓
Modal Visible:
┌─────────────────────────────────────────┐
│  <div id="loginModal"                   │
│       class="modal show">               │
│    ┌─────────────────────────────┐     │
│    │  Login Form                 │     │
│    │  [Phone]                    │     │
│    │  [Password]                 │     │
│    │  [Submit]                   │     │
│    └─────────────────────────────┘     │
│  </div>                                 │
└─────────────────────────────────────────┘
CSS: .modal.show { display: flex; }

User clicks outside or close button:
         │
         ↓
┌─────────────────────────────────────────┐
│  function closeModal(modalId) {         │
│    document.getElementById(modalId)     │
│      .classList.remove('show');         │
│  }                                      │
└─────────────────────────────────────────┘
Modal Hidden Again
```

---

## 📱 RESPONSIVE DESIGN

```
┌──────────────────────────────────────────────────────────┐
│                  SCREEN SIZES                            │
└──────────────────────────────────────────────────────────┘

Mobile (< 768px):
┌─────────────┐
│ ☰ Menu      │
│             │
│ ┌─────────┐ │
│ │ Crop 1  │ │
│ └─────────┘ │
│ ┌─────────┐ │
│ │ Crop 2  │ │
│ └─────────┘ │
│ ┌─────────┐ │
│ │ Crop 3  │ │
│ └─────────┘ │
└─────────────┘
1 column grid

Tablet (768px - 1024px):
┌───────────────────────────┐
│ Logo    Menu Items        │
│                           │
│ ┌─────────┐ ┌─────────┐  │
│ │ Crop 1  │ │ Crop 2  │  │
│ └─────────┘ └─────────┘  │
│ ┌─────────┐ ┌─────────┐  │
│ │ Crop 3  │ │ Crop 4  │  │
│ └─────────┘ └─────────┘  │
└───────────────────────────┘
2 column grid

Desktop (> 1024px):
┌─────────────────────────────────────────┐
│ Logo    Menu Items                      │
│                                         │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│ │Crop1│ │Crop2│ │Crop3│ │Crop4│       │
│ └─────┘ └─────┘ └─────┘ └─────┘       │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│ │Crop5│ │Crop6│ │Crop7│ │Crop8│       │
│ └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
4 column grid
```

---

## 🎯 KEY TAKEAWAYS

### Data Flow Pattern:
```
User Action → HTML Event → JavaScript Function → 
API Method → localStorage → Update UI
```

### Component Hierarchy:
```
HTML (Structure)
  ↓
JavaScript (Logic)
  ├── api.js (Data)
  └── utils.js (Helpers)
  ↓
localStorage (Storage)
```

### Error Handling:
```
Try Operation → Success? → Update UI
              ↓ Fail
              Show Error Toast
```

**This visual guide should help you understand the project flow better! 🎨**
