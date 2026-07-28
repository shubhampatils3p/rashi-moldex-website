<?php
header('Content-Type: application/json; charset=utf-8');
// Allow same-origin requests (adjust if needed)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  echo json_encode(['success' => true]);
  exit;
}

$raw = trim(file_get_contents('php://input'));
if (!$raw) {
  echo json_encode(['success' => false, 'message' => 'No input']);
  exit;
}

$data = json_decode($raw, true);
if (!$data) {
  echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
  exit;
}

$name = substr(trim($data['name'] ?? ''), 0, 200);
$email = substr(trim($data['email'] ?? ''), 0, 200);
$phone = substr(trim($data['phone'] ?? ''), 0, 100);
$subject = substr(trim($data['subject'] ?? 'Enquiry from website'), 0, 200);
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$message) {
  echo json_encode(['success' => false, 'message' => 'Name, email and message are required.']);
  exit;
}

// simple email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
  exit;
}

$to = 'rashimoldex@gmail.com';
$subject_line = "Website Enquiry: " . $subject;

$body = "You have received a new enquiry from the website:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
if ($phone) $body .= "Phone: $phone\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n" . $message . "\n\n";
$body .= "---\nThis message was sent from https://rashimoldex.com\n";

$headers = [];
$headers[] = 'From: RASHI MOLDEX <no-reply@rashimoldex.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = false;
try {
  $sent = mail($to, $subject_line, $body, implode("\r\n", $headers));
} catch (Exception $e) {
  $sent = false;
}

if ($sent) {
  echo json_encode(['success' => true, 'message' => 'Enquiry sent. We will contact you shortly.']);
} else {
  // Provide generic error message
  echo json_encode(['success' => false, 'message' => 'Failed to send email. Please contact us directly at rashimoldex@gmail.com.']);
}

exit;
?>
