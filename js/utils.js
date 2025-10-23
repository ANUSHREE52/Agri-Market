/**
 * Utility Functions for Agri-Market
 */

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Redirect if not logged in
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = '../index.html';
        return false;
    }
    return true;
}

// Redirect if already logged in
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        const user = getCurrentUser();
        window.location.href = `dashboard/${user.user_type}-dashboard.html`;
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Format datetime
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show loading spinner
function showLoading(element) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    element.appendChild(spinner);
}

// Hide loading spinner
function hideLoading(element) {
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

// Sanitize input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get user type badge color
function getUserTypeBadgeClass(userType) {
    const badges = {
        'farmer': 'badge-success',
        'customer': 'badge-primary',
        'retailer': 'badge-warning',
        'wholesaler': 'badge-info'
    };
    return badges[userType] || 'badge-secondary';
}

// Get transaction status badge
function getStatusBadgeClass(status) {
    const badges = {
        'pending': 'badge-warning',
        'completed': 'badge-success',
        'cancelled': 'badge-danger',
        'processing': 'badge-info'
    };
    return badges[status] || 'badge-secondary';
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Truncate text
function truncate(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

// Confirm dialog
function confirmDialog(message) {
    return confirm(message);
}
