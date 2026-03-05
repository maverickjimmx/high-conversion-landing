document.addEventListener('DOMContentLoaded', () => {
    const payBtn = document.querySelector('.btn-pay');
    const paymentBox = document.querySelector('.payment-box');
    const inputs = document.querySelectorAll('.pay-input');

    payBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // 1. Basic Validation
        let isValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ef4444'; // Error red
                isValid = false;
            } else {
                input.style.borderColor = '#334155'; // Reset to default
            }
        });

        if (!isValid) {
            alert('Please fill in all payment details.');
            return;
        }

        // 2. Simulate Payment Processing State
        payBtn.disabled = true;
        payBtn.innerText = 'Processing...';
        payBtn.style.opacity = '0.7';
        payBtn.style.cursor = 'not-allowed';

        // 3. Simulate API Latency (2 seconds)
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
