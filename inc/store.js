/* Registration Number: REPLACE_WITH_YOUR_REG_NO */
/* Shared store helpers for localStorage cart handling. */
(function (window) {
  var STORAGE_KEY = 'business_name_cart_v1';

  var products = {
    'ART-1001': { id: 'ART-1001', title: 'Nocturne Print', price: 49.0, image: 'images/product-1.jpg' },
    'MER-2020': { id: 'MER-2020', title: 'Studio Mug', price: 18.0, image: 'images/product-2.jpg' },
    'MER-2030': { id: 'MER-2030', title: 'Signal Tee', price: 26.0, image: 'images/product-3.jpg' },
    'MER-2040': { id: 'MER-2040', title: 'Postcard Set', price: 15.0, image: 'images/product-4.jpg' },
    'MER-2050': { id: 'MER-2050', title: 'Archive Tote', price: 22.0, image: 'images/product-5.jpg' }
  };

  function readCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cart:updated'));
  }

  function addItem(productId, quantity) {
    var qty = Number(quantity || 1);
    if (!products[productId] || qty < 1) {
      return;
    }

    var items = readCart();
    var existing = items.find(function (item) {
      return item.id === productId;
    });

    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({
        id: productId,
        title: products[productId].title,
        price: products[productId].price,
        image: products[productId].image,
        quantity: qty
      });
    }

    writeCart(items);
  }

  function updateQuantity(productId, quantity) {
    var qty = Number(quantity);
    var items = readCart();

    if (!Number.isFinite(qty) || qty < 1) {
      items = items.filter(function (item) {
        return item.id !== productId;
      });
    } else {
      items.forEach(function (item) {
        if (item.id === productId) {
          item.quantity = Math.floor(qty);
        }
      });
    }

    writeCart(items);
  }

  function removeItem(productId) {
    var items = readCart().filter(function (item) {
      return item.id !== productId;
    });
    writeCart(items);
  }

  function clearCart() {
    writeCart([]);
  }

  window.Store = {
    STORAGE_KEY: STORAGE_KEY,
    products: products,
    readCart: readCart,
    writeCart: writeCart,
    addItem: addItem,
    updateQuantity: updateQuantity,
    removeItem: removeItem,
    clearCart: clearCart
  };
})(window);
