// Product data
const products = {
    'RL PHERO GIRL': { name: 'RL PHERO GIRL', price: 99 },
    'RL PHERO BOY': { name: 'RL PHERO BOY', price: 99 },
    'RL PHERO BOY 2': { name: 'RL PHERO BOY 2', price: 129 },
    'RL PHERO BOY SPECIAL': { name: 'RL PHERO BOY SPECIAL', price: 129 },
    'RL PHERO GIRL DELUXE': { name: 'RL PHERO GIRL DELUXE', price: 129 },
    'RL PHERO COUPLE BUNDLE': { name: 'RL PHERO COUPLE BUNDLE', price: 199 }
};

let selectedProduct = null;
let selectedPrice = 0;

// Select product function
function selectProduct(productName, price) {
    selectedProduct = productName;
    selectedPrice = price;
    
    // Update form
    document.getElementById('productName').value = productName;
    document.getElementById('quantity').value = 1;
    
    // Update summary
    updateOrderSummary();
    
    // Scroll to order section
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// Update order summary
function updateOrderSummary() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const totalPrice = selectedPrice * quantity;
    
    const summaryHTML = `
        <div class="summary-item">
            <p><strong>Produk:</strong> ${selectedProduct}</p>
            <p><strong>Harga Unit:</strong> RM ${selectedPrice}</p>
            <p><strong>Kuantiti:</strong> ${quantity}</p>
        </div>
        <div class="summary-total">
            Jumlah: RM ${totalPrice}
        </div>
    `;
    
    document.getElementById('orderSummary').innerHTML = summaryHTML;
    document.getElementById('totalPrice').textContent = `RM ${totalPrice}`;
}

// Listen to quantity change
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', updateOrderSummary);
        quantityInput.addEventListener('input', updateOrderSummary);
    }
});

// Submit order form
function submitOrder(event) {
    event.preventDefault();
    
    // Validate product selection
    if (!selectedProduct) {
        alert('Sila pilih produk terlebih dahulu!');
        return;
    }
    
    // Get form data
    const formData = {
        product: document.getElementById('productName').value,
        quantity: document.getElementById('quantity').value,
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postcode: document.getElementById('postcode').value,
        state: document.getElementById('state').value,
        notes: document.getElementById('notes').value,
        totalPrice: selectedPrice * parseInt(document.getElementById('quantity').value)
    };
    
    // Validate all required fields
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address || !formData.city || !formData.postcode || !formData.state) {
        alert('Sila isi semua maklumat yang diperlukan!');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Sila masukkan email yang sah!');
        return;
    }
    
    // Validate phone number
    const phoneRegex = /^[\d\-\+\s\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Sila masukkan nombor telefon yang sah!');
        return;
    }
    
    // Show success message
    showSuccessAlert(formData);
    
    // Reset form
    document.getElementById('orderForm').reset();
    document.getElementById('orderSummary').innerHTML = '<p style="color: #999; text-align: center;">Pesanan berjaya dihantar! Kami akan menghubungi anda segera.</p>';
    document.getElementById('totalPrice').textContent = 'RM 0';
    selectedProduct = null;
    selectedPrice = 0;
}

// Success alert with order details
function showSuccessAlert(formData) {
    const message = `
✅ PESANAN BERJAYA DIHANTAR!

━━━━━━━━━━━━━━━━━━━━━
📦 BUTIRAN PESANAN
━━━━━━━━━━━━━━━━━━━━━

Produk: ${formData.product}
Kuantiti: ${formData.quantity}
Jumlah Harga: RM ${formData.totalPrice}

━━━━━━━━━━━━━━━━━━━━━
👤 MAKLUMAT PELANGGAN
━━━━━━━━━━━━━━━━━━━━━

Nama: ${formData.fullName}
Telefon: ${formData.phone}
Email: ${formData.email}

━━━━━━━━━━━━━━━━━━━━━
📍 ALAMAT PENGHANTARAN
━━━━━━━━━━━━━━━━━━━━━

${formData.address}
${formData.city}, ${formData.postcode}
${formData.state}

${formData.notes ? `\nCatatan: ${formData.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━

Kami akan menghubungi anda dalam 24 jam untuk mengesahkan pesanan.
Terima kasih!
    `;
    
    alert(message);
}