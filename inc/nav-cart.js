/* Registration Number: REPLACE_WITH_YOUR_REG_NO */
/* Updates the cart quantity badge in the main navigation. */
(function () {
  var BADGE_SELECTOR = '.nav-cart-count';
  var STORAGE_KEY = 'business_name_cart_v1';

  function getCount() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items)) {
        return 0;
      }
      return items.reduce(function (sum, item) {
        var qty = Number(item.quantity || 0);
        return sum + (Number.isFinite(qty) && qty > 0 ? qty : 0);
      }, 0);
    } catch (error) {
      return 0;
    }
  }

  function render() {
    var count = getCount();
    var badges = document.querySelectorAll(BADGE_SELECTOR);
    badges.forEach(function (badge) {
      badge.textContent = String(count);
      badge.hidden = count === 0;
    });
  }

  window.addEventListener('storage', render);
  window.addEventListener('cart:updated', render);
  render();
})();
