// ===== SETTINGS PAGE FUNCTIONALITY =====

class SettingsManager {
    constructor() {
        this.currentSection = 'profile';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFormHandlers();
        this.setupToggleHandlers();
        this.setupThemeSelection();
        this.loadSavedSettings();
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.settings-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.settings-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.settings-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(`[data-section-content="${section}"]`).classList.add('active');

        this.currentSection = section;
    }

    setupFormHandlers() {
        const forms = document.querySelectorAll('.settings-form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettings();
            });
        });

        // Save button
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        // Reset button
        const resetBtn = document.querySelector('.btn:has([data-feather="refresh-cw"])');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetToDefault();
            });
        }
    }

    setupToggleHandlers() {
        const toggles = document.querySelectorAll('.toggle input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                this.handleToggleChange(toggle);
            });
        });
    }

    setupThemeSelection() {
        const themeInputs = document.querySelectorAll('input[name="theme"]');
        themeInputs.forEach(input => {
            input.addEventListener('change', () => {
                if (input.checked) {
                    this.handleThemeChange(input.value);
                }
            });
        });
    }

    handleToggleChange(toggle) {
        const settingName = this.getSettingName(toggle);
        const isEnabled = toggle.checked;
        
        // Save to localStorage
        localStorage.setItem(`setting_${settingName}`, isEnabled);
        
        // Show feedback
        if (typeof showToast === 'function') {
            showToast(
                'Setting Updated', 
                `${settingName} ${isEnabled ? 'enabled' : 'disabled'}`, 
                'success'
            );
        }
    }

    handleThemeChange(theme) {
        // Update theme immediately
        document.body.className = `${theme}-theme`;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon in navbar
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.setAttribute('data-feather', 'sun');
            } else {
                icon.setAttribute('data-feather', 'moon');
            }
            feather.replace();
        }
        
        if (typeof showToast === 'function') {
            showToast('Theme Changed', `Switched to ${theme} theme`, 'success');
        }
    }

    getSettingName(element) {
        // Extract setting name from the toggle's context
        const settingItem = element.closest('.setting-item');
        const heading = settingItem.querySelector('h5') || settingItem.querySelector('h4');
        return heading ? heading.textContent.trim() : 'Unknown Setting';
    }

    saveSettings() {
        // Collect all form data
        const formData = new FormData();
        const forms = document.querySelectorAll('.settings-form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    formData.append(input.name || input.id, input.checked);
                } else {
                    formData.append(input.name || input.id, input.value);
                }
            });
        });

        // Simulate API call
        setTimeout(() => {
            if (typeof showToast === 'function') {
                showToast('Settings Saved', 'Your settings have been updated successfully', 'success');
            }
        }, 500);

        // Save to localStorage for demo purposes
        for (let [key, value] of formData.entries()) {
            localStorage.setItem(`setting_${key}`, value);
        }
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
            // Clear localStorage settings
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('setting_')) {
                    localStorage.removeItem(key);
                }
            });

            // Reset form values
            this.loadDefaultSettings();
            
            if (typeof showToast === 'function') {
                showToast('Settings Reset', 'All settings have been reset to default values', 'info');
            }
        }
    }

    loadSavedSettings() {
        // Load theme setting
        const savedTheme = localStorage.getItem('theme') || 'light';
        const themeInput = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
        if (themeInput) {
            themeInput.checked = true;
        }

        // Load toggle settings
        const toggles = document.querySelectorAll('.toggle input[type="checkbox"]');
        toggles.forEach(toggle => {
            const settingName = this.getSettingName(toggle);
            const savedValue = localStorage.getItem(`setting_${settingName}`);
            if (savedValue !== null) {
                toggle.checked = savedValue === 'true';
            }
        });
    }

    loadDefaultSettings() {
        // Reset theme to light
        const lightThemeInput = document.querySelector('input[name="theme"][value="light"]');
        if (lightThemeInput) {
            lightThemeInput.checked = true;
            this.handleThemeChange('light');
        }

        // Reset toggles to default states
        const toggles = document.querySelectorAll('.toggle input[type="checkbox"]');
        toggles.forEach((toggle, index) => {
            // Set some default states (first two enabled, rest disabled)
            toggle.checked = index < 2;
        });

        // Reset form inputs to default values
        const inputs = document.querySelectorAll('.settings-form input, .settings-form select, .settings-form textarea');
        inputs.forEach(input => {
            if (input.hasAttribute('data-default')) {
                input.value = input.getAttribute('data-default');
            }
        });
    }
}

// Security actions
function handleSecurityAction(action) {
    switch (action) {
        case 'change-password':
            if (typeof showToast === 'function') {
                showToast('Password Change', 'Password change form would open here', 'info');
            }
            break;
        case 'enable-2fa':
            if (typeof showToast === 'function') {
                showToast('2FA Setup', 'Two-factor authentication setup would start here', 'info');
            }
            break;
        case 'view-sessions':
            if (typeof showToast === 'function') {
                showToast('Active Sessions', 'Session management would open here', 'info');
            }
            break;
        case 'download-data':
            if (typeof showToast === 'function') {
                showToast('Data Export', 'Your data export has been initiated', 'success');
            }
            break;
    }
}

// Billing actions
function handleBillingAction(action) {
    switch (action) {
        case 'change-plan':
            if (typeof showToast === 'function') {
                showToast('Plan Change', 'Plan selection would open here', 'info');
            }
            break;
        case 'cancel-subscription':
            if (confirm('Are you sure you want to cancel your subscription?')) {
                if (typeof showToast === 'function') {
                    showToast('Subscription', 'Cancellation process would start here', 'warning');
                }
            }
            break;
        case 'update-payment':
            if (typeof showToast === 'function') {
                showToast('Payment Method', 'Payment method update would open here', 'info');
            }
            break;
    }
}

// Initialize settings page
document.addEventListener('DOMContentLoaded', function() {
    new SettingsManager();
    
    // Setup security action buttons
    const securityButtons = document.querySelectorAll('.security-item .btn');
    securityButtons.forEach((btn, index) => {
        const actions = ['change-password', 'enable-2fa', 'view-sessions', 'download-data'];
        btn.addEventListener('click', () => {
            handleSecurityAction(actions[index]);
        });
    });
    
    // Setup billing action buttons
    const billingButtons = document.querySelectorAll('.plan-actions .btn, .payment-card .btn, .invoice-item .btn');
    billingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.textContent.toLowerCase();
            if (text.includes('change')) {
                handleBillingAction('change-plan');
            } else if (text.includes('cancel')) {
                handleBillingAction('cancel-subscription');
            } else if (text.includes('update')) {
                handleBillingAction('update-payment');
            } else if (text.includes('download')) {
                if (typeof showToast === 'function') {
                    showToast('Invoice Download', 'Invoice download started', 'success');
                }
            }
        });
    });
});
