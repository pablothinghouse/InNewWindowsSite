class NavigationLoader {
    static async loadNavigation() {
        try {
            const response = await fetch('navigation/navigation.json');
            if (response.ok) {
                const navItems = await response.json();
                return navItems;
            }
        } catch (error) {
            console.error('Could not load navigation:', error);
        }
        return [
            {"label": "Home", "url": "index.html"},
            {"label": "Blog", "url": "blog.html"}
        ];
    }

    static async renderNavigation() {
        const navItems = await this.loadNavigation();
        const navButtons = document.querySelector('.nav-buttons');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navButtons.innerHTML = '';
        
        navItems.forEach(item => {
            const button = document.createElement('a');
            button.href = item.url;
            button.className = 'nav-button';
            button.textContent = item.label;
            
            if (item.url === currentPage) {
                button.classList.add('active');
            }
            
            navButtons.appendChild(button);
        });

        this.setupMobileMenu(navItems, currentPage);
    }

    static setupMobileMenu(navItems, currentPage) {
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        const slideoverMenu = document.createElement('div');
        slideoverMenu.className = 'slideover-menu';
        
        navItems.forEach(item => {
            const button = document.createElement('a');
            button.href = item.url;
            button.className = 'slideover-nav-button';
            button.textContent = item.label;
            
            if (item.url === currentPage) {
                button.classList.add('active');
            }
            
            slideoverMenu.appendChild(button);
        });

        document.querySelector('.topnav').appendChild(mobileMenuButton);
        document.body.appendChild(slideoverMenu);

        mobileMenuButton.addEventListener('click', () => {
            slideoverMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!slideoverMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                slideoverMenu.classList.remove('active');
            }
        });

        document.addEventListener('scroll', () => {
            slideoverMenu.classList.remove('active');
        }, { passive: true });

        document.addEventListener('touchstart', (e) => {
            if (!slideoverMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                slideoverMenu.classList.remove('active');
            }
        }, { passive: true });
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await NavigationLoader.renderNavigation();
}); 