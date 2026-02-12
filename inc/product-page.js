/* Product page actions: Add to Cart and Buy Now. */
(function () {
  var detailSection = document.querySelector('.product-details[productid]');
  if (!detailSection || !window.Store) {
    return;
  }

  var productId = detailSection.getAttribute('productid');
  if (!productId || !window.Store.products[productId]) {
    return;
  }

  function handleAddToCart(event, goToCart) {
    event.preventDefault();
    window.Store.addItem(productId, 1);
    if (goToCart) {
      window.location.href = 'cart.html';
    }
  }

  var addBtn = document.querySelector('.js-add-to-cart');
  var buyBtn = document.querySelector('.js-buy-now');

  if (addBtn) {
    addBtn.addEventListener('click', function (event) {
      handleAddToCart(event, false);
      addBtn.textContent = 'Added';
      setTimeout(function () {
        addBtn.textContent = 'Add to Cart';
      }, 900);
    });
  }

  if (buyBtn) {
    buyBtn.addEventListener('click', function (event) {
      handleAddToCart(event, true);
    });
  }
})();
