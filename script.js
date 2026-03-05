document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.querySelector('.btn-pay');
    const paymentBox = document.querySelector('.payment-box');
    const inputs = document.querySelectorAll('.pay-input');
    
    // Select specific inputs for masking
    const cardInput = document.getElementById('card-num');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');

    // --- 1. Input Masking Logic ---

    // Card Number: Adds a space every 4 digits
    if (cardInput) {
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); 
            e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        });
    }

    // Expiry Date: Adds " / " after the month
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                e.target.value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }

    // CVV: Restricts to numbers only
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // --- 2. Payment Submission Logic ---

    payBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validation check
        let isValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ef4444'; 
                isValid = false;
            } else {
                input.style.borderColor = '#334155'; 
            }
        });

        if (!isValid) {
            alert('Please fill in all payment details.');
            return;
        }

        // Simulate Processing State
        payBtn.disabled = true;
        payBtn.innerText = 'Processing...';
        payBtn.style.opacity = '0.7';
        payBtn.style.cursor = 'not-allowed';

        // Simulate API Latency (2 seconds)
        setTimeout(() => {
            renderSuccessState(paymentBox);
        }, 2000);
    });

    function renderSuccessState(container) {
        container.style.textAlign = 'center';
        container.innerHTML = `
            <div class="success-animation">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <h3 style="color: #38bdf8; margin-bottom: 0.5rem;">Payment Successful!</h3>
                <p style="color: #94a3b8; font-size: 0.9rem;">Your Professional Plan is now active. Check your email for the receipt.</p>
                <button onclick="window.location.reload()" 
                        style="margin-top: 1.5rem; background: transparent; color: white; border: 1px solid #334155; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                    Back to Dashboard
                </button>
            </div>
        `;
    }
});
