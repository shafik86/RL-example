// Product data
const products = {
    'RL PHERO WOMEN': { name: 'RL PHERO WOMEN', price: 80.00 },
    'RL PHERO COUPLE': { name: 'RL PHERO COUPLE', price: 150.00 },
    'RL PHERO GENTLEMEN': { name: 'RL PHERO GENTLEMEN', price: 80.00 },
    'RL PHERO MEN': { name: 'RL PHERO MEN', price: 80.00 },
    'RL PHERO LADIES': { name: 'RL PHERO LADIES', price: 80.00 }
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
    const subtotal = selectedPrice * quantity;
    
    // Apply 10% discount for 2 or more items
    let discount = 0;
    let totalPrice = subtotal;
    
    if (quantity >= 2) {
        discount = subtotal * 0.10;
        totalPrice = subtotal - discount;
    }
    
    const summaryHTML = `
        <div class="summary-item">
            <p><strong>Produk:</strong> ${selectedProduct}</p>
            <p><strong>Harga Unit:</strong> RM ${selectedPrice.toFixed(2)}</p>
            <p><strong>Kuantiti:</strong> ${quantity}</p>
            <p><strong>Subtotal:</strong> RM ${subtotal.toFixed(2)}</p>
            ${quantity >= 2 ? `<p style="color: #4caf50;"><strong>Diskon 10%:</strong> -RM ${discount.toFixed(2)}</p>` : ''}
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
    const quantity = parseInt(document.getElementById('quantity').value);
    const subtotal = selectedPrice * quantity;
    
    // Calculate discount
    let discount = 0;
    let totalPrice = subtotal;
    
    if (quantity >= 2) {
        discount = subtotal * 0.10;
        totalPrice = subtotal - discount;
    }
    
    const formData = {
        product: document.getElementById('productName').value,
        quantity: quantity,
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
        subtotal: subtotal,
        discount: discount,
        totalPrice: totalPrice
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
Harga Unit: RM ${selectedPrice.toFixed(2)}
Subtotal: RM ${formData.subtotal.toFixed(2)}
${formData.discount > 0 ? `Diskon 10%: -RM ${formData.discount.toFixed(2)}` : ''}
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
