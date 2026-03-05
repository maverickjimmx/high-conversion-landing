document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const payBtn = document.querySelector('.btn-pay');
    // Targeting the specific ID you added to your HTML
    const paymentArea = document.getElementById('payment-area'); 
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
            
            // Simulating a network delay
            setTimeout(() => {
                if (paymentArea) {
                    renderSuccessState(paymentArea);
                }
            }, 2000);
        });
    }

    function renderSuccessState(container) {
        container.innerHTML = `
            <div class="success-animation" style="text-align:center; padding: 1rem;">
                <div style="color: #10b981; margin-bottom: 1rem;">
                    <i data-lucide="check-circle" style="width: 64px; height: 64px;"></i>
                </div>
                <h3 style="color: #38bdf8; margin-bottom: 0.5rem; font-size: 1.5rem;">Payment Successful!</h3>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem;">Welcome to NexGen. Your account is now active.</p>
                <button onclick="window.location.reload()" 
                        style="background: #38bdf8; color: #0f172a; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%;">
                    Back to Dashboard
                </button>
            </div>`;
        // Re-run Lucide to show the new checkmark icon
        if (window.lucide) {
            lucide.createIcons();
        }
    }
});
