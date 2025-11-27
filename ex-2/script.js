// Product data
const products = {
    'RL PHERO GIRL': { name: 'RL PHERO GIRL', price: 74.25 },
    'RL PHERO BOY': { name: 'RL PHERO BOY', price: 74.25 },
    'RL PHERO BOY 2': { name: 'RL PHERO BOY 2', price: 83.85 },
    'RL PHERO BOY SPECIAL': { name: 'RL PHERO BOY SPECIAL', price: 83.85 },
    'RL PHERO GIRL DELUXE': { name: 'RL PHERO GIRL DELUXE', price: 83.85 },
    'RL PHERO COUPLE BUNDLE': { name: 'RL PHERO COUPLE BUNDLE', price: 129.35 }
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
            <p><strong>Harga Unit:</strong> RM ${selectedPrice.toFixed(2)}</p>
            <p><strong>Kuantiti:</strong> ${quantity}</p>
        </div>
        <div class="summary-total">
            Jumlah: RM ${totalPrice.toFixed(2)}
        </div>
    `;
    
    document.getElementById('orderSummary').innerHTML = summaryHTML;
    document.getElementById('totalPrice').textContent = `RM ${totalPrice.toFixed(2)}`;
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.toggle-icon');
    
    // Remove active from all
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
            item.parentElement.querySelector('.toggle-icon').textContent = '+';
        }
    });
    
    // Toggle current
    answer.classList.toggle('active');
    toggle.textContent = answer.classList.contains('active') ? '−' : '+';
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
        size: document.getElementById('size').value,
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postcode: document.getElementById('postcode').value,
        state: document.getElementById('state').value,
        payment: document.getElementById('payment').value,
        notes: document.getElementById('notes').value,
        totalPrice: selectedPrice * parseInt(document.getElementById('quantity').value)
    };
    
    // Validate all required fields
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address || !formData.city || !formData.postcode || !formData.state || !formData.payment || !formData.size) {
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

━━━━━━━━━━━━━━━━━━━━━━━━
📦 BUTIRAN PESANAN
━━━━━━━━━━━━━━━━━━━━━━━━

Produk: ${formData.product}
Ukuran: ${formData.size}
Kuantiti: ${formData.quantity}
Jumlah Harga: RM ${formData.totalPrice.toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━
👤 MAKLUMAT PELANGGAN
━━━━━━━━━━━━━━━━━━━━━━━━

Nama: ${formData.fullName}
Telefon: ${formData.phone}
Email: ${formData.email}

━━━━━━━━━━━━━━━━━━━━━━━━
📍 ALAMAT PENGHANTARAN
━━━━━━━━━━━━━━━━━━━━━━━━

${formData.address}
${formData.city}, ${formData.postcode}
${formData.state}

━━━━━━━━━━━━━━━━━━━━━━━━
💳 KAEDAH PEMBAYARAN
━━━━━━━━━━━━━━━━━━━━━━━━

${formData.payment}

${formData.notes ? `\n📝 CATATAN: ${formData.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━

🎁 BONUS: Anda akan menerima FREE GIFT menarik!

Kami akan menghubungi anda dalam 24 jam untuk mengesahkan pesanan dan pembayaran.

Terima kasih telah memilih RL PHERO! 🙏
    `;
    
    alert(message);
}