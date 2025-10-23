# Agri-Market Frontend - Recent Changes

## Date: October 11, 2025

### Summary of Changes

This document outlines the recent modifications made to the Agri-Market Frontend application.

---

## 1. ✅ Crop-Specific Images

**What Changed:**
- Farmers now get **automatic crop-specific images** when adding crops
- Images are fetched from the `getCropImage()` function in `api.js` based on crop name and category
- Over 30+ crop images mapped (vegetables, fruits, grains, pulses, spices)

**Files Modified:**
- `dashboard/farmer-dashboard.html` - Updated `handleAddCrop()` function to use `api.getCropImage(cropName, category)`

**Benefits:**
- No more placeholder images
- Professional, relevant images for each crop type
- Better visual appeal in marketplace

---

## 2. ✅ Removed Transaction ID Column

**What Changed:**
- Removed "Transaction ID" column from all dashboard tables
- Changed column header from "Transaction ID" to "Request ID"
- Simplified the purchase request display

**Files Modified:**
- `dashboard/farmer-dashboard.html` - Purchase Requests table
- `dashboard/wholesaler-dashboard.html` - My Purchase Requests table

**Benefits:**
- Cleaner interface
- Focus on essential information
- Request ID is still shown in detail modals

---

## 3. ✅ Purchase Request Terminology

**What Changed:**
- Changed all "Order" and "Transaction" terminology to "Purchase Request"
- Updated throughout the application for consistency
- Changed button text from "Place Order" to "Send Purchase Request"

**Files Modified:**
- `dashboard/farmer-dashboard.html`
  - Section title: "Recent Sales" → "Purchase Requests"
  - Empty state: "No sales yet" → "No purchase requests yet"
  
- `dashboard/wholesaler-dashboard.html`
  - Section title: "My Orders" → "My Purchase Requests"
  - Modal title: "Order Details" → "Purchase Request Details"
  - Labels: "Order ID" → "Request ID", "Order Date" → "Request Date"
  
- `pages/marketplace.html`
  - Form title: "Place Order" → "Send Purchase Request"
  - Button: "Place Order" → "Send Purchase Request"
  - Success message: "Order placed successfully!" → "Purchase request sent successfully!"

**Benefits:**
- More accurate terminology (requests need farmer approval)
- Better reflects the business model
- Clearer communication between farmers and wholesalers

---

## 4. ✅ Data Clearing Utility

**What Changed:**
- Created a new utility script to clear all existing data
- Safely removes all users, crops, and transactions from localStorage
- Includes confirmation dialog to prevent accidental deletion

**Files Created:**
- `js/clear-data.js` - Data clearing utility

**How to Use:**
1. Open browser console (F12)
2. Run: `clearAllData()`
3. Confirm the action
4. All data will be cleared and page will reload

**Alternative Method:**
Include the script in any HTML page with auto-clear attribute:
```html
<script src="js/clear-data.js" data-auto-clear="true"></script>
```

---

## Active User Roles

The application currently supports **2 user roles**:

1. **Farmer** - Can add crops, view purchase requests, manage inventory
2. **Wholesaler** - Can browse marketplace, send purchase requests, view order history

**Note:** Customer and Retailer dashboard files exist but are not actively used in the current application flow.

---

## Technical Details

### Crop Image Mapping
The `getCropImage()` function in `api.js` includes:
- **Vegetables**: Tomato, Potato, Onion, Cabbage, Carrot, Cauliflower, Brinjal, Ladyfinger, Pumpkin, Cucumber, Beetroot, Spinach
- **Fruits**: Mango, Banana, Apple, Orange, Grapes, Watermelon, Papaya, Guava, Pomegranate, Strawberry
- **Grains**: Wheat, Rice, Corn, Maize, Barley, Millet, Jowar, Bajra
- **Pulses**: Chickpea, Lentil, Moong, Toor, Urad, Masoor
- **Spices**: Turmeric, Chilli, Pepper, Ginger, Garlic, Coriander, Cumin

Images are sourced from Unsplash with fallback to category defaults.

---

## Next Steps / Future Enhancements

### Pending Features:
- [ ] Farmer ability to sell to specific wholesalers (targeted selling)
- [ ] Purchase request approval/rejection workflow
- [ ] Notification system for new requests
- [ ] Order status tracking (pending → accepted → delivered)
- [ ] Rating and review system

---

## Testing Checklist

After clearing data, test the following:

- [ ] Register as Farmer
- [ ] Add crops with different categories (verify images)
- [ ] Register as Wholesaler
- [ ] Browse marketplace
- [ ] Send purchase request
- [ ] Farmer views purchase requests (verify "Request ID" column)
- [ ] Check all terminology shows "Purchase Request" not "Order"

---

## Support

For issues or questions, refer to:
- `README.md` - Project overview
- `QUICKSTART.md` - Quick start guide
- `AUTO-LOGIN.md` - Auto-login feature documentation

---

**Last Updated:** October 11, 2025, 11:25 PM IST
