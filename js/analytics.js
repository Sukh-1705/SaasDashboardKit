// ===== ANALYTICS PAGE FUNCTIONALITY =====

class AnalyticsManager {
    constructor() {
        this.currentTab = 'overview';
        this.init();
    }

    init() {
        this.setupTabSwitching();
        this.initRealtimeCounter();
        this.setupDateRangePicker();
    }

    setupTabSwitching() {
        const tabs = document.querySelectorAll('.analytics-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update current tab
                this.currentTab = tab.dataset.tab;
                
                // Show relevant content
                this.showTabContent(this.currentTab);
                
                // Show toast notification
                if (typeof showToast === 'function') {
                    showToast('Tab Changed', `Switched to ${this.currentTab} analytics`, 'info');
                }
            });
        });
    }

    showTabContent(tab) {
        // Hide all tab content
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(content => content.style.display = 'none');
        
        // Show selected tab content
        const selectedContent = document.querySelector(`[data-tab-content="${tab}"]`);
        if (selectedContent) {
            selectedContent.style.display = 'block';
        }
        
        // Update charts based on tab
        this.updateChartsForTab(tab);
    }

    updateChartsForTab(tab) {
        // Simulate different data for different tabs
        console.log(`Updating charts for ${tab} tab`);
        
        // In a real application, you would fetch different data
        // and update the charts accordingly
    }

    initRealtimeCounter() {
        const realtimeCount = document.querySelector('.realtime-count');
        if (!realtimeCount) return;

        // Simulate real-time user count updates
        setInterval(() => {
            const currentCount = parseInt(realtimeCount.textContent);
            const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
            const newCount = Math.max(0, currentCount + change);
            
            // Animate the counter
            this.animateCounter(realtimeCount, currentCount, newCount, 500);
        }, 5000); // Update every 5 seconds
    }

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    setupDateRangePicker() {
        const dateRangeBtn = document.querySelector('.btn:has([data-feather="calendar"])');
        if (dateRangeBtn) {
            dateRangeBtn.addEventListener('click', () => {
                // In a real application, this would open a date range picker
                if (typeof showToast === 'function') {
                    showToast('Date Range', 'Date range picker would open here', 'info');
                }
            });
        }

        const exportBtn = document.querySelector('.btn:has([data-feather="download"])');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportReport();
            });
        }
    }

    exportReport() {
        // Simulate report export
        if (typeof showToast === 'function') {
            showToast('Export Started', 'Your analytics report is being generated...', 'info');
            
            setTimeout(() => {
                showToast('Export Complete', 'Analytics report has been downloaded', 'success');
            }, 2000);
        }
    }
}

// Real-time activity dot animation
function initActivityDot() {
    const activityDot = document.querySelector('.activity-dot');
    if (activityDot) {
        setInterval(() => {
            activityDot.style.opacity = activityDot.style.opacity === '0.3' ? '1' : '0.3';
        }, 1000);
    }
}

// Initialize analytics page
document.addEventListener('DOMContentLoaded', function() {
    new AnalyticsManager();
    initActivityDot();
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.top-page-progress, .device-progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 500);
    });
});
