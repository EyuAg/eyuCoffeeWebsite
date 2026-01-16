document.addEventListener('DOMContentLoaded', function() {
    console.log('EYU Coffee Shop website loaded!');
    
    // 1. MENU ITEM INTERACTION
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Click effect - show selection
        item.addEventListener('click', function() {
            const checkIcon = this.querySelector('.fa-circle-check');
            if (checkIcon) {
                checkIcon.classList.toggle('fa-regular');
                checkIcon.classList.toggle('fa-solid');
                
                // Add to cart simulation
                const itemName = this.querySelector('.title').textContent.split('ETB')[0].trim();
                showToast(`Added ${itemName} to cart!`);
            }
        });
    });
    
    // 2. TOAST NOTIFICATION FUNCTION
    function showToast(message) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add styles
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = 'var(--primary)';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '1000';
        toast.style.fontWeight = '500';
        toast.style.animation = 'slideIn 0.3s ease';
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // 3. PRICE FILTER FOR MENU (if on menu page)
    if (window.location.pathname.includes('menu.html')) {
        const priceFilterContainer = document.createElement('div');
        priceFilterContainer.className = 'price-filter';
        priceFilterContainer.innerHTML = `
            <div style="text-align: center; margin: 30px 0;">
                <label for="priceRange" style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--primary);">
                    Filter by Price: <span id="priceValue">All Items</span>
                </label>
                <input type="range" id="priceRange" min="70" max="250" value="250" style="width: 80%; max-width: 400px;">
            </div>
        `;
        
        // Insert after menu header
        const firstMenuHeader = document.querySelector('.menu-header');
        if (firstMenuHeader) {
            firstMenuHeader.parentNode.insertBefore(priceFilterContainer, firstMenuHeader.nextSibling);
            
            const priceRange = document.getElementById('priceRange');
            const priceValue = document.getElementById('priceValue');
            
            priceRange.addEventListener('input', function() {
                const maxPrice = parseInt(this.value);
                priceValue.textContent = `Under ${maxPrice} ETB`;
                
                // Filter menu items
                menuItems.forEach(item => {
                    const priceText = item.querySelector('.price').textContent;
                    const itemPrice = parseInt(priceText);
                    
                    if (itemPrice <= maxPrice) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    }
    
    
});