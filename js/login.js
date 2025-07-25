// ===== LOGIN PAGE FUNCTIONALITY =====

class LoginManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormHandlers();
        this.setupPasswordToggle();
        this.setupSocialLogin();
        this.setupThemeToggle();
    }

    setupFormHandlers() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }

        // Forgot password link
        const forgotPassword = document.querySelector('.forgot-password');
        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }

        // Sign up link
        const signupLink = document.querySelector('.signup-link');
        if (signupLink) {
            signupLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
    }

    setupPasswordToggle() {
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.querySelector('input[type="password"]');
        
        if (passwordToggle && passwordInput) {
            passwordToggle.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                const icon = passwordToggle.querySelector('i');
                icon.setAttribute('data-feather', type === 'password' ? 'eye' : 'eye-off');
                feather.replace();
            });
        }
    }

    setupSocialLogin() {
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.classList.contains('social-btn--google') ? 'Google' : 'GitHub';
                this.handleSocialLogin(provider);
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const newTheme = (window.getSavedTheme() === 'light') ? 'dark' : 'light';
                window.setTheme(newTheme);
            });
        }
        // Load saved theme
        const savedTheme = window.getSavedTheme();
        window.applyTheme(savedTheme);
        window.updateThemeIcon(themeToggle, savedTheme);
    }

    handleLogin(e) {
        const formData = new FormData(e.target);
        const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
        const password = formData.get('password') || e.target.querySelector('input[type="password"]').value;
        const rememberMe = e.target.querySelector('input[type="checkbox"]').checked;

        // Validate form
        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (!password || password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-feather="loader" class="spinning"></i> Signing in...';
        submitBtn.disabled = true;
        feather.replace();

        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            feather.replace();

            // Check credentials (demo purposes)
            if (email === 'admin@example.com' && password === 'password') {
                this.handleSuccessfulLogin(email, rememberMe);
            } else {
                this.showError('Invalid email or password');
            }
        }, 2000);
    }

    handleSuccessfulLogin(email, rememberMe) {
        // Save login state
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        // Show success message
        if (typeof showToast === 'function') {
            showToast('Login Successful', 'Welcome back! Redirecting to dashboard...', 'success');
        }

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    handleForgotPassword() {
        if (typeof showToast === 'function') {
            showToast('Password Reset', 'Password reset functionality would be implemented here', 'info');
        }
    }

    handleSignup() {
        if (typeof showToast === 'function') {
            showToast('Sign Up', 'Sign up page would be implemented here', 'info');
        }
    }

    handleSocialLogin(provider) {
        if (typeof showToast === 'function') {
            showToast(`${provider} Login`, `${provider} authentication would be implemented here`, 'info');
        }
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    applyTheme(theme) {
        document.body.className = `${theme}-theme login-page`;
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
            feather.replace();
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showError(message) {
        if (typeof showToast === 'function') {
            showToast('Login Error', message, 'error');
        } else {
            alert(message);
        }
    }

    loadRememberedEmail() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            const emailInput = document.querySelector('input[type="email"]');
            const rememberCheckbox = document.querySelector('input[type="checkbox"]');
            
            if (emailInput) {
                emailInput.value = rememberedEmail;
            }
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }
    }
}

// Add spinning animation for loader
const style = document.createElement('style');
style.textContent = `
    .spinning {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    const loginManager = new LoginManager();
    loginManager.loadRememberedEmail();
    
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        if (typeof showToast === 'function') {
            showToast('Already Logged In', 'Redirecting to dashboard...', 'info');
        }
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
});
