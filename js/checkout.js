document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();


    // Google Apps Script URL (deployed as web app)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyu7lLquIuw1sVM__0Ga3NVoMP4yAcnE469EMVCmGfd_VFkhm_dvW-dPRSWAo1FvSSN/exec';
    

    // PROPERLY get the input value
    const transactionIdInput = document.getElementById('transactionId');
    const transactionId = transactionIdInput ? transactionIdInput.value : null;
    
    // Check Validity of Transaction ID
    if (!transactionId) {
        alert('Please enter a Transaction ID');
        return;
    }
    
    // Get form values
    const formData = {
      email: document.getElementById('email').value,
      transactionId: transactionId,
      timestamp: new Date().toISOString(),  // Auto-generated timestamp
      status: "false"  // Default status
    };
  
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });
  
      if (response.ok) {
        window.location.href = `order-status.html?txn=${encodeURIComponent(transactionId)}`; // Redirect on success
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please contact us.');
    }
  });