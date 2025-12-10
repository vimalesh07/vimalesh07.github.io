// ===================================
// Theme Switcher with localStorage
// ===================================

class ThemeSwitcher {
    constructor() {
        this.currentTheme = 'purple';
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.htmlElement = document.documentElement;
        this.storageKey = 'portfolio-theme';
        
        this.init();
    }
    
    init() {
        // Load saved theme from localStorage
        this.loadTheme();
        
        // Add event listeners to theme buttons
        this.themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                this.setTheme(theme);
            });
        });
        
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.currentTheme = e.newValue;
                this.applyTheme();
            }
        });
    }
    
    loadTheme() {
        // Try to get theme from localStorage
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme && (savedTheme === 'purple' || savedTheme === 'yellow')) {
            this.currentTheme = savedTheme;
        } else {
            // Default to purple theme
            this.currentTheme = 'purple';
            this.saveTheme();
        }
        
        this.applyTheme();
    }
    
    setTheme(theme) {
        if (theme !== this.currentTheme) {
            this.currentTheme = theme;
            this.saveTheme();
            this.applyTheme();
            this.animateThemeChange();
        }
    }
    
    saveTheme() {
        try {
            localStorage.setItem(this.storageKey, this.currentTheme);
        } catch (e) {
            console.warn('Could not save theme to localStorage:', e);
        }
    }
    
    applyTheme() {
        // Set data-theme attribute on html element
        this.htmlElement.setAttribute('data-theme', this.currentTheme);
        
        // Update active button state
        this.themeButtons.forEach(button => {
            const buttonTheme = button.getAttribute('data-theme');
            if (buttonTheme === this.currentTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Apply theme-specific styles dynamically
        this.applyThemeColors();
    }
    
    applyThemeColors() {
        const root = document.documentElement;
        
        if (this.currentTheme === 'purple') {
            root.style.setProperty('--primary', '#7c3aed');
            root.style.setProperty('--secondary', '#a78bfa');
            root.style.setProperty('--accent', '#c4b5fd');
            root.style.setProperty('--primary-dark', '#5b21b6');
            root.style.setProperty('--primary-light', '#ede9fe');
        } else if (this.currentTheme === 'yellow') {
            root.style.setProperty('--primary', '#f59e0b');
            root.style.setProperty('--secondary', '#fbbf24');
            root.style.setProperty('--accent', '#fcd34d');
            root.style.setProperty('--primary-dark', '#d97706');
            root.style.setProperty('--primary-light', '#fef3c7');
        }
    }
    
    animateThemeChange() {
        // Add a smooth transition animation
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Create ripple effect from theme button
        const activeButton = document.querySelector('.theme-btn.active');
        if (activeButton) {
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.borderRadius = '50%';
            ripple.style.background = `var(--primary)`;
            ripple.style.opacity = '0.3';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.transition = 'all 0.6s ease';
            ripple.style.zIndex = '9999';
            
            const rect = activeButton.getBoundingClientRect();
            ripple.style.left = rect.left + rect.width / 2 + 'px';
            ripple.style.top = rect.top + rect.height / 2 + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.width = '3000px';
                ripple.style.height = '3000px';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 700);
        }
    }
    
    getTheme() {
        return this.currentTheme;
    }
}

// Initialize theme switcher when DOM is loaded
let themeSwitcher;
document.addEventListener('DOMContentLoaded', () => {
    themeSwitcher = new ThemeSwitcher();
});
