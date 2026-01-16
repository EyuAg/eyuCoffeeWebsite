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
    
   
});