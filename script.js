let shareCount = localStorage.getItem('shareCount') || 0;
let submitted = localStorage.getItem('submitted') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.getElementById('whatsappBtn');
  const shareCounter = document.getElementById('shareCount');
  const shareMessage = document.getElementById('shareMessage');
  const form = document.getElementById('registrationForm');
  const successMsg = document.getElementById('successMessage');
  const submitBtn = document.getElementById('submitBtn');

  updateUI();

  shareBtn.addEventListener('click', () => {
    if (shareCount < 5) {
      shareCount++;
      localStorage.setItem('shareCount', shareCount);
      shareCounter.textContent = `Click count: ${shareCount}/5`;

      const message = encodeURIComponent('Hey Buddy, Join Tech For Girls Community!');
      window.open(`https://wa.me/?text=${message}`, '_blank');

      if (shareCount == 5) {
        shareMessage.classList.remove('hidden');
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (shareCount < 5) {
      alert('Please complete sharing 5 times before submitting.');
      return;
    }

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const college = document.getElementById('college').value;
    const file = document.getElementById('screenshot').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('college', college);
    formData.append('file', file);

    try {
      await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        body: formData
      });

      localStorage.setItem('submitted', 'true');
      form.reset();
      disableForm();
      successMsg.classList.remove('hidden');
    } catch (error) {
      alert('Submission failed. Try again!');
      console.error(error);
    }
  });

  function updateUI() {
    shareCounter.textContent = `Click count: ${shareCount}/5`;
    if (shareCount >= 5) shareMessage.classList.remove('hidden');
    if (submitted) {
      disableForm();
      successMsg.classList.remove('hidden');
    }
  }

  function disableForm() {
    document.querySelectorAll('input, button').forEach(el => el.disabled = true);
  }
});
