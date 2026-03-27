# VaultX 🚀
### A Cloud Storage Solution Powered by AWS S3

**VaultX** is a modern, responsive mini cloud storage application designed to demonstrate the power of **AWS S3** integration. Inspired by Google Drive, it allows users to upload, manage, download, and share files securely through a sleek web interface.

---

## 🛠 Specifications

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite 5, Tailwind CSS 3, Axios |
| **Backend** | Node.js, Express, Multer |
| **Cloud Storage** | AWS S3 (Simple Storage Service) |
| **Security** | AWS SDK v3, Presigned URLs (Secure access) |

---

## 📋 Prerequisites

Before setting up VaultX, ensure you have the following:
- **Node.js** (v18.0.0 or higher)
- **npm** (comes with Node.js)
- **AWS Account** with an active S3 Bucket
- **AWS IAM User** with `AmazonS3FullAccess` permissions

---

## ⚙️ Environment Configuration

You must configure the backend to connect to your AWS S3 bucket.

1. Navigate to the `backend` directory.
2. Create a file named `.env`.
3. Add the following variables:

```env
AWS_REGION=your-region (e.g., us-east-1)
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET_NAME=your-bucket-name
PORT=3000
```

> [!IMPORTANT]
> Never commit your `.env` file to version control. It contains sensitive AWS credentials.

---

## 🚀 Getting Started

Follow the steps below to initialize and run the application on your preferred OS.

### 🐧 Linux & macOS

1. **Clone the project** (if not already done):
   ```bash
   git clone https://github.com/Bharath200415/VaultX.git

   cd VaultX
   ```

2. **Initialize the Backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```
   *The backend will run on `http://localhost:3000`*

3. **Initialize the Frontend** (Open a new terminal):
   ```bash
   cd VaultX/frontend
   npm install
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

---

### 🪟 Windows

1. **Clone the project**:
   ```cmd
   git clone <repository-url>
   cd VaultX
   ```

2. **Initialize the Backend**:
   *Using Command Prompt (cmd) or PowerShell*
   ```cmd
   cd backend
   npm install
   npm start
   ```

3. **Initialize the Frontend** (Open a new terminal):
   ```cmd
   cd VaultX/frontend
   npm install
   npm run dev
   ```

---

## ✨ Features

- **File Upload**: Instant upload to AWS S3 using Multer and AWS SDK.
- **File Management**: View a real-time list of all files in your bucket.
- **Secure Download**: Generate time-limited signed URLs for safe file downloads.
- **One-Click Sharing**: Share files via temporary public URLs.
- **File Deletion**: Remove unwanted files directly from the UI.

---

## 📁 Project Structure

```text
VaultX/
├── backend/            # Express.js server & AWS S3 logic
│   ├── routes/         # API endpoints
│   ├── server.js       # Entry point
│   └── .env            # AWS Configuration (needs to be created)
└── frontend/           # React application
    ├── src/            # Components, Pages, and Assets
    ├── index.html      # Main HTML template
    └── README.md       # Frontend-specific documentation
```

---

## ⚠️ Notes for AWS Bucket Setup

- Enable **CORS** on your S3 bucket to allow requests from your frontend:
  ```json
  [
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "POST", "DELETE", "PUT"],
        "AllowedOrigins": ["http://localhost:5173"],
        "ExposeHeaders": []
    }
  ]
  ```

---

## 🔍 Troubleshooting

### 1. `ReferenceError: CustomEvent is not defined`
*   **Cause**: You are using Node.js version < 19 with a tool (like Vite 6+) that requires it.
*   **Fix**: This project has been pre-configured with **Vite 5** to avoid this issue on Node.js 18. Ensure you are using the versions specified in `frontend/package.json`. If you still encounter this, consider upgrading Node.js to v20+.

### 2. `Unsupported engine` warnings during `npm install`
*   **Cause**: Some modern packages (Tailwind 4, Vite 6) require Node.js 20+.
*   **Fix**: We have downgraded the core stack to **Tailwind CSS 3** and **Vite 5** for maximum compatibility with Node.js 18. You can safely ignore these warnings if the app runs correctly, or upgrade Node.js to stay updated.

### 3. AWS "Access Denied" or 403 Errors
*   **Check `.env`**: Verify that your `backend/.env` file has the correct `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
*   **Permissions**: Ensure the IAM user associated with the keys has the **AmazonS3FullAccess** policy attached.
*   **Public Access**: Ensure your bucket's "Block all public access" settings allow for the operations you are performing (though presigned URLs handle most of this).

### 4. Files Not Showing or Uploading (CORS)
*   **Fix**: Ensure the CORS settings in your S3 bucket exactly match the `AllowedOrigins` for your local frontend (usually `http://localhost:5173`). See the [AWS Bucket Setup](#-notes-for-aws-bucket-setup) section above.

### 5. `npm start` (Backend) fails
*   **Cause**: Port 3000 might be in use.
*   **Fix**: Check if another process is running on port 3000 or change the `PORT` variable in your `.env` file.
