const fetch = require('node-fetch');

async function checkGlobal() {
    try {
        const res = await fetch('http://localhost:1337/api/global?populate[navbarLinks][populate]=dropdown');
        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (e) {
        console.error(e);
    }
}

checkGlobal();
