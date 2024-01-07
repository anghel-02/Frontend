// console.log('File JavaScript caricato.');

function validateForm() {
    var username = document.getElementById('username').value;
    var authcode = document.getElementById('authcode').value;
    var password = document.getElementById('password').value;
  
    if (!username || !authcode || !password) {
      alert('Tutti i campi sono obbligatori.');
      return false;
    }
  
    return true;
  }