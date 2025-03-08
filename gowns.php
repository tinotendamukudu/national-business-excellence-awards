<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $data = json_decode($requestBody, true);
    $requestBody = file_get_contents('php://input');
    $data = json_decode($requestBody, true);
    error_log("Received data: " . print_r($data, true)); // Log data to error log for debugging

    // Debugging: Check if JSON decoding failed
    if ($data === null) {
        echo "Error decoding JSON: " . json_last_error_msg();
        exit;
    }

    // Extract form data from the decoded JSON
    $schoolType = isset($data['schoolType']) ? $data['schoolType'] : '';
    $governanceCategory = isset($data['governanceCategory']) ? $data['governanceCategory'] : '';
    $schoolName = isset($data['schoolName']) ? $data['schoolName'] : '';
    $province = isset($data['province']) ? $data['province'] : '';
    $address = isset($data['address']) ? $data['address'] : '';
    $website = isset($data['website']) ? $data['website'] : '';
    $shoulderwidth = isset($data['shoulderwidth']) ? $data['shoulderwidth'] : '';
    $chestwidth = isset($data['chestwidth']) ? $data['chestwidth'] : '';
    $cuffmeasurement = isset($data['cuffmeasurement']) ? $data['cuffmeasurement'] : '';
    $sleevelength = isset($data['sleevelength']) ? $data['sleevelength'] : '';
    $bodylength = isset($data['bodylength']) ? $data['bodylength'] : '';
    $gownFor = isset($data['gownfor']) ? $data['gownfor'] : '';
    $phonenumber = isset($data['phonenumber']) ? $data['phonenumber'] : '';
    $alternatenumber = isset($data['alternatenumber']) ? $data['alternatenumber'] : '';
    // Validation: Ensure all required fields are filled
    if (
        empty($schoolType) || empty($governanceCategory) || empty($schoolName) ||
        empty($province) || empty($address) || empty($shoulderwidth) ||
        empty($chestwidth) || empty($cuffmeasurement) || empty($sleevelength) ||
        empty($bodylength) || empty($gownFor) || empty($phonenumber)
    ) {
        echo "Please fill in all required fields.";
        exit;
    }

    // Construct the HTML message to be sent in the email
    $message = "
        <html>
        <head>
            <title>New Form Submission</title>
        </head>
        <body>
            <h2>Form Submission Details</h2>

            <h4 style='text-decoration: underline;'>School Details</h4>
            <p><strong>School Type:</strong> $schoolType</p>
            <p><strong>Governance Category:</strong> $governanceCategory</p>
            <p><strong>School Name:</strong> $schoolName</p>
            <p><strong>Province:</strong> $province</p>
            <p><strong>Address:</strong> $address</p>
            <p><strong>Website:</strong> $website</p>
            <p><strong>Phone Number:</strong> $phonenumber</p>
            <p><strong>Alternatenumber:</strong> $alternatenumber</p>

            <h4 style='text-decoration: underline;'>Gown Measurements</h4>
            <p><strong>Shoulder Width:</strong> $shoulderwidth</p>
            <p><strong>Chest Width:</strong> $chestwidth</p>
            <p><strong>Cuff Measurement:</strong> $cuffmeasurement</p>
            <p><strong>Sleeve Length:</strong> $sleevelength</p>
            <p><strong>Body Length:</strong> $bodylength</p>

            <h4 style='text-decoration: underline;'>Gown Designation</h4>
            <p><strong>Gown For:</strong> $gownFor</p>
        </body>
        </html>
    ";

    // Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mukudutinotenda@gmail.com';
        $mail->Password   = 'rttk uxxs kbru kcjx'; // Ensure this is secure
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        $mail->setFrom('mukudutinotenda@gmail.com', 'Gown Request');
        $mail->addAddress('mukudutinotenda@gmail.com'); 

        $mail->isHTML(true);
        $mail->Subject = 'New Gown Request';
        $mail->Body    = $message;

        $mail->send();
        echo 'success'; 
    } catch (Exception $e) {
        echo "There was a problem sending your email. Mailer Error: {$mail->ErrorInfo}";
    }

} else {
    // Handle non-POST requests
    echo "This script is designed to handle POST requests. Please submit the form.";
    exit;
}

?>
