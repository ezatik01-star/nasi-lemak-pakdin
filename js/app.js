/**
 * Nasi Lemak Pak Din - Application Logic (Vanilla JS)
 * Fitur: Filter Menu, Pencarian Real-Time, Keranjang Belanja, Voucher KLINK10, dan Pemesanan WhatsApp
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const state = {
    cart: JSON.parse(localStorage.getItem("pakdin_cart")) || [],
    activeCategory: "all",
    searchQuery: "",
    appliedPromo: JSON.parse(localStorage.getItem("pakdin_promo")) || null
  };

  // =========================================================================
  // DOM ELEMENTS
  // =========================================================================
  const menuContainer = document.getElementById("menuContainer");
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const filterPills = document.querySelectorAll(".filter-pill");
  const cartBadges = document.querySelectorAll(".cart-count-badge");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartEmptyState = document.getElementById("cartEmptyState");
  const cartContentArea = document.getElementById("cartContentArea");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountRow = document.getElementById("cartDiscountRow");
  const cartDiscountAmountEl = document.getElementById("cartDiscountAmount");
  const cartTotalEl = document.getElementById("cartTotal");
  const promoInput = document.getElementById("promoInput");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoAlert = document.getElementById("promoAlert");
  const customerNameInput = document.getElementById("customerName");
  const customerUnitInput = document.getElementById("customerUnit");
  const orderNotesInput = document.getElementById("orderNotes");
  const btnSubmitWhatsapp = document.getElementById("btnSubmitWhatsapp");
  const toastContainer = document.getElementById("toastContainer");

  // Bootstrap offcanvas instance
  const cartOffcanvasEl = document.getElementById("cartOffcanvas");
  let cartOffcanvas = null;
  if (cartOffcanvasEl && typeof bootstrap !== "undefined") {
    cartOffcanvas = new bootstrap.Offcanvas(cartOffcanvasEl);
  }

  // =========================================================================
  // MENU RENDERING & FILTERING
  // =========================================================================

  function renderMenu() {
    if (!menuContainer) return;

    const filtered = MENU_ITEMS.filter((item) => {
      const matchCategory =
        state.activeCategory === "all" || item.category === state.activeCategory;
      const q = state.searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div class="col-12">
          <div class="empty-search-state py-5 text-center">
            <div class="empty-search-icon mb-3">
              <i class="bi bi-search display-4 text-muted"></i>
            </div>
            <h4 class="font-heading mb-2">Menu Tidak Ditemukan</h4>
            <p class="text-muted mb-3">Tidak ada menu yang sesuai dengan pencarian "<strong>${escapeHtml(
              state.searchQuery
            )}</strong>".</p>
            <button class="btn btn-pakdin-outline btn-sm" id="btnResetFilter">
              <i class="bi bi-arrow-counterclockwise me-1"></i> Tampilkan Semua Menu
            </button>
          </div>
        </div>
      `;
      const btnReset = document.getElementById("btnResetFilter");
      if (btnReset) {
        btnReset.addEventListener("click", () => {
          state.searchQuery = "";
          state.activeCategory = "all";
          if (searchInput) searchInput.value = "";
          if (searchClearBtn) searchClearBtn.style.display = "none";
          updatePillUI();
          renderMenu();
        });
      }
      return;
    }

    menuContainer.innerHTML = filtered
      .map((item) => {
        const badgeColor = item.isFavorite ? "bg-gold text-dark" : "bg-primary-pakdin text-white";
        return `
          <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="menu-card h-100">
              <div class="menu-card-img-wrap">
                <img 
                  src="${item.image}" 
                  alt="${escapeHtml(item.name)}" 
                  loading="lazy"
                  onerror="this.onerror=null; this.src='${item.photoUrl}';"
                />
                ${
                  item.badge
                    ? `<span class="menu-badge-top ${badgeColor}">${item.badge}</span>`
                    : ""
                }
                <span class="menu-badge-category">
                  <i class="bi ${item.category === "makanan" ? "bi-egg-fried" : "bi-cup-hot"} me-1"></i>
                  ${item.categoryLabel}
                </span>
              </div>
              <div class="menu-card-body">
                <h3 class="menu-card-title">${escapeHtml(item.name)}</h3>
                <p class="menu-card-desc">${escapeHtml(item.description)}</p>
                <div class="menu-card-footer">
                  <span class="menu-card-price">${formatRupiah(item.price)}</span>
                  <button 
                    class="btn-add-cart" 
                    data-id="${item.id}"
                    aria-label="Tambah ${escapeHtml(item.name)} ke keranjang"
                  >
                    <i class="bi bi-plus-circle me-1"></i> Tambah
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    // Attach event listeners to Add to Cart buttons
    menuContainer.querySelectorAll(".btn-add-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = btn.getAttribute("data-id");
        addToCart(id);
        // Visual button animation feedback
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<i class="bi bi-check-circle-fill me-1 text-success"></i> Masuk!`;
        btn.classList.add("bg-primary-pakdin", "text-white");
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove("bg-primary-pakdin", "text-white");
        }, 900);
      });
    });
  }

  function updatePillUI() {
    filterPills.forEach((pill) => {
      if (pill.getAttribute("data-category") === state.activeCategory) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  // Search input events
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = state.searchQuery.length > 0 ? "block" : "none";
      }
      renderMenu();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      state.searchQuery = "";
      searchInput.value = "";
      searchClearBtn.style.display = "none";
      renderMenu();
      searchInput.focus();
    });
  }

  // Filter pill events
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      state.activeCategory = pill.getAttribute("data-category");
      updatePillUI();
      renderMenu();
    });
  });

  // =========================================================================
  // CART OPERATIONS
  // =========================================================================

  function saveCart() {
    localStorage.setItem("pakdin_cart", JSON.stringify(state.cart));
    localStorage.setItem("pakdin_promo", JSON.stringify(state.appliedPromo));
    updateCartUI();
  }

  function addToCart(itemId) {
    const menuItem = MENU_ITEMS.find((m) => m.id === itemId);
    if (!menuItem) return;

    const existingIndex = state.cart.findIndex((item) => item.id === itemId);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        image: menuItem.image,
        category: menuItem.category,
        qty: 1
      });
    }

    saveCart();
    showToast(`"${menuItem.name}" berhasil ditambahkan ke keranjang!`, "success");
  }

  function updateQuantity(itemId, change) {
    const itemIndex = state.cart.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return;

    state.cart[itemIndex].qty += change;
    if (state.cart[itemIndex].qty <= 0) {
      state.cart.splice(itemIndex, 1);
    }
    saveCart();
  }

  function removeFromCart(itemId) {
    const itemIndex = state.cart.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return;
    const removedName = state.cart[itemIndex].name;
    state.cart.splice(itemIndex, 1);
    saveCart();
    showToast(`"${removedName}" dihapus dari keranjang`, "info");
  }

  function calculateCartTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let discount = 0;

    if (state.appliedPromo && state.appliedPromo.code === CONFIG.promo.code && subtotal > 0) {
      discount = Math.round((subtotal * CONFIG.promo.discountPercent) / 100);
    } else if (subtotal === 0) {
      discount = 0;
    }

    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

    // Update Badge in Navbar & Mobile FAB
    cartBadges.forEach((badge) => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.style.display = "inline-flex";
      } else {
        badge.textContent = "0";
      }
    });

    if (state.cart.length === 0) {
      if (cartEmptyState) cartEmptyState.classList.remove("d-none");
      if (cartContentArea) cartContentArea.classList.add("d-none");
      return;
    }

    if (cartEmptyState) cartEmptyState.classList.add("d-none");
    if (cartContentArea) cartContentArea.classList.remove("d-none");

    // Render items list
    if (cartItemsList) {
      cartItemsList.innerHTML = state.cart
        .map((item) => {
          const itemTotal = item.price * item.qty;
          return `
            <div class="cart-item-row">
              <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-img" />
              <div class="cart-item-details">
                <div class="cart-item-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
                <div class="cart-item-unit-price">${formatRupiah(item.price)}</div>
                <div class="cart-qty-controller">
                  <button class="btn-qty btn-minus" data-id="${item.id}" aria-label="Kurangi">-</button>
                  <span class="cart-qty-num">${item.qty}</span>
                  <button class="btn-qty btn-plus" data-id="${item.id}" aria-label="Tambah">+</button>
                </div>
              </div>
              <div class="cart-item-actions">
                <div class="cart-item-subtotal">${formatRupiah(itemTotal)}</div>
                <button class="btn-remove-item" data-id="${item.id}" title="Hapus menu">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          `;
        })
        .join("");

      // Bind controllers
      cartItemsList.querySelectorAll(".btn-minus").forEach((btn) => {
        btn.addEventListener("click", () => updateQuantity(btn.getAttribute("data-id"), -1));
      });
      cartItemsList.querySelectorAll(".btn-plus").forEach((btn) => {
        btn.addEventListener("click", () => updateQuantity(btn.getAttribute("data-id"), 1));
      });
      cartItemsList.querySelectorAll(".btn-remove-item").forEach((btn) => {
        btn.addEventListener("click", () => removeFromCart(btn.getAttribute("data-id")));
      });
    }

    // Update Totals
    const { subtotal, discount, total } = calculateCartTotals();
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatRupiah(subtotal);

    if (discount > 0 && cartDiscountRow && cartDiscountAmountEl) {
      cartDiscountRow.classList.remove("d-none");
      cartDiscountAmountEl.textContent = `-${formatRupiah(discount)}`;
    } else if (cartDiscountRow) {
      cartDiscountRow.classList.add("d-none");
    }

    if (cartTotalEl) cartTotalEl.textContent = formatRupiah(total);

    // Update Promo Badge display
    renderPromoBadgeState();
  }

  // =========================================================================
  // PROMO VOUCHER (KLINK10)
  // =========================================================================

  function renderPromoBadgeState() {
    if (!promoAlert) return;

    if (state.appliedPromo && state.appliedPromo.code === CONFIG.promo.code) {
      promoAlert.innerHTML = `
        <div class="promo-applied-badge">
          <span><i class="bi bi-check2-circle me-1"></i> <strong>KLINK10</strong> aktif (Diskon 10%)</span>
          <button type="button" class="btn btn-sm btn-link text-danger p-0 text-decoration-none fw-bold" id="btnRemovePromo">
            Batal
          </button>
        </div>
      `;
      promoAlert.classList.remove("d-none");
      if (promoInput) {
        promoInput.value = CONFIG.promo.code;
        promoInput.disabled = true;
      }
      if (applyPromoBtn) {
        applyPromoBtn.disabled = true;
      }

      const btnRemovePromo = document.getElementById("btnRemovePromo");
      if (btnRemovePromo) {
        btnRemovePromo.addEventListener("click", () => {
          state.appliedPromo = null;
          saveCart();
          if (promoInput) {
            promoInput.value = "";
            promoInput.disabled = false;
          }
          if (applyPromoBtn) {
            applyPromoBtn.disabled = false;
          }
          promoAlert.classList.add("d-none");
          showToast("Voucher diskon dihapus", "info");
        });
      }
    } else {
      promoAlert.classList.add("d-none");
      if (promoInput) promoInput.disabled = false;
      if (applyPromoBtn) applyPromoBtn.disabled = false;
    }
  }

  function applyPromoCode(code) {
    const cleanedCode = (code || "").trim().toUpperCase();

    if (!cleanedCode) {
      showToast("Silakan masukkan kode voucher terlebih dahulu.", "warning");
      return;
    }

    if (cleanedCode === CONFIG.promo.code) {
      state.appliedPromo = {
        code: CONFIG.promo.code,
        discountPercent: CONFIG.promo.discountPercent,
        description: CONFIG.promo.description
      };
      saveCart();
      showToast("🎉 Diskon 10% Komunitas K-Link Tower Berhasil Digunakan!", "success");
    } else {
      showToast("Kode voucher tidak valid. Gunakan kode: KLINK10", "danger");
    }
  }

  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener("click", () => {
      applyPromoCode(promoInput.value);
    });

    promoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyPromoCode(promoInput.value);
      }
    });
  }

  // Quick Apply or Copy Promo Button on Promo Banner
  const btnCopyPromo = document.getElementById("btnCopyPromo");
  if (btnCopyPromo) {
    btnCopyPromo.addEventListener("click", () => {
      navigator.clipboard
        .writeText(CONFIG.promo.code)
        .then(() => {
          showToast(`Kode "${CONFIG.promo.code}" berhasil disalin! Silakan gunakan di keranjang belanja.`, "success");
          // Pre-fill input
          if (promoInput) promoInput.value = CONFIG.promo.code;
        })
        .catch(() => {
          showToast(`Gunakan kode promo: ${CONFIG.promo.code}`, "info");
        });
    });
  }

  const btnApplyPromoDirect = document.getElementById("btnApplyPromoDirect");
  if (btnApplyPromoDirect) {
    btnApplyPromoDirect.addEventListener("click", () => {
      applyPromoCode(CONFIG.promo.code);
      if (cartOffcanvas) {
        cartOffcanvas.show();
      }
    });
  }

  // =========================================================================
  // WHATSAPP ORDER GENERATOR
  // =========================================================================

  function generateWhatsAppMessage() {
    const customerName = (customerNameInput ? customerNameInput.value : "").trim();
    const customerUnit = (customerUnitInput ? customerUnitInput.value : "").trim() || "Dine-in / Ambil di Lobi";
    const orderNotes = (orderNotesInput ? orderNotesInput.value : "").trim() || "-";

    if (!customerName) {
      if (customerNameInput) {
        customerNameInput.focus();
        customerNameInput.classList.add("is-invalid");
      }
      showToast("Mohon lengkapi Nama Pemesan sebelum mengirim order.", "warning");
      return null;
    } else if (customerNameInput) {
      customerNameInput.classList.remove("is-invalid");
    }

    if (state.cart.length === 0) {
      showToast("Keranjang Anda masih kosong. Silakan pilih menu dulu.", "warning");
      return null;
    }

    const { subtotal, discount, total } = calculateCartTotals();

    // Build Formatted Message
    let msg = `*PESANAN NASI LEMAK PAK DIN*\n`;
    msg += `_Nasi Lemak Number 1 Jakarta_\n`;
    msg += `📍 Lobby K-Link Tower, Jakarta Selatan\n`;
    msg += `====================================\n\n`;

    msg += `👤 *DATA PEMESAN:*\n`;
    msg += `• *Nama Pemesan:* ${customerName}\n`;
    msg += `• *Unit / Lantai:* ${customerUnit}\n`;
    msg += `• *Catatan Pesanan:* ${orderNotes}\n\n`;

    msg += `📋 *RINCIAN MENU:*\n`;
    state.cart.forEach((item, index) => {
      const lineSubtotal = formatRupiah(item.price * item.qty);
      msg += `${index + 1}. *${item.name}*\n`;
      msg += `   └ ${item.qty}x @ ${formatRupiah(item.price)} = ${lineSubtotal}\n`;
    });

    msg += `\n====================================\n`;
    msg += `💰 *RINCIAN BIAYA:*\n`;
    msg += `• Subtotal: ${formatRupiah(subtotal)}\n`;
    if (discount > 0) {
      msg += `• Diskon Voucher (KLINK10 - 10%): -${formatRupiah(discount)}\n`;
    }
    msg += `• *TOTAL AKHIR: ${formatRupiah(total)}*\n`;
    msg += `====================================\n\n`;

    msg += `Halo Pak Din, mohon konfirmasi pesanan saya di atas ya. Apakah stok menu tersedia? Terima kasih! 🙏`;

    return msg;
  }

  if (btnSubmitWhatsapp) {
    btnSubmitWhatsapp.addEventListener("click", (e) => {
      e.preventDefault();
      const message = generateWhatsAppMessage();
      if (!message) return;

      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(waUrl, "_blank", "noopener,noreferrer");

      showToast("Menghubungkan ke WhatsApp Pak Din... Terima kasih!", "success");
    });
  }

  // Input validation reset on typing
  if (customerNameInput) {
    customerNameInput.addEventListener("input", () => {
      if (customerNameInput.value.trim()) {
        customerNameInput.classList.remove("is-invalid");
      }
    });
  }

  // =========================================================================
  // TOAST NOTIFICATION HELPER
  // =========================================================================

  function showToast(message, type = "info") {
    if (!toastContainer) return;

    const iconMap = {
      success: "bi-check-circle-fill text-success",
      warning: "bi-exclamation-triangle-fill text-warning",
      danger: "bi-x-circle-fill text-danger",
      info: "bi-info-circle-fill text-info"
    };

    const icon = iconMap[type] || iconMap.info;
    const toastId = "toast_" + Date.now();

    const toastEl = document.createElement("div");
    toastEl.className = "toast toast-pakdin align-items-center mb-2 show shadow";
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");
    toastEl.id = toastId;

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icon} fs-5"></i>
          <span>${escapeHtml(message)}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => {
        if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
      }, 300);
    }, 3500);

    // Close button event
    const closeBtn = toastEl.querySelector(".btn-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        toastEl.classList.remove("show");
        setTimeout(() => {
          if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
        }, 300);
      });
    }
  }

  // Helper Escape HTML
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // =========================================================================
  // MISC & INITIALIZATION
  // =========================================================================

  // Update Dynamic Year in Footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Initial renders
  renderMenu();
  updateCartUI();

  // Check URL param for auto promo (e.g., ?promo=KLINK10)
  const urlParams = new URLSearchParams(window.location.search);
  const promoParam = urlParams.get("promo");
  if (promoParam && promoParam.toUpperCase() === CONFIG.promo.code) {
    applyPromoCode(promoParam);
  }
});
