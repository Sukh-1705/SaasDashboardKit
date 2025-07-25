// ===== SAAS DASHBOARD JAVASCRIPT =====

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const notificationsBtn = document.getElementById('notificationsBtn');
const notificationsMenu = document.getElementById('notificationsMenu');
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const toastContainer = document.getElementById('toastContainer');

// ===== THEME MANAGEMENT =====
function applyTheme(theme) {
    document.body.className = `${theme}-theme${document.body.classList.contains('login-page') ? ' login-page' : ''}`;
}

function updateThemeIcon(themeToggle, theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
        feather.replace();
    }
}

function getSavedTheme() {
    return localStorage.getItem('theme') || 'light';
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
    updateThemeIcon(document.getElementById('themeToggle'), theme);
}

class ThemeManager {
    constructor() {
        this.currentTheme = getSavedTheme();
        this.init();
    }

    init() {
        applyTheme(this.currentTheme);
        updateThemeIcon(themeToggle, this.currentTheme);
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        setTheme(this.currentTheme);
        // Show toast notification
        if (typeof showToast === 'function') {
            showToast('Theme Changed', `Switched to ${this.currentTheme} mode`, 'info');
        }
    }
}

window.applyTheme = applyTheme;
window.updateThemeIcon = updateThemeIcon;
window.getSavedTheme = getSavedTheme;
window.setTheme = setTheme;

// ===== SIDEBAR MANAGEMENT =====
class SidebarManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.updateSidebarState();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.updateSidebarState();
    }

    updateSidebarState() {
        if (this.isOpen) {
            sidebar.classList.add('open');
        } else {
            sidebar.classList.remove('open');
        }
    }

    close() {
        this.isOpen = false;
        this.updateSidebarState();
    }
}

// ===== DROPDOWN MANAGEMENT =====
class DropdownManager {
    constructor() {
        this.activeDropdown = null;
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAll();
            }
        });
    }

    toggle(dropdown) {
        if (this.activeDropdown && this.activeDropdown !== dropdown) {
            this.close(this.activeDropdown);
        }

        if (dropdown.classList.contains('show')) {
            this.close(dropdown);
        } else {
            this.open(dropdown);
        }
    }

    open(dropdown) {
        dropdown.classList.add('show');
        this.activeDropdown = dropdown;
    }

    close(dropdown) {
        dropdown.classList.remove('show');
        if (this.activeDropdown === dropdown) {
            this.activeDropdown = null;
        }
    }

    closeAll() {
        const dropdowns = document.querySelectorAll('.dropdown__menu');
        dropdowns.forEach(dropdown => this.close(dropdown));
    }
}

// ===== MODAL MANAGEMENT =====
class ModalManager {
    constructor() {
        this.init();
    }

    init() {
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.close();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
                this.close();
            }
        });
    }

    open() {
        modalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    close() {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ===== COUNTER ANIMATION =====
class CounterAnimation {
    static animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (end.toString().includes('.')) {
                element.textContent = value.toFixed(1) + '%';
            } else {
                element.textContent = value.toLocaleString();
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    static init() {
        const counters = document.querySelectorAll('.stat-card__value[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.dataset.target);
                    this.animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    toast.innerHTML = `
        <div class="toast__icon">
            <i data-feather="${getToastIcon(type)}"></i>
        </div>
        <div class="toast__content">
            <div class="toast__title">${title}</div>
            <div class="toast__message">${message}</div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    feather.replace();
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };
    return icons[type] || 'info';
}

// ===== SKELETON LOADER =====
class SkeletonLoader {
    static show(container) {
        const skeletons = container.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => skeleton.style.display = 'block');
    }

    static hide(container) {
        const skeletons = container.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => skeleton.style.display = 'none');
    }

    static createCardSkeleton() {
        return `
            <div class="skeleton skeleton--card"></div>
            <div class="skeleton skeleton--title"></div>
            <div class="skeleton skeleton--text"></div>
            <div class="skeleton skeleton--text" style="width: 80%;"></div>
        `;
    }
}

// ===== SEARCH FUNCTIONALITY =====
class SearchManager {
    constructor() {
        this.searchInput = document.querySelector('.search-box__input');
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    handleSearch(query) {
        if (query.length > 2) {
            // Simulate search functionality
            console.log('Searching for:', query);
            // In a real app, this would make an API call
        }
    }
}

// ===== FORM VALIDATION =====
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validateRequired(value) {
        return value.trim() !== '';
    }

    static showError(input, message) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--color-danger)';
        errorDiv.style.fontSize = '0.75rem';
        errorDiv.style.marginTop = 'var(--spacing-xs)';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = 'var(--color-danger)';
    }

    static clearError(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    static validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            this.clearError(input);
            
            if (!this.validateRequired(input.value)) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                this.showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });
        
        return isValid;
    }
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Initialize managers
    const themeManager = new ThemeManager();
    const sidebarManager = new SidebarManager();
    const dropdownManager = new DropdownManager();
    const modalManager = new ModalManager();
    const searchManager = new SearchManager();
    
    // Initialize counter animations
    CounterAnimation.init();
    
    // Event Listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', () => themeManager.toggle());
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => sidebarManager.toggle());
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => sidebarManager.close());
    }
    
    if (notificationsBtn && notificationsMenu) {
        notificationsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownManager.toggle(notificationsMenu);
        });
    }
    
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownManager.toggle(profileMenu);
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', () => modalManager.close());
    }
    
    // Add click handlers for buttons that should open modal
    const addUserBtns = document.querySelectorAll('[data-action="add-user"]');
    addUserBtns.forEach(btn => {
        btn.addEventListener('click', () => modalManager.open());
    });
    
    // Form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (FormValidator.validateForm(form)) {
                showToast('Success', 'Form submitted successfully!', 'success');
                modalManager.close();
            }
        });
    });
    
    // Chart controls
    const chartControls = document.querySelectorAll('.chart-controls .btn');
    chartControls.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from siblings
            btn.parentNode.querySelectorAll('.btn').forEach(b => {
                b.classList.remove('btn--primary');
                b.classList.add('btn--outline');
            });
            
            // Add active class to clicked button
            btn.classList.remove('btn--outline');
            btn.classList.add('btn--primary');
            
            // Update chart (placeholder)
            console.log('Chart period changed to:', btn.textContent);
        });
    });
    
    // Simulate loading states
    setTimeout(() => {
        showToast('Welcome!', 'Dashboard loaded successfully', 'success');
    }, 1000);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.sidebar') && 
            !e.target.closest('.navbar__menu-toggle') &&
            sidebarManager.isOpen) {
            sidebarManager.close();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebarManager.close();
        }
    });
    
    console.log('SaaS Dashboard initialized successfully!');
});
