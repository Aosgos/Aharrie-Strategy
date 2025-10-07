const nodemailer = require('nodemailer');

const email = process.env.EMAIL;
const email_key = process.env.EMAIL_KEY;


const sendEmail = (recipient, subject, htmlContent) => {
    try {
        // Set up the nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Replace with your email service provider (e.g., 'Gmail', 'Outlook', etc.)
            auth: {
                user: email, // Replace with your email address
                pass: email_key, // Replace with your email password or an app password if using Gmail
            },
        });

        // Mail options
        const mailOptions = {
            from: process.env.EMAIL, // Sender email address (should match the transporter auth user)
            to: recipient, // Recipient email address
            subject: subject, // Email subject
            html: htmlContent, // HTML content for the email body
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (err) {
        console.error('Error:', err);
    }
};

// helpers/emailHelper.js

function constructEmailContent(fName, lName, message) {
  // Constructing email HTML content
  const emailContent = `
    <html>
    <head>
        <style>
        /* Style for the email body */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        /* Style for the card layout */
        .card {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border: 1px solid whitesmoke;
        }
        /* Style for the company logo */
        .logo {
            max-width: 100px;
            height: auto;
            margin-bottom: 20px;
            text-align: center;
            align-item: center;
        }
        /* Style for the footer */
        .footer {
            padding-top: 20px;
            text-align: center;
            color: #888;
        }
        /* Style for the support email link */
        .support-link {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }
        </style>
    </head>
    <body>
        <div class="card">
        <div class="logo">
            <img src="https://www.goodisoft.com/img/logo3.png" alt="Company Logo">
        </div>
        <p>Hello ${fName} ${lName},</p>
        <p>${message}</p>
        <div class="footer">
            For support, please contact us at <a href="mailto:support@gopay.com" class="support-link">support@gopay.com</a>
        </div>
        </div>
    </body>
    </html>

  `;
  return emailContent;
}


module.exports = {sendEmail, constructEmailContent};