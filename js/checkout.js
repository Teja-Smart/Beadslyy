document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
      email: document.getElementById('email').value,
      transactionId: document.getElementById('transactionId').value,
      timestamp: new Date().toISOString(),  // Auto-generated timestamp
      status: "false"  // Default status
    };
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycby4rvEl8eq9VGnHwBvlhTnovSn036jIIjKSqDeeIMZAPXzwPjH2rT2clVRu8hknjx5E/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });
  
      if (response.ok) {
        window.location.href = 'index.html'; // Redirect on success
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please contact us.');
    }
  });