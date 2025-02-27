document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const navTabs = document.querySelectorAll('.nav-tab');
  const productCards = document.querySelectorAll('.product-card');
  const favoriteButtons = document.querySelectorAll('.favorite');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const shopNowButton = document.querySelector('.shop-btn');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');
  const cartModal = document.querySelector('.cart-modal');
  const closeCartButton = document.querySelector('.close-cart');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalAmountElement = document.querySelector('.total-amount');
  const checkoutButton = document.querySelector('.checkout-btn');

  // Cart state
  let cart = [];
  let totalAmount = 0;

  // Tab functionality
  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      navTabs.forEach((t) => t.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      // Show all products if 'all' category selected, otherwise filter
      if (category === 'all') {
        productCards.forEach((card) => {
          card.style.display = 'block';
        });
      } else {
        productCards.forEach((card) => {
          if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });

  // Favorite button functionality
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.textContent === '♡') {
        button.textContent = '❤';
        button.classList.add('active');
        showNotification('Added to favorites!');
      } else {
        button.textContent = '♡';
        button.classList.remove('active');
        showNotification('Removed from favorites');
      }
    });
  });

  // Add to cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      const productTitle =
        productCard.querySelector('.product-title').textContent;
      const productPrice = parseFloat(
        productCard.querySelector('.price').textContent.replace('$', '')
      );
      const productImage = productCard.querySelector('.product-image img').src;

      // Check if product already in cart
      const existingItemIndex = cart.findIndex(
        (item) => item.title === productTitle
      );

      if (existingItemIndex !== -1) {
        // Increment quantity if already in cart
        cart[existingItemIndex].quantity += 1;
        showNotification(`Added another ${productTitle} to cart`);
      } else {
        // Add new item to cart
        cart.push({
          title: productTitle,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
        showNotification(`${productTitle} added to cart!`);
      }

      // Update cart display
      updateCart();

      // Open cart modal
      cartModal.classList.add('open');
    });
  });

  // Shop now button
  shopNowButton.addEventListener('click', () => {
    // Scroll to products section
    const productsContainer = document.querySelector('.products-container');
    productsContainer.scrollIntoView({ behavior: 'smooth' });

    // Highlight the container briefly
    productsContainer.classList.add('highlight');
    setTimeout(() => {
      productsContainer.classList.remove('highlight');
    }, 1000);
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('active');
  });

  // Close cart modal
  closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('open');
  });

  // Update cart function
  function updateCart() {
    // Clear current cart items
    cartItemsContainer.innerHTML = '';

    // Reset total amount
    totalAmount = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Your cart is empty</p>';
      totalAmountElement.textContent = '$0.00';
      checkoutButton.disabled = true;
    } else {
      // Add each item to cart display
      cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="item-details">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="item-actions">
                        <button class="quantity-btn" data-action="decrease" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
                        <button class="remove-btn" data-index="${index}">×</button>
                    </div>
                `;

        cartItemsContainer.appendChild(cartItem);
      });

      // Update total amount
      totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
      checkoutButton.disabled = false;
    }
  }

  // Handle cart item quantity changes and removal
  cartItemsContainer.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('quantity-btn') ||
      e.target.classList.contains('remove-btn')
    ) {
      const index = parseInt(e.target.getAttribute('data-index'));

      if (e.target.classList.contains('remove-btn')) {
        // Remove item from cart
        const removedItem = cart[index];
        cart.splice(index, 1);
        showNotification(`${removedItem.title} removed from cart`);
      } else if (e.target.classList.contains('quantity-btn')) {
        const action = e.target.getAttribute('data-action');

        if (action === 'decrease') {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            // Remove if quantity would be 0
            const removedItem = cart[index];
            cart.splice(index, 1);
            showNotification(`${removedItem.title} removed from cart`);
          }
        } else if (action === 'increase') {
          cart[index].quantity += 1;
        }
      }

      updateCart();
    }
  });

  // Checkout button
  checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
      alert('Thank you for your purchase! Your order has been placed.');
      cart = [];
      updateCart();
      cartModal.classList.remove('open');
    }
  });

  // Notification function
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Initialize cart display
  updateCart();
});
