let selectedPackage = null;
let selectedPrice = 0;

// SELECT PRESET PACKAGE
function selectPreset(packageName, price, presetId) {
    selectedPackage = packageName;
    selectedPrice = price;
    
    // Show selected preset
    document.getElementById('selectedPreset').style.display = 'block';
    document.getElementById('presetName').textContent = packageName;
    document.getElementById('presetPrice').textContent = `RM ${price.toFixed(2)}`;
    
    // Auto fill form
    document.getElementById('packageName').value = packageName;
    updateOrderSummary();
}

// SELECT PACKAGE FROM PRICING
function selectPackage(packageName, price) {
    selectedPackage = packageName;
    selectedPrice = price;
    
    // Update form
    document.getElementById('packageName').value = packageName;
    
    // Update summary
    updateOrderSummary();
    
    // Scroll to order section
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// SCROLL TO ORDER FORM
function scrollToOrderForm() {
    if (!selectedPackage) {
        alert('Sila pilih paket terlebih dahulu!');
        return;
    }
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// UPDATE ORDER SUMMARY DENGAN REALTIME CUSTOMER INFO
function updateOrderSummary() {
    if (!selectedPackage) return;
    
    const fullName = document.getElementById('fullName').value || '[Nama]';
    const phone = document.getElementById('phone').value || '[No. Telefon]';
    const address = document.getElementById('address').value || '[Alamat]';
    const city = document.getElementById('city').value || '[Bandar]';
    const postcode = document.getElementById('postcode').value || '[Kod Pos]';
    const state = document.getElementById('state').value || '[Negeri]';
    const payment = document.getElementById('payment').value || '[COD]';
    const variant = document.getElementById('variant').value || '[Varian]';
    
    const fullAddress = `${address}\n${postcode} ${city}, ${state}`;
    
    const summaryHTML = `
        <div class="summary-customer">
            <p class="summary-name">${fullName}</p>
            <p class="summary-phone">${phone}</p>
            <p class="summary-address">${fullAddress}</p>
        </div>
        
        <div class="summary-divider"></div>
        
        <div class="summary-items">
            <p style="font-weight: bold; margin-bottom: 0.8rem;">Item:</p>
            <ul style="margin-left: 1rem; color: #ccc;">
                <li>• ${selectedPackage}</li>
                <li>• Varian: ${variant}</li>
            </ul>
        </div>
        
        <div class="summary-divider"></div>
        
        <div class="summary-payment">
            <p><strong>Kaedah:</strong> ${payment}</p>
        </div>
        
        <div class="summary-total">
            Jumlah: <br>
            <span style="font-size: 2.2rem;">RM ${selectedPrice.toFixed(2)}</span>
        </div>
    `;
    
    document.getElementById('orderSummary').innerHTML = summaryHTML;
    document.getElementById('totalPrice').textContent = `RM ${selectedPrice.toFixed(2)}`;
}

// INTERSECTION OBSERVER UNTUK ANIMATE-ON-SCROLL
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = entry.target.classList[0] === 'animate-on-scroll' 
                ? 'fade-up 0.8s ease-out forwards' 
                : 'fade-up 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// OBSERVE ALL ANIMATE-ON-SCROLL ELEMENTS
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ADD EVENT LISTENERS UNTUK SEMUA INPUT FIELDS
    const formInputs = [
        'fullName', 'phone', 'address', 'city', 
        'postcode', 'state', 'payment', 'variant'
    ];
    
    formInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateOrderSummary);
            element.addEventListener('input', updateOrderSummary);
        }
    });
});

// SUBMIT ORDER FORM
function submitOrder(event) {
    event.preventDefault();
    
    // Validate package selection
    if (!selectedPackage) {
        alert('Sila pilih paket terlebih dahulu!');
        return;
    }
    
    // Get form data
    const formData = {
        package: document.getElementById('packageName').value,
        variant: document.getElementById('variant').value,
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postcode: document.getElementById('postcode').value,
        state: document.getElementById('state').value,
        payment: document.getElementById('payment').value,
        notes: document.getElementById('notes').value,
        totalPrice: selectedPrice
    };
    
    // Validate all required fields
    if (!formData.variant || !formData.fullName || !formData.phone || !formData.email || 
        !formData.address || !formData.city || !formData.postcode || !formData.state || !formData.payment) {
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
    selectedPackage = null;
    selectedPrice = 0;
}

// SUCCESS ALERT DENGAN ORDER DETAILS
function showSuccessAlert(formData) {
    const message = `
╔════════════════════════════════════╗
║   ✅ PESANAN BERJAYA DIHANTAR!    ║
╚════════════════════════════════════╝

📦 BUTIRAN PESANAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Paket: ${formData.package}
Varian: ${formData.variant}
Harga: RM ${formData.totalPrice.toFixed(2)}

👤 MAKLUMAT PELANGGAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nama: ${formData.fullName}
Telefon: ${formData.phone}
Email: ${formData.email}

📍 ALAMAT PENGHANTARAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.address}
${formData.city}, ${formData.postcode}
${formData.state}

💳 KAEDAH PEMBAYARAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.payment}

${formData.notes ? `📝 CATATAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.notes}

` : ''}🎁 BONUS UNTUK ANDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ FREE Premium Gift Box
✓ FREE Shipping (selepas pembelian 2 paket)
✓ FREE Sample Items

⏰ LANGKAH SETERUSNYA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kami akan menghubungi anda dalam 24 jam 
untuk mengesahkan pesanan dan pembayaran.

💬 HUBUNGI KAMI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WhatsApp: +60 17-678 7932
Email: nikshafik186@gmail.com

╔════════════════════════════════════╗
║  Terima Kasih! Selamat Berbelanja  ║
║     RL PHERO SIGNATURE 🌹         ║
╚════════════════════════════════════╝
    `;
    
    alert(message);
}

// Smooth scroll untuk semua link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize on page load
window.addEventListener('load', function() {
    // Add animation delay stagger
    const benefits = document.querySelectorAll('.benefit-card');
    benefits.forEach((benefit, index) => {
        benefit.style.animationDelay = (index * 0.1) + 's';
    });

    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.animationDelay = (index * 0.1) + 's';
    });
});
