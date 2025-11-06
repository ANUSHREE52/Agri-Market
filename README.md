# 🌾 Agri-Market - Frontend Application

A modern, lightweight agricultural marketplace built with **HTML, CSS, JavaScript, and JSON** that connects farmers directly with wholesalers.

## 🚀 Features

### Core Functionality
- **No Backend Required**: Pure frontend application using localStorage for data persistence
- **4 User Types**: Farmers and Wholesalers
- **Direct Connections**: Eliminate middlemen, ensure fair pricing
- **Real-time Updates**: Instant data synchronization using JavaScript
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

### User Features

#### For Farmers 🚜
- Add and manage crop listings
- Set prices and quantities
- Track sales and revenue
- View buyer information
- Real-time inventory management
- Delete crop listings

#### For Buyers (Wholesalers) 🛒
- Browse fresh produce from local farmers
- Search and filter crops by name, category, or location
- View detailed product information
- Place orders directly with farmers
- Track order history and status
- View transaction details

## 📁 Project Structure

```
C:\Agri-Market-Frontend/
├── index.html                 # Main homepage
├── README.md                  # Project documentation
│
├── css/
│   └── style.css             # Main stylesheet with responsive design
│
├── js/
│   ├── api.js                # API client for localStorage operations
│   └── utils.js              # Utility functions (formatting, validation, etc.)
│
├── pages/
│   └── marketplace.html      # Public marketplace page
│
└── dashboard/
    ├── farmer-dashboard.html      # Farmer dashboard
    ├── customer-dashboard.html    # Customer dashboard
    ├── retailer-dashboard.html    # Retailer dashboard
    └── wholesaler-dashboard.html  # Wholesaler dashboard
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JavaScript, no frameworks
- **LocalStorage**: Client-side data persistence
- **Font Awesome**: Icons
- **No Dependencies**: No npm, no build process, no server required!

### Installation

1. **Download the project** to your local machine:
   ```
   Location: C:\Agri-Market-Frontend\
   ```

2. **Open the project**:
   - Simply open `index.html` in your web browser
   - Or use a local server (optional):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```
     
## 🎯 Project Goals

1. **Empower Farmers**: Give farmers control over pricing and sales
2. **Fair Trade**: Eliminate middlemen markup
3. **Fresh Produce**: Connect buyers directly to source
4. **Simple Technology**: Easy-to-use platform for rural communities
5. **Accessibility**: No complex setup or technical knowledge required

## ⚡ Performance
- **Fast Load Times**: No external dependencies
- **Instant Updates**: No server roundtrips
- **Lightweight**: ~50KB total size
- **Offline Capable**: Works without internet (after initial load)

---

**Made with ❤️ for farmers and agricultural communities**

*Empowering Farmers, Connecting Communities*
