const products = [
    { id: 1, name: "Áo thun", price: 150000, image: "https://th.bing.com/th/id/OIP.JeuIXl9e42G0Q4b8ECwLmgHaHa?w=201&h=201&c=7&r=0&o=7&pid=1.7&rm=3", category: "Áo"  },
    { id: 2, name: "Quần jeans", price: 90000, image: "https://tse1.mm.bing.net/th/id/OIP.bztP_Z-U5c3vG6XhbJCFigHaIP?r=0&rs=1&pid=ImgDetMain", category: "Quần" },
    { id: 3, name: "Váy maxi", price: 200000, image: "https://th.bing.com/th/id/OIP.jyQ1e8n8oWZ2DsHwH1gFlwHaLX?r=0&o=7rm=3&rs=1&pid=ImgDetMain", category: "Váy" },
    { id: 4, name: "Giày sneakers", price: 800000, image: "https://th.bing.com/th/id/OIP.bW_QcPKBnKogIG49QJbOQQHaHa?w=205&h=205&c=7&r=0&o=7&pid=1.7&rm=3", category: "Giày" },
    { id: 5, name: "Mũ lưỡi trai", price: 50000, image: "https://th.bing.com/th/id/R.55abe45924d6d0f987c1eeb717363cdf?rik=Fm3ruo2sV%2bv5tw&pid=ImgRaw&r=00", category: "Phụ kiện" },
    { id: 6, name: "Dây chuyền", price: 100000, image: "https://tse1.mm.bing.net/th/id/OIP.1M3HxYsybqYobO08i-x4kwHaHa?r=0&w=1000&h=1000&rs=1&pid=ImgDetMain", category: "Phụ kiện" },
    { id: 7, name: "Bông tai", price: 90000, image: "https://th.bing.com/th/id/OIP.cXj2sRP7mZ2Lbef2NSmw7gHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain", category: "Phụ kiện" },
    { id: 8, name: "Áo croptop", price: 100000, image: "https://tse2.mm.bing.net/th/id/OIP.gw1fXBk3hGg-RQjlcarxAwHaHa?r=0&rs=1&pid=ImgDetMain", category: "Áo" },
    { id: 9, name: "Áo sơ mi", price: 70000, image: "https://th.bing.com/th?id=OIF.tWx%2fEXGUh0yNumpOnj2gPA&r=0&rs=1&pid=ImgDetMain", category: "Áo" },
    { id: 10, name: "Quần tây", price: 120000, image: "https://tse1.mm.bing.net/th/id/OIP.nSb9BuSGtN7TD0kjy5KiMQHaJ4?r=0&rs=1&pid=ImgDetMain", category: "Quần" },
    { id: 12, name: "Quần short", price: 50000, image: "https://tse3.mm.bing.net/th/id/OIP.x6ffpHyjQS6TTD6Zj0JYzgHaIy?r=0&w=506&h=600&rs=1&pid=ImgDetMain", category: "Quần" },
    { id: 13, name: "Váy hoa nhí", price: 200000, image: "https://cf.shopee.vn/file/738b15868a6929fd0e9435a91c1b92e6", category: "Váy" },
    { id: 14, name: "Vòng tay", price: 50000, image: "https://tse2.mm.bing.net/th/id/OIP.8TDm5F8UlKyiT6K7jgKk_AHaHa?r=0&w=600&h=600&rs=1&pid=ImgDetMain", category: "Phụ kiện" },
    { id: 15, name: "Đồng hồ", price: 5000000, image: "https://m.media-amazon.com/images/I/61gq0u2nsNL._AC_SY500_.jpg", category: "Phụ kiện" },
    { id: 16, name: "Giày cao gót", price: 400000, image: "https://tse1.explicit.bing.net/th/id/OIP.DJyciqIC9WdbpNgEG5jV0gHaHa?r=0&rs=1&pid=ImgDetMain", category: "Giày" },
    { id: 17, name: "Giày thể thao", price: 300000, image: "https://tse3.mm.bing.net/th/id/OIP.-I3rfn3GZIbSQuA1vGiPTAHaHa?r=0&rs=1&pid=ImgDetMain", category: "Giày" },
    { id: 18, name: "Giày sandal", price: 150000, image: "https://tse1.mm.bing.net/th/id/OIP.qP2ZZLTX_0PPzy4gntBx1gHaHa?r=0&rs=1&pid=ImgDetMain", category: "Giày" },

];

function renderProducts(filterPrice = null, searchQuery = '', category = '') {
    const productList = document.querySelector('.product-list');
    const sectionTitle = document.getElementById('section-title');
    let filteredProducts = products;

    // Cập nhật tiêu đề
    if (searchQuery) {
        sectionTitle.style.display = 'none';
    } else if (category) {
        sectionTitle.style.display = 'block';
        sectionTitle.textContent = `Sản phẩm danh mục ${category}`;
    } else {
        sectionTitle.style.display = 'block';
        sectionTitle.textContent = 'Sản phẩm nổi bật';
    }

    // Lọc theo giá
    if (filterPrice) {
        filteredProducts = filteredProducts.filter(product => {
            if (filterPrice === 'under150') return product.price < 150000;
            if (filterPrice === '150to300') return product.price >= 150000 && product.price < 300000;
            if (filterPrice === '300to500') return product.price >= 300000 && product.price <= 500000;
            if (filterPrice === 'over500') return product.price > 500000;
            return true;
        });
    }

    // Lọc theo danh mục
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Tìm kiếm chính xác
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Hiển thị kết quả
    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p style="text-align: center; color: #666;">Hiện không có sản phẩm bạn tìm.</p>';
        return;
    }

    productList.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()}đ</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">Thêm vào giỏ</button>
        </div>
    `).join('');
}

// Xử lý query tìm kiếm từ URL
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    if (searchQuery) {
        document.querySelector('.search-bar input').value = searchQuery;
        renderProducts(null, searchQuery);
    }
});
