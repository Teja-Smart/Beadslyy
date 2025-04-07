document.addEventListener('DOMContentLoaded', () => {
    const checkStatusBtn = document.getElementById('checkStatusBtn');
    const transactionIdInput = document.getElementById('transactionId');
    const resultDiv = document.getElementById('result');

    // Google Apps Script URL (deployed as web app)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyu7lLquIuw1sVM__0Ga3NVoMP4yAcnE469EMVCmGfd_VFkhm_dvW-dPRSWAo1FvSSN/exec';

    checkStatusBtn.addEventListener('click', async () => {
        const transactionId = transactionIdInput.value.trim();
        
        if (!transactionId) {
            showResult('Please enter a Transaction ID', 'error');
            return;
        }

        try {
            showResult('Searching for your order...', 'loading');
            
            const response = await fetch(`${scriptURL}?transactionId=${encodeURIComponent(transactionId)}`);
            const data = await response.json();

            if (data.error) {
                showResult(data.error, 'error');
            } else {
                displayOrderDetails(data);
            }
        } catch (error) {
            console.error('Error:', error);
            showResult('Failed to fetch order status. Please try again.', 'error');
        }
    });

    function displayOrderDetails(order) {
        const statusClass = `status-${order.status.toLowerCase()}`;
        
        resultDiv.innerHTML = `
            <div class="order-status ${statusClass}">
                Status: ${order.status}
            </div>
            <div class="order-details">
                <p><strong>Date:</strong> ${formatDate(order.timestamp)}</p>
                <p><strong>Transaction ID:</strong> ${order.transactionId}</p>
                ${order.estimatedDelivery ? `<p><strong>Estimated Delivery:</strong> ${formatDate(order.estimatedDelivery)}</p>` : ''}
            </div>
        `;
    }

    function showResult(message, type) {
        resultDiv.innerHTML = `<div class="result-${type}">${message}</div>`;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});

// Auto-check if URL has transaction ID
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const autoTxnId = urlParams.has('txn') 
      ? decodeURIComponent(urlParams.get('txn')).trim()
      : null;
  
    if (autoTxnId) {
      const txnInput = document.getElementById('transactionId');
      if (txnInput) {
        txnInput.value = autoTxnId;
        
        // Trigger check after UI update
        setTimeout(() => {
          const checkBtn = document.getElementById('checkStatusBtn');
          if (checkBtn) checkBtn.click();
        }, 100);
      }
    }
  } catch (e) {
    console.error('Error processing transaction ID:', e);
    // Optional: Display user-friendly error message
  }
  