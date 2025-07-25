// ===== USERS PAGE FUNCTIONALITY =====

// Sample user data
const usersData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        role: 'admin',
        status: 'active',
        lastActive: '2 minutes ago'
    },
    {
        id: 2,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        role: 'user',
        status: 'active',
        lastActive: '1 hour ago'
    },
    {
        id: 3,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        role: 'manager',
        status: 'inactive',
        lastActive: '2 days ago'
    },
    {
        id: 4,
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        role: 'user',
        status: 'active',
        lastActive: '30 minutes ago'
    },
    {
        id: 5,
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
        role: 'admin',
        status: 'pending',
        lastActive: 'Never'
    },
    {
        id: 6,
        name: 'James Brown',
        email: 'james.brown@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        role: 'user',
        status: 'active',
        lastActive: '5 minutes ago'
    },
    {
        id: 7,
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
        role: 'manager',
        status: 'active',
        lastActive: '15 minutes ago'
    },
    {
        id: 8,
        name: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
        role: 'user',
        status: 'inactive',
        lastActive: '1 week ago'
    }
];

class UsersManager {
    constructor() {
        this.users = [...usersData];
        this.filteredUsers = [...usersData];
        this.currentPage = 1;
        this.usersPerPage = 10;
        this.init();
    }

    init() {
        this.renderUsers();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('userSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter functionality
        const roleFilter = document.getElementById('roleFilter');
        const statusFilter = document.getElementById('statusFilter');
        
        if (roleFilter) {
            roleFilter.addEventListener('change', () => this.applyFilters());
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.applyFilters());
        }

        // Table actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.user-action-btn')) {
                const action = e.target.closest('.user-action-btn').dataset.action;
                const userId = parseInt(e.target.closest('.user-action-btn').dataset.userId);
                this.handleUserAction(action, userId);
            }
        });
    }

    handleSearch(query) {
        if (query.trim() === '') {
            this.filteredUsers = [...this.users];
        } else {
            this.filteredUsers = this.users.filter(user => 
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            );
        }
        this.applyFilters();
    }

    applyFilters() {
        const roleFilter = document.getElementById('roleFilter')?.value;
        const statusFilter = document.getElementById('statusFilter')?.value;
        
        let filtered = [...this.filteredUsers];
        
        if (roleFilter) {
            filtered = filtered.filter(user => user.role === roleFilter);
        }
        
        if (statusFilter) {
            filtered = filtered.filter(user => user.status === statusFilter);
        }
        
        this.filteredUsers = filtered;
        this.renderUsers();
    }

    renderUsers() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        if (this.filteredUsers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center" style="padding: 2rem;">
                        <div style="color: var(--text-secondary);">
                            <i data-feather="users" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                            <p>No users found</p>
                        </div>
                    </td>
                </tr>
            `;
            feather.replace();
            return;
        }

        tbody.innerHTML = this.filteredUsers.map(user => `
            <tr>
                <td>
                    <input type="checkbox" class="checkbox" data-user-id="${user.id}">
                </td>
                <td>
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                        <div class="user-details">
                            <span class="user-name">${user.name}</span>
                            <span class="user-id">#${user.id.toString().padStart(4, '0')}</span>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <span class="role-badge role-badge--${user.role}">${this.capitalizeFirst(user.role)}</span>
                </td>
                <td>
                    <span class="status-badge status-badge--${user.status}">${this.capitalizeFirst(user.status)}</span>
                </td>
                <td>${user.lastActive}</td>
                <td>
                    <div class="user-actions">
                        <button class="user-action-btn" data-action="edit" data-user-id="${user.id}" title="Edit">
                            <i data-feather="edit-2"></i>
                        </button>
                        <button class="user-action-btn" data-action="delete" data-user-id="${user.id}" title="Delete">
                            <i data-feather="trash-2"></i>
                        </button>
                        <button class="user-action-btn" data-action="more" data-user-id="${user.id}" title="More">
                            <i data-feather="more-horizontal"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        feather.replace();
    }

    handleUserAction(action, userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        switch (action) {
            case 'edit':
                this.editUser(user);
                break;
            case 'delete':
                this.deleteUser(user);
                break;
            case 'more':
                this.showUserMenu(user);
                break;
        }
    }

    editUser(user) {
        // Populate modal with user data for editing
        const modal = document.getElementById('modalOverlay');
        const title = modal.querySelector('.modal__title');
        const form = modal.querySelector('form');
        
        title.textContent = 'Edit User';
        
        // Fill form with user data
        const inputs = form.querySelectorAll('input, select');
        inputs[0].value = user.name; // Full Name
        inputs[1].value = user.email; // Email
        inputs[2].value = user.role; // Role
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    deleteUser(user) {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.users = this.users.filter(u => u.id !== user.id);
            this.filteredUsers = this.filteredUsers.filter(u => u.id !== user.id);
            this.renderUsers();
            
            // Show success toast
            if (typeof showToast === 'function') {
                showToast('User Deleted', `${user.name} has been removed from the system`, 'success');
            }
        }
    }

    showUserMenu(user) {
        // Create context menu for additional actions
        console.log('Show menu for user:', user.name);
        
        // Show toast for demo
        if (typeof showToast === 'function') {
            showToast('User Menu', `Showing options for ${user.name}`, 'info');
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize users manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new UsersManager();
});
