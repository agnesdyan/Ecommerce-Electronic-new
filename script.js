// Data Produk
const produk = [
    {"nama": "iPhone 14", "harga": 15000000},
    {"nama": "Samsung Galaxy S23", "harga": 14000000},
    {"nama": "Dell XPS 13", "harga": 20000000},
    {"nama": "MacBook Air M2", "harga": 18000000},
    {"nama": "Sony WH-1000XM5", "harga": 5000000},
    {"nama": "Logitech MX Master 3", "harga": 1500000},
    {"nama": "Apple Watch Series 8", "harga": 8000000},
    {"nama": "Lenovo IdeaPad 3", "harga": 7000000},
    {"nama": "Xiaomi Redmi Note 12", "harga": 4000000},
    {"nama": "Canon EOS R6", "harga": 35000000},
    {"nama": "Asus ROG Phone 6", "harga": 12000000},
    {"nama": "Bose SoundLink Revolve", "harga": 3000000},
    {"nama": "Google Pixel 7", "harga": 10000000},
    {"nama": "Fitbit Charge 5", "harga": 2500000},
    {"nama": "DJI Mini 3 Pro", "harga": 15000000}
];

// Menampilkan Daftar Produk
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = "<h2>Daftar Produk</h2>";
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.innerHTML = `Nama: ${product.nama} - Harga: Rp${product.harga}`;
        productList.appendChild(div);
    });
}

// Fungsi Binary Search
function binarySearch(data, target) {
    let low = 0;
    let high = data.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (data[mid].harga === target) {
            return mid;
        } else if (data[mid].harga < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

// Fungsi untuk mencari berdasarkan nama
function searchByName(data, target) {
    return data.filter(item => item.nama.toLowerCase().includes(target.toLowerCase()));
}

// Sorting Produk berdasarkan harga
function quickSort(data) {
    if (data.length <= 1) return data;
    const pivot = data[Math.floor(data.length / 2)];
    const left = data.filter(item => item.harga < pivot.harga);
    const middle = data.filter(item => item.harga === pivot.harga);
    const right = data.filter(item => item.harga > pivot.harga);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Menangani Form Pencarian
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchOption = document.getElementById('searchOption').value;
    const searchInput = document.getElementById('searchInput').value;

    let results = [];

    if (searchOption === '1') {
        const targetHarga = parseInt(searchInput);
        const index = binarySearch(produk, targetHarga);
        if (index !== -1) {
            results.push(produk[index]);
        }
    } else if (searchOption === '2') {
        results = searchByName(produk, searchInput);
    }

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = "<h3>Hasil Pencarian</h3>";
    if (results.length > 0) {
        results.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('product-item');
            div.innerHTML = `Nama: ${item.nama} - Harga: Rp${item.harga}`;
            searchResults.appendChild(div);
        });
    } else {
        searchResults.innerHTML += "<p>Produk tidak ditemukan</p>";
    }
});

// Menampilkan produk awal
displayProducts(quickSort(produk));
