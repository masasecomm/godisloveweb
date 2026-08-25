(function(){
  // Paste your Google Apps Script Web App URL below, between the quotes.
  var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUssc9NyjqjC9g4VxrYfqjdcUCi9ShDGu0O9tYwgyN-NU5AwC3ArSZ9zZAONCPMvKl/exec";

  function initForm(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var statusEl = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');

      if(GOOGLE_SCRIPT_URL.indexOf('PASTE_YOUR') !== -1){
        statusEl.textContent = 'This form isn\u2019t connected yet \u2014 the site owner needs to add the Google Sheet link.';
        statusEl.className = 'form-status error';
        return;
      }

      btn.disabled = true;
      var originalLabel = btn.textContent;
      btn.textContent = 'Sending\u2026';
      statusEl.textContent = '';
      statusEl.className = 'form-status';

      var data = new URLSearchParams(new FormData(form));

      fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: data })
        .then(function(){
          statusEl.textContent = 'Thank you \u2014 your enquiry has been sent. The school will be in touch.';
          statusEl.className = 'form-status success';
          form.reset();
        })
        .catch(function(){
          statusEl.textContent = 'Something went wrong sending this. Please try again, or use the phone/website details above.';
          statusEl.className = 'form-status error';
        })
        .finally(function(){
          btn.disabled = false;
          btn.textContent = originalLabel;
        });
    });
  }

  document.querySelectorAll('.enquiry-form').forEach(initForm);
})();
