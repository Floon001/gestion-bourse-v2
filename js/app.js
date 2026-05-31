javascript
import { supabase } from './services/supabase.js';

window.signIn = async function () {

const email =
document.getElementById('email').value;

const password =
document.getElementById('password').value;

const { error } =
await supabase.auth.signInWithPassword({

email,
password

});

if (error) {

alert(error.message);

return;

}

loadDashboard();

};

async function loadDashboard() {

document.getElementById(
'auth-container'
).style.display = 'none';

document.getElementById(
'dashboard'
).style.display = 'block';

document.getElementById(
'portfolio-value'
).innerHTML =
'Connexion réussie';

}

const {
data: { session }
}
=
await supabase.auth.getSession();

if (session) {

loadDashboard();

}

