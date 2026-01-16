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
    
    // 4. ADD TO CART FUNCTIONALITY
    const cartButton = document.createElement('button');
    cartButton.id = 'cart-button';
    cartButton.innerHTML = '<i class="fas fa-shopping-cart"></i> <span id="cart-count">0</span>';
    cartButton.style.position = 'fixed';
    cartButton.style.bottom = '30px';
    cartButton.style.left = '30px';
    cartButton.style.backgroundColor = 'var(--primary)';
    cartButton.style.color = 'white';
    cartButton.style.border = 'none';
    cartButton.style.borderRadius = '50%';
    cartButton.style.width = '60px';
    cartButton.style.height = '60px';
    cartButton.style.fontSize = '20px';
    cartButton.style.cursor = 'pointer';
    cartButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    cartButton.style.zIndex = '999';
    cartButton.style.display = 'flex';
    cartButton.style.alignItems = 'center';
    cartButton.style.justifyContent = 'center';
    
    // Cart count badge
    const cartCount = cartButton.querySelector('#cart-count');
    cartCount.style.position = 'absolute';
    cartCount.style.top = '-5px';
    cartCount.style.right = '-5px';
    cartCount.style.backgroundColor = 'var(--secondary)';
    cartCount.style.color = 'white';
    cartCount.style.borderRadius = '50%';
    cartCount.style.width = '24px';
    cartCount.style.height = '24px';
    cartCount.style.fontSize = '14px';
    cartCount.style.display = 'flex';
    cartCount.style.alignItems = 'center';
    cartCount.style.justifyContent = 'center';
    cartCount.style.fontWeight = 'bold';
    
    document.body.appendChild(cartButton);
    
    let cart = [];
    
    cartButton.addEventListener('click', function() {
        showCartModal();
    });
    
    function addToCart(itemName, price) {
        cart.push({ name: itemName, price: price });
        updateCartCount();
        showToast(`Added ${itemName} to cart!`);
    }
    
    function updateCartCount() {
        cartCount.textContent = cart.length;
        // Add animation
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
    
    function showCartModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.id = 'cart-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.zIndex = '1001';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 8px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto;">
                <h2 style="color: var(--primary); margin-bottom: 20px;">Your Cart</h2>
                <div id="cart-items" style="margin-bottom: 20px;">
                    ${cart.length === 0 ? '<p>Your cart is empty</p>' : ''}
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button id="close-cart" style="padding: 10px 20px; background: #f0f0f0; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                    <button id="checkout-btn" style="padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Checkout (${cart.reduce((sum, item) => sum + item.price, 0)} ETB)
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Populate cart items
        const cartItemsContainer = document.getElementById('cart-items');
        if (cart.length > 0) {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                    <span>${item.name}</span>
                    <span>${item.price} ETB 
                        <button class="remove-item" data-index="${index}" style="margin-left: 10px; background: none; border: none; color: red; cursor: pointer;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </span>
                </div>
            `).join('');
        }
        
        // Close modal
        document.getElementById('close-cart').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Checkout button
        document.getElementById('checkout-btn').addEventListener('click', function() {
            if (cart.length > 0) {
                showToast('Order placed successfully! Thank you for your purchase.');
                cart = [];
                updateCartCount();
                document.body.removeChild(modal);
            } else {
                showToast('Your cart is empty!');
            }
        });
        
        // Remove item functionality
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartCount();
                showCartModal(); // Refresh modal
            });
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // 5. ENHANCE MENU ITEM CLICKS TO ADD TO CART
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const titleElement = this.querySelector('.title');
            const itemName = titleElement.textContent.split('ETB')[0].trim();
            const priceText = titleElement.querySelector('.price').textContent;
            const price = parseInt(priceText);
            
            addToCart(itemName, price);
        });
    });
    
    // 6. FOOTER SOCIAL MEDIA INTERACTION
    const socialIcons = document.querySelectorAll('.nav-socials a, .social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label') || 'social media';
            showToast(`Opening ${platform}... (demo)`);
        });
    });
    
    // 7. THEME TOGGLE (LIGHT/DARK MODE)
    if (window.location.pathname.includes('menu.html')) {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.position = 'fixed';
        themeToggle.style.top = '100px';
        themeToggle.style.right = '30px';
        themeToggle.style.backgroundColor = 'var(--primary)';
        themeToggle.style.color = 'white';
        themeToggle.style.border = 'none';
        themeToggle.style.borderRadius = '50%';
        themeToggle.style.width = '50px';
        themeToggle.style.height = '50px';
        themeToggle.style.fontSize = '18px';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        themeToggle.style.zIndex = '999';
        themeToggle.style.display = 'flex';
        themeToggle.style.alignItems = 'center';
        themeToggle.style.justifyContent = 'center';
        
        document.body.appendChild(themeToggle);
        
        let darkMode = false;
        
        themeToggle.addEventListener('click', function() {
            darkMode = !darkMode;
            
            if (darkMode) {
                document.body.style.backgroundColor = '#1a1a1a';
                document.body.style.color = '#f0f0f0';
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.style.backgroundColor = '#2a2a2a';
                    item.style.color = '#f0f0f0';
                });
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.style.backgroundColor = '#f0c040';
                themeToggle.style.color = '#333';
            } else {
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.style.backgroundColor = '';
                    item.style.color = '';
                });
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.style.backgroundColor = 'var(--primary)';
                themeToggle.style.color = 'white';
            }
        });
    }
    
    // 8. LOADING ANIMATION
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundColor = 'white';
    loadingScreen.style.zIndex = '9999';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.flexDirection = 'column';
    
    loadingScreen.innerHTML = `
        <div style="width: 60px; height: 60px; border: 5px solid #f3f3f3; border-top: 5px solid var(--primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: 20px; color: var(--primary); font-weight: bold;">EYU COFFEE</p>
    `;
    
    // Add spinner animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.prepend(loadingScreen);
    
    // Hide loading screen after page loads
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
    
    console.log('JavaScript functionality loaded successfully!');
});