sender Email
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Sender</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        
        h1 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        input, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            transition: border 0.3s;
        }
        
        input:focus, textarea:focus {
            outline: none;
            border-color: #3498db;
        }
        
        textarea {
            min-height: 200px;
            resize: vertical;
        }
        
        button {
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #2980b9;
        }
        
        .status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            display: none;
        }
        
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .attachment {
            margin-top: 10px;
            display: flex;
            align-items: center;
        }
        
        .attachment-info {
            margin-left: 10px;
            font-size: 14px;
        }
        
        .remove-btn {
            background: #e74c3c;
            padding: 5px 10px;
            font-size: 14px;
            margin-left: 10px;
        }
        
        .remove-btn:hover {
            background: #c0392b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Send Email</h1>
        
        <form id="emailForm">
            <div class="form-group">
                <label for="to">To:</label>
                <input type="email" id="to" required placeholder="recipient@example.com">
            </div>
            
            <div class="form-group">
                <label for="subject">Subject:</label>
                <input type="text" id="subject" required placeholder="Email subject">
            </div>
            
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" required placeholder="Write your message here..."></textarea>
            </div>
            
            <div class="form-group">
                <label for="attachment">Attachment:</label>
                <input type="file" id="attachment">
                <div id="attachment-info" class="attachment"></div>
            </div>
            
            <button type="submit">Send Email</button>
        </form>
        
        <div id="status" class="status"></div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const emailForm = document.getElementById('emailForm');
            const statusDiv = document.getElementById('status');
            const attachmentInput = document.getElementById('attachment');
            const attachmentInfo = document.getElementById('attachment-info');
            
            let selectedFile = null;
            
            // Handle file selection
            attachmentInput.addEventListener('change', function(e) {
                if (this.files && this.files[0]) {
                    selectedFile = this.files[0];
                    attachmentInfo.innerHTML = `
                        <div class="attachment">
                            <span class="attachment-info">${selectedFile.name} (${formatFileSize(selectedFile.size)})</span>
                            <button type="button" class="remove-btn" id="remove-file">Remove</button>
                        </div>
                    `;
                    
                    // Add event listener for remove button
                    document.getElementById('remove-file').addEventListener('click', function() {
                        selectedFile = null;
                        attachmentInput.value = '';
                        attachmentInfo.innerHTML = '';
                    });
                }
            });
            
            // Handle form submission
            emailForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const to = document.getElementById('to').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Show sending status
                showStatus('Sending email...', '');
                
                // In a real application, you would connect to a backend service here
                // For demonstration, we'll simulate an API call
                simulateEmailSending(to, subject, message, selectedFile)
                    .then(() => {
                        showStatus('Email sent successfully!', 'success');
                        emailForm.reset();
                        selectedFile = null;
                        attachmentInfo.innerHTML = '';
                    })
                    .catch(error => {
                        showStatus('Failed to send email: ' + error, 'error');
                    });
            });
            
            function simulateEmailSending(to, subject, message, file) {
                return new Promise((resolve, reject) => {
                    // Simulate network delay
                    setTimeout(() => {
                        // Simulate random success/failure for demonstration
                        const isSuccess = Math.random() > 0.2;
                        
                        if (isSuccess) {
                            console.log('Email details:');
                            console.log('To:', to);
                            console.log('Subject:', subject);
                            console.log('Message:', message);
                            if (file) {
                                console.log('Attachment:', file.name);
                            }
                            resolve();
                        } else {
                            reject('Network error. Please try again.');
                        }
                    }, 1500);
                });
            }
            
            function showStatus(message, type) {
                statusDiv.textContent = message;
                statusDiv.className = 'status';
                if (type) {
                    statusDiv.classList.add(type);
                }
                statusDiv.style.display = 'block';
                
                // Hide status after 5 seconds
                if (type) {
                    setTimeout(() => {
                        statusDiv.style.display = 'none';
                    }, 5000);
                }
            }
            
            function formatFileSize(bytes) {
                if (bytes < 1024) return bytes + ' bytes';
                else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
                else return (bytes / 1048576).toFixed(1) + ' MB';
            }
        });
    </script>
</body>
</html>
