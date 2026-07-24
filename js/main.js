/* ============================================================
   ONIMA — main.js
   JavaScript vanilla, sem dependências. Seletores baseados em
   classes/atributos `on-`/`data-` para portar para a Nuvemshop.
   Módulos: header, menu mobile, drawers (sacola/conta), sacola
   em localStorage, accordions, seletores, carrosséis,
   newsletter, máscara de CPF, validações e animações.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Header sticky: muda o fundo ao rolar ---------- */
  var header = document.querySelector('.on-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Trava de scroll compartilhada ---------- */
  var menu = document.querySelector('.on-menu');
  var overlay = document.querySelector('.on-overlay');
  var drawers = document.querySelectorAll('.on-drawer');

  function anyPanelOpen() {
    if (menu && menu.classList.contains('is-open')) return true;
    for (var i = 0; i < drawers.length; i++) {
      if (drawers[i].classList.contains('is-open')) return true;
    }
    return false;
  }

  function syncLock() {
    document.body.classList.toggle('on-lock', anyPanelOpen());
    var drawerOpen = false;
    drawers.forEach(function (d) { if (d.classList.contains('is-open')) drawerOpen = true; });
    if (overlay) overlay.classList.toggle('is-open', drawerOpen);
  }

  /* ---------- 3. Menu mobile (overlay full-screen) ---------- */
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    syncLock();
  }

  document.querySelectorAll('[data-menu-open]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeDrawers();
      setMenu(true);
    });
  });
  document.querySelectorAll('[data-menu-close]').forEach(function (btn) {
    btn.addEventListener('click', function () { setMenu(false); });
  });
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target === menu) setMenu(false);
    });
  }

  /* ---------- 4. Drawers laterais (Sacola e Conta) ---------- */
  function closeDrawers() {
    drawers.forEach(function (d) {
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
    });
    syncLock();
  }

  function openDrawer(name) {
    setMenu(false);
    drawers.forEach(function (d) {
      var match = d.getAttribute('data-drawer') === name;
      d.classList.toggle('is-open', match);
      d.setAttribute('aria-hidden', String(!match));
    });
    if (name === 'cart') renderCartDrawer();
    syncLock();
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-drawer-open]');
    if (opener) {
      e.preventDefault();
      openDrawer(opener.getAttribute('data-drawer-open'));
      return;
    }
    var closer = e.target.closest('[data-drawer-close]');
    if (closer) {
      e.preventDefault();
      closeDrawers();
    }
  });

  if (overlay) overlay.addEventListener('click', closeDrawers);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      closeDrawers();
    }
  });

  /* ---------- 5. Sacola (localStorage estruturado) ---------- */
  var CART_KEY = 'onimaCart';
  localStorage.removeItem('onimaCartCount'); // chave antiga (v1)

  function getCart() {
    try {
      var cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(cart) ? cart : [];
    } catch (err) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCartCount();
  }

  function cartQty(cart) {
    return cart.reduce(function (sum, item) { return sum + (item.qty || 0); }, 0);
  }

  function formatBRL(value) {
    return 'R$ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function renderCartCount() {
    var n = cartQty(getCart());
    document.querySelectorAll('.on-cart-count').forEach(function (el) {
      el.textContent = String(n);
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderCartDrawer() {
    var drawer = document.querySelector('[data-drawer="cart"]');
    if (!drawer) return;
    var cart = getCart();
    var itemsEl = drawer.querySelector('[data-cart-items]');
    var emptyEl = drawer.querySelector('[data-cart-empty]');
    var labelEl = drawer.querySelector('[data-cart-label]');
    var subtotalEl = drawer.querySelector('[data-cart-subtotal]');
    var footerEl = drawer.querySelector('.on-cart__footer');
    var countLabelEl = drawer.querySelector('.on-cart__count-label');

    var isEmpty = cart.length === 0;
    if (emptyEl) emptyEl.hidden = !isEmpty;
    if (itemsEl) itemsEl.hidden = isEmpty;
    if (footerEl) footerEl.hidden = isEmpty;
    if (countLabelEl) countLabelEl.hidden = isEmpty;

    if (labelEl) {
      var n = cartQty(cart);
      labelEl.textContent = n + (n === 1 ? ' item' : ' itens');
    }

    var subtotal = cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);
    if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);

    if (!itemsEl) return;
    itemsEl.innerHTML = cart.map(function (item, idx) {
      var options = '';
      for (var q = 1; q <= 5; q++) {
        options += '<option value="' + q + '"' + (item.qty === q ? ' selected' : '') + '>' + q + '</option>';
      }
      return (
        '<div class="on-cart-item">' +
          '<img class="on-cart-item__thumb" src="' + escapeHtml(item.img) + '" alt="' + escapeHtml(item.name) + '">' +
          '<div>' +
            '<p class="on-cart-item__name">' + escapeHtml(item.name) + '</p>' +
            '<p class="on-cart-item__price">' + formatBRL(item.price) + '</p>' +
            '<p class="on-cart-item__meta">Cor: ' + escapeHtml(item.color) + '<br>Tamanho: ' + escapeHtml(item.size) + '</p>' +
            '<div class="on-cart-item__controls">' +
              '<select class="on-cart-item__qty" data-cart-qty="' + idx + '" aria-label="Quantidade">' + options + '</select>' +
              '<button class="on-cart-item__remove" type="button" data-cart-remove="' + idx + '">Remover</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  document.addEventListener('change', function (e) {
    var select = e.target.closest('[data-cart-qty]');
    if (!select) return;
    var cart = getCart();
    var idx = parseInt(select.getAttribute('data-cart-qty'), 10);
    if (cart[idx]) {
      cart[idx].qty = parseInt(select.value, 10) || 1;
      saveCart(cart);
      renderCartDrawer();
    }
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cart-remove]');
    if (!btn) return;
    var cart = getCart();
    cart.splice(parseInt(btn.getAttribute('data-cart-remove'), 10), 1);
    saveCart(cart);
    renderCartDrawer();
  });

  /* Adicionar à sacola (página de produto) */
  document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-product-name') || 'Produto Onima';
      var price = parseFloat(btn.getAttribute('data-product-price')) || 0;
      var img = btn.getAttribute('data-product-img') || '';
      var colorEl = document.querySelector('.on-swatch.is-active');
      var sizeEl = document.querySelector('.on-size.is-active');
      var color = colorEl ? (colorEl.getAttribute('data-color') || 'Off White') : 'Off White';
      var size = sizeEl ? sizeEl.textContent.trim() : 'M';

      var cart = getCart();
      var existing = cart.find(function (item) {
        return item.name === name && item.color === color && item.size === size;
      });
      if (existing) {
        existing.qty = Math.min(existing.qty + 1, 5);
      } else {
        cart.push({ name: name, price: price, color: color, size: size, qty: 1, img: img });
      }
      saveCart(cart);
      openDrawer('cart');
    });
  });

  renderCartCount();
  renderCartDrawer();

  /* ---------- 6. Accordions: apenas um aberto por grupo ---------- */
  document.querySelectorAll('[data-accordion-group]').forEach(function (group) {
    var items = Array.prototype.slice.call(group.querySelectorAll('.on-accordion'));
    items.forEach(function (item) {
      var trigger = item.querySelector('.on-accordion__trigger');
      if (!trigger) return;
      trigger.setAttribute('aria-expanded', String(item.classList.contains('is-open')));
      trigger.addEventListener('click', function () {
        var wasOpen = item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          var t = other.querySelector('.on-accordion__trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------- 7. Seletores de cor e tamanho (estado ativo) ---------- */
  document.querySelectorAll('[data-select-group]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll('button').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  /* ---------- 8. Carrosséis (setas + arraste com mouse) ---------- */
  document.querySelectorAll('.on-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.on-carousel__track');
    if (!track) return;

    function step() {
      var item = track.children[0];
      if (!item) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item.getBoundingClientRect().width + gap;
    }

    carousel.querySelectorAll('[data-carousel-prev]').forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: -step(), behavior: 'smooth' });
      });
    });
    carousel.querySelectorAll('[data-carousel-next]').forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: step(), behavior: 'smooth' });
      });
    });

    // Arraste com o mouse (touch já rola nativamente)
    var down = false, moved = false, startX = 0, startLeft = 0;

    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = track.scrollLeft;
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) {
        moved = true;
        track.classList.add('is-dragging');
      }
      track.scrollLeft = startLeft - dx;
    });
    window.addEventListener('pointerup', function () {
      if (!down) return;
      down = false;
      setTimeout(function () { track.classList.remove('is-dragging'); }, 0);
    });
    // Evita que o arraste dispare o clique nos cards
    track.addEventListener('click', function (e) {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    }, true);
  });

  /* ---------- 9. Newsletter: validação simples de e-mail ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  document.querySelectorAll('.on-news__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var msg = form.querySelector('.on-news__msg') ||
        (form.parentElement && form.parentElement.querySelector('.on-news__msg'));
      var value = input ? input.value.trim() : '';
      var valid = EMAIL_RE.test(value);
      if (msg) {
        msg.textContent = valid
          ? 'Obrigada! Você receberá nossas novidades em breve.'
          : 'Digite um e-mail válido para se cadastrar.';
        msg.classList.toggle('is-error', !valid);
        msg.classList.add('is-visible');
      }
      if (valid) form.reset();
    });
  });

  /* ---------- 10. Máscara de CPF ---------- */
  document.querySelectorAll('[data-mask="cpf"]').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = input.value.replace(/\D/g, '').slice(0, 11);
      var masked = digits;
      if (digits.length > 9) {
        masked = digits.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
      } else if (digits.length > 6) {
        masked = digits.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
      } else if (digits.length > 3) {
        masked = digits.replace(/(\d{3})(\d{0,3})/, '$1.$2');
      }
      input.value = masked;
    });
  });

  /* ---------- 11. Formulários de login e cadastro ---------- */
  function setFieldError(form, selector, message) {
    var el = form.querySelector(selector);
    if (!el) return;
    el.textContent = message || '';
    el.classList.toggle('is-visible', Boolean(message));
  }

  document.querySelectorAll('[data-form="login"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      var senha = form.querySelector('input[type="password"]');
      var ok = true;
      if (!EMAIL_RE.test((email.value || '').trim())) {
        setFieldError(form, '.on-auth__error', 'Digite um e-mail válido.');
        ok = false;
      } else if (!(senha.value || '').trim()) {
        setFieldError(form, '.on-auth__error', 'Adicione sua senha.');
        ok = false;
      } else {
        setFieldError(form, '.on-auth__error', '');
      }
      var success = form.querySelector('.on-auth__success');
      if (success) success.classList.toggle('is-visible', ok);
      if (ok) form.reset();
    });
  });

  document.querySelectorAll('[data-form="cadastro"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var cpf = form.querySelector('[data-mask="cpf"]');
      var digits = (cpf.value || '').replace(/\D/g, '');
      var ok = digits.length === 11;
      setFieldError(form, '.on-auth__error', ok ? '' : 'Digite um CPF válido (11 dígitos).');
      var success = form.querySelector('.on-auth__success');
      if (success) success.classList.toggle('is-visible', ok);
    });
  });

  /* ---------- 12. Animação de entrada das seções ao rolar ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
