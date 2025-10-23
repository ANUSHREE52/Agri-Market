# How to Clear All Data

This guide explains how to delete all existing data from the Agri-Market application.

## ⚠️ Warning
This will permanently delete:
- All registered users
- All crops
- All purchase requests/transactions
- Current login session

**This action CANNOT be undone!**

---

## Method 1: Using Browser Console (Recommended)

1. Open your Agri-Market application in a web browser
2. Press **F12** (or right-click → Inspect) to open Developer Tools
3. Click on the **Console** tab
4. Copy and paste this command:
   ```javascript
   localStorage.clear(); localStorage.setItem('users', '[]'); localStorage.setItem('crops', '[]'); localStorage.setItem('transactions', '[]'); alert('All data cleared!'); location.reload();
   ```
5. Press **Enter**
6. The page will reload with all data cleared

---

## Method 2: Using the Clear Data Script

1. Open `index.html` in your code editor
2. Add this line before the closing `</body>` tag:
   ```html
   <script src="js/clear-data.js" data-auto-clear="true"></script>
   ```
3. Save the file
4. Open the application in your browser
5. A confirmation dialog will appear
6. Click **OK** to clear all data
7. **Important:** Remove the script tag after clearing data!

---

## Method 3: Manual Console Commands

If you want more control, run these commands one by one in the browser console:

```javascript
// View current data count
console.log('Users:', JSON.parse(localStorage.getItem('users') || '[]').length);
console.log('Crops:', JSON.parse(localStorage.getItem('crops') || '[]').length);
console.log('Transactions:', JSON.parse(localStorage.getItem('transactions') || '[]').length);

// Clear all data
localStorage.removeItem('users');
localStorage.removeItem('crops');
localStorage.removeItem('transactions');
localStorage.removeItem('currentUser');

// Reinitialize with empty arrays
localStorage.setItem('users', '[]');
localStorage.setItem('crops', '[]');
localStorage.setItem('transactions', '[]');

// Verify data is cleared
console.log('Data cleared! New counts:');
console.log('Users:', JSON.parse(localStorage.getItem('users')).length);
console.log('Crops:', JSON.parse(localStorage.getItem('crops')).length);
console.log('Transactions:', JSON.parse(localStorage.getItem('transactions')).length);

// Reload page
location.reload();
```

---

## Method 4: Using Clear Data Function

1. Open browser console (F12)
2. Load the clear data script:
   ```javascript
   var script = document.createElement('script');
   script.src = 'js/clear-data.js';
   document.head.appendChild(script);
   ```
3. Wait 1 second, then run:
   ```javascript
   clearAllData();
   ```
4. Confirm the action in the dialog

---

## After Clearing Data

Once data is cleared, you can:

1. **Register new users** - Start fresh with new farmer and wholesaler accounts
2. **Add crops** - Farmers can add crops with automatic crop-specific images
3. **Test the system** - Verify all features work correctly

---

## Troubleshooting

### Data not clearing?
- Make sure you're on the correct domain
- Try clearing browser cache (Ctrl+Shift+Delete)
- Use Method 1 (simplest and most reliable)

### Page not reloading?
- Manually refresh the page (F5 or Ctrl+R)
- Close and reopen the browser tab

### Still seeing old data?
- Check if you're logged in - logout first
- Clear browser cache completely
- Try in incognito/private browsing mode

---

## Quick Reference

**Fastest way to clear everything:**
```javascript
localStorage.clear(); localStorage.setItem('users', '[]'); localStorage.setItem('crops', '[]'); localStorage.setItem('transactions', '[]'); location.reload();
```

Copy this single line and paste it in the browser console!

---

**Last Updated:** October 11, 2025
