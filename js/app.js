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

    let html = '';

data.forEach(position => {

    html += `
    <div style="
        border:1px solid #ccc;
        padding:15px;
        margin-bottom:10px;
        border-radius:8px;
        background:white;
    ">

        <h3>${position.company_name}</h3>

        <p>
        <strong>Ticker :</strong>
        ${position.ticker}
        </p>

        <p>
        <strong>Portefeuille :</strong>
        ${position.portfolio}
        </p>

        <p>
        <strong>Quantité :</strong>
        ${position.quantity}
        </p>

        <p>
        <strong>PRU :</strong>
        ${position.pru} €
        </p>

    </div>
    `;
});

document.getElementById(
    'portfolio-value'
).innerHTML = html;

}

const {
data: { session }
}
=
await supabase.auth.getSession();

if (session) {

loadDashboard();

}

