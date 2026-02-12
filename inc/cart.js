// Registration - SPARK35605 //
/* Renders cart from localStorage and supports edit/remove actions. */
(function () {
  var cartTable = document.querySelector('.cart-table');
  if (!cartTable || !window.Store) {
    return;
  }

  var tbody = cartTable.querySelector('tbody');
  var totalNode = document.getElementById('cart-total');
  var emptyState = document.getElementById('cart-empty');

  function formatMoney(value) {
    return '£' + Number(value).toFixed(2);
  }

  function renderRows() {
    var items = window.Store.readCart();
    tbody.innerHTML = '';

    if (!items.length) {
      emptyState.hidden = false;
      totalNode.textContent = '£0.00';
      return;
    }

    emptyState.hidden = true;

    items.forEach(function (item) {
      var lineTotal = item.price * item.quantity;
      var row = document.createElement('tr');
      row.setAttribute('data-id', item.id);
      row.innerHTML =
        '<td>' + item.title + '</td>' +
        '<td>' + formatMoney(item.price) + '</td>' +
        '<td><input type="number" min="1" value="' + item.quantity + '" aria-label="Quantity for ' + item.title + '"></td>' +
        '<td class="line-total">' + formatMoney(lineTotal) + '</td>' +
        '<td><button class="btn-small remove-item" type="button">Remove</button></td>';
      tbody.appendChild(row);
    });

    updateTotal();
  }

  function updateTotal() {
    var items = window.Store.readCart();
    var total = items.reduce(function (sum, item) {
      return sum + item.price * item.quantity;
    }, 0);
    totalNode.textContent = formatMoney(total);
  }

  tbody.addEventListener('input', function (event) { // FIXME it loses focus after i type one number, meaning if someone wants to order some specific amount they have to keep clicking inside in the box
    if (!event.target.matches('input[type="number"]')) {
      return;
    }

    var row = event.target.closest('tr');
    if (!row) {
      return;
    }

    var data-productid = row.getAttribute('data-id');
    var qty = Number(event.target.value);

    if (!Number.isFinite(qty) || qty < 1) {
      qty = 1;
      event.target.value = '1';
    }

    window.Store.updateQuantity(data-productid, qty);
    renderRows();
  });

  tbody.addEventListener('click', function (event) {
    if (!event.target.matches('.remove-item')) {
      return;
    }

    var row = event.target.closest('tr');
    if (!row) {
      return;
    }

    window.Store.removeItem(row.getAttribute('data-id'));
    renderRows();
  });

  renderRows();
})();

