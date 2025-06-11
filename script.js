function getCartKey() {
    const emailsodienthoai = localStorage.getItem("emailsodienthoai") || "guest";
    return `cart_${emailsodienthoai}`;
}

function getOrderHistoryKey() {
    const emailsodienthoai = localStorage.getItem("emailsodienthoai") || "guest";
    return `order_history_${emailsodienthoai}`;
}

function addToCart(id, name, price, image) {
    const emailsodienthoai = localStorage.getItem("emailsodienthoai");
    if (!emailsodienthoai || emailsodienthoai === "guest") {
        hienthithongbao("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", 1000, "error");
        return;
    }

    let cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1, selected: false });
    }
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    updateCartCount();
    hienthithongbao("Đã thêm vào giỏ hàng!", 1000, "success");
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    cart.splice(index, 1);
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateCartItemQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    cart[index].quantity = parseInt(quantity);
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function toggleSelectItem(index, isSelected) {
    let cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    cart[index].selected = isSelected;
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    renderCart();
}

function toggleSelectAll(isSelected) {
    let cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    cart.forEach(item => item.selected = isSelected);
    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    localStorage.setItem(getCartKey(), JSON.stringify([]));
    renderCart();
    updateCartCount();
    hienthithongbao("Đã xóa toàn bộ giỏ hàng!", 1000, "success");
}

function checkout() {
    const emailsodienthoai = localStorage.getItem("emailsodienthoai");
    if (!emailsodienthoai || emailsodienthoai === "guest") {
        hienthithongbao("Vui lòng đăng nhập để thanh toán!", 1000, "error");
        return;
    }

    const cart = JSON.parse(localStorage.getItem(getCartKey()) || "[]");
    const selectedItems = cart.filter(item => item.selected);
    if (selectedItems.length === 0) {
        hienthithongbao("Vui lòng chọn sản phẩm để thanh toán!", 1000, "error");
        return;
    }

    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let orderHistory = JSON.parse(localStorage.getItem(getOrderHistoryKey()) || "[]");
    const date = new Date().toLocaleString('vi-VN');
    orderHistory.push({ date, items: selectedItems, total });
    localStorage.setItem(getOrderHistoryKey(), JSON.stringify(orderHistory));

    const remainingItems = cart.filter(item => !item.selected);
    localStorage.setItem(getCartKey(), JSON.stringify(remainingItems));
    renderCart();
    updateCartCount();
    hienthithongbao("Thanh toán thành công!", 1000, "success");
}

function hienthithongbao(message, duration, type) {
    const thongbao = document.createElement('div');
    thongbao.className = `thongbao ${type}`;
    thongbao.textContent = message;
    document.body.appendChild(thongbao);
    setTimeout(() => {
        thongbao.classList.add('show');
        setTimeout(() => {
            thongbao.classList.remove('show');
            setTimeout(() => thongbao.remove(), 300);
        }, duration);
    }, 100);
}