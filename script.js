document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const payBtn = document.querySelector('.btn-pay');
    const paymentBox = document.querySelector('.payment-box');
    const inputs = document.querySelectorAll('.pay-input');
    
    const cardInput = document.getElementById('card-num');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');

    // 2. CARD NUMBER MASKING
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            // Remove all non-digits
            let value = e.target.value.replace(/\D/g, ''); 
            // Add a space every 4 digits
            let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
            // Limit to 19 characters (16 digits + 3 spaces)
            e.target.value = formatted.substring(0, 19);
        });
    }

    // 3. EXPIRY DATE MASKING
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                e.target.value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }

    // 4. CVV NUMERIC ONLY
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // 5. PAYMENT SUBMISSION
    if (payBtn) {
        payBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.style.borderColor = '#ef4444'; 
                    isValid = false;
                } else {
                    input.style.borderColor = '#334155'; 
                }
            });

            if (!isValid) return;

            payBtn.disabled = true;
            payBtn.innerText = 'Processing...';
            
            setTimeout(() => {
                renderSuccessState(paymentBox);
            }, 2000);
        });
    }

    function renderSuccessState(container) {
        container.innerHTML = `
            <div class="success-animation" style="text-align:center; padding: 2rem;">
                <div style="font-size: 3rem;">✅</div>
                <h3 style="color: #38bdf8;">Payment Successful!</h3>
                <p style="color: #94a3b8;">Welcome to NexGen.</p>
            </div>`;
    }
});
