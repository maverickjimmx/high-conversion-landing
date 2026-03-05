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
            let value = e.target.value.replace(/\D/g, ''); 
            let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = formatted.substring(0, 19);
        });
    }

    // 3. EXPIRY DATE MASKING & VALIDATION
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); 
            
            if (value.length >= 1) {
                if (parseInt(value[0]) > 1) {
                    value = '0' + value;
                }
            }
            
            if (value.length >= 2) {
                let month = parseInt(value.slice(0, 2));
                if (month > 12) value = '12' + value.slice(2);
                if (month === 0) value = '01' + value.slice(2);
                
                e.target.value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
            } else {
                e.target.value = value;
            }
        }); // Correctly closed Section 3
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
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <h3 style="color: #38bdf8; margin-bottom: 0.5rem;">Payment Successful!</h3>
                <p style="color: #94a3b8; font-size: 0.9rem;">Welcome to NexGen. Your account is now active.</p>
                <button onclick="window.location.reload()" 
                        style="margin-top: 1.5rem; background: transparent; color: white; border: 1px solid #334155; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                    Back to Dashboard
                </button>
            </div>`;
    }
});
