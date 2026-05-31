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

    const { data, error } =
        await supabase
            .from('positions')
            .select('*');

    if (error) {

        document.getElementById(
            'portfolio-value'
        ).innerHTML =
            error.message;

        return;
    }

    document.getElementById(
        'portfolio-value'
    ).innerHTML =
        JSON.stringify(data, null, 2);

}

const {
data: { session }
}
=
await supabase.auth.getSession();

if (session) {

loadDashboard();

}

