function kiemtradulieu() {
    let emailsodienthoai = document.getElementById("emailsodienthoai").value;
    let matkhau = document.getElementById("matkhau").value;
    let nhaplaimatkhau = document.getElementById("nhaplaimatkhau").value;
    let tentaikhoan = document.getElementById("tentaikhoan").value;

    let dinhdangemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let dinhdangsodienthoai = /^[0-9]{10}$/;

    if (!dinhdangemail.test(emailsodienthoai) && !dinhdangsodienthoai.test(emailsodienthoai)) {
        hienthithongbao("Email hoặc số điện thoại không hợp lệ!", 1000, "error");
        return false;
    }

    if (matkhau.length < 8) {
        hienthithongbao("Mật khẩu phải có ít nhất 8 kí tự!", 1000, "error");
        return false;
    }

    if (matkhau !== nhaplaimatkhau) {
        hienthithongbao("Mật khẩu không khớp!", 1000, "error");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(user => user.emailsodienthoai === emailsodienthoai)) {
        hienthithongbao("Email hoặc số điện thoại đã được đăng ký!", 1000, "error");
        return false;
    }

    users.push({ emailsodienthoai, matkhau, tentaikhoan });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("emailsodienthoai", emailsodienthoai);
    localStorage.setItem("tentaikhoan", tentaikhoan);

    hienthithongbao("Đăng ký thành công!", 1000, "success");
    setTimeout(() => {
        window.location.href = "dangnhap.html";
    }, 1000);
    document.title = "Đang chuyển hướng...";
    return false;
}

function kiemtradangnhap() {
    let emailsodienthoai = document.getElementById("emailsodienthoai").value;
    let matkhau = document.getElementById("matkhau").value;

    let dinhdangemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let dinhdangsodienthoai = /^[0-9]{10}$/;

    if (!dinhdangemail.test(emailsodienthoai) && !dinhdangsodienthoai.test(emailsodienthoai)) {
        hienthithongbao("Email hoặc số điện thoại không hợp lệ!", 1000, "error");
        return false;
    }

    if (matkhau.length < 8) {
        hienthithongbao("Mật khẩu phải có ít nhất 8 kí tự!", 1000, "error");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(u => u.emailsodienthoai === emailsodienthoai && u.matkhau === matkhau);

    if (!user) {
        hienthithongbao("Thông tin đăng nhập sai! Vui lòng kiểm tra lại!", 1000, "error");
        return false;
    }

    localStorage.setItem("emailsodienthoai", emailsodienthoai);
    localStorage.setItem("tentaikhoan", user.tentaikhoan);

    hienthithongbao("Đăng nhập thành công!", 1000, "success");
    setTimeout(() => {
        window.location.href = "trangchu.html";
    }, 1000);
    document.title = "Đang chuyển hướng...";
    return false;
}

function kiemtratrangthaidangnhap() {
    const emailsodienthoai = localStorage.getItem("emailsodienthoai");
    const tentaikhoan = localStorage.getItem("tentaikhoan");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");

    if (emailsodienthoai) {
        registerLink.textContent = tentaikhoan || "Khách hàng";
        registerLink.href = "taikhoan.html";
        loginLink.textContent = "Đăng xuất";
        loginLink.href = "#";
        loginLink.onclick = function() {
            localStorage.removeItem("emailsodienthoai");
            localStorage.removeItem("tentaikhoan");
            localStorage.setItem(getCartKey(), JSON.stringify([]));
            hienthithongbao("Đã đăng xuất!", 1000, "success");
            setTimeout(() => {
                window.location.href = "trangchu.html";
            }, 1000);
        };
    } else {
        loginLink.textContent = "Đăng nhập";
        loginLink.href = "dangnhap.html";
        registerLink.textContent = "Đăng ký";
        registerLink.href = "dangky.html";
    }
    updateCartCount();
}

function capnhatmatkhau() {
    const matkhauMoi = document.getElementById("matkhau-moi").value;
    const nhaplaiMatkhau = document.getElementById("nhaplai-matkhau").value;
    const emailsodienthoai = localStorage.getItem("emailsodienthoai");

    if (matkhauMoi.length < 8) {
        hienthithongbao("Mật khẩu mới phải có ít nhất 8 ký tự!", 1000, "error");
        return false;
    }

    if (matkhauMoi !== nhaplaiMatkhau) {
        hienthithongbao("Mật khẩu không khớp!", 1000, "error");
        return false;
    }

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let userIndex = users.findIndex(u => u.emailsodienthoai === emailsodienthoai);
    if (userIndex !== -1) {
        users[userIndex].matkhau = matkhauMoi;
        localStorage.setItem("users", JSON.stringify(users));
    }

    hienthithongbao("Cập nhật mật khẩu thành công!", 1000, "success");
    setTimeout(() => {
        document.getElementById("matkhau-moi").value = "";
        document.getElementById("nhaplai-matkhau").value = "";
    }, 1000);
    return false;
}

function renderOrderHistory() {
    const orderList = document.querySelector('.order-list');
    let orderHistory = JSON.parse(localStorage.getItem(getOrderHistoryKey()) || "[]");
    
    // Sắp xếp đơn hàng, mới nhất lên trên
    orderHistory = orderHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (orderHistory.length === 0) {
        orderList.innerHTML = '<p>Chưa có lịch sử mua hàng.</p>';
        return;
    }
    orderList.innerHTML = orderHistory.map(order => `
        <div class="order-item">
            <div class="order-item-details">
                <h3>Đơn hàng ngày ${order.date}</h3>
                ${order.items.map(item => `
                    <div class="order-item-product">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4>${item.name}<span>Số lượng: ${item.quantity}</span></h4>
                            <p class="price">Giá: ${item.price.toLocaleString()}đ</p>
                        </div>
                    </div>
                `).join('')}
                <p class="price total">Tổng: ${order.total.toLocaleString()}đ</p>
            </div>
        </div>
    `).join('');
}