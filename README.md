# Project Argus
@cornnflaecc

Project Argus is an email automation service designed for financial advisors. It generates personalized client emails for key policy milestones such as birthdays, client anniversaries, and premium due reminders using DOCX templates stored in Google Drive.

The service exposes a REST API that integrates seamlessly with n8n, allowing scheduled workflows to process client data from Google Sheets and deliver fully rendered HTML emails.

---

## Features

- 🎂 Birthday greetings
- 🎉 Client policy anniversaries
- 💳 Premium due reminders
- 📄 DOCX email templates editable by non-technical users
- ☁️ Google Drive template storage
- 📊 Google Sheets client data source
- 📧 HTML email generation
- 🔄 n8n integration
- 🐳 Docker support
- 🚂 Railway deployment ready

---

## Architecture

```
Google Sheets
       │
       ▼
   Client Data
       │
       ▼
    Project Argus API
       │
       ├─────────────► Google Drive
       │                  │
       │                  ▼
       │            DOCX Templates
       │                  │
       ▼                  ▼
 Placeholder Engine → HTML Email
       │
       ▼
      n8n
       │
       ▼
    Gmail / SMTP
```

---

## Technology Stack

- Node.js
- Express.js
- Docker
- n8n
- Google Drive API
- Google Sheets API
- Docxtemplater
- Mammoth.js
- Railway

---

## Project Structure

```
template-api/

├── config/
│   └── templates.json
│
├── controllers/
│   └── processController.js
│
├── routes/
│   └── processRoutes.js
│
├── services/
│   ├── emailService.js
│   ├── eventService.js
│   ├── googleDriveService.js
│   ├── templateService.js
│   │
│   ├── helpers/
│   │   └── createPlaceholders.js
│   │
│   └── rules/
│       ├── birthdayRule.js
│       ├── anniversaryRule.js
│       └── premiumDueRule.js
│
├── Dockerfile
├── package.json
└── index.js
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=3001

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_REDIRECT_URI=
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/<username>/project-argus.git
```

Install dependencies.

```bash
npm install
```

Start the API.

```bash
npm start
```

---

## Running with Docker

Build the image.

```bash
docker build -t project-argus .
```

Run the container.

```bash
docker run -p 3001:3001 --env-file .env project-argus
```

---

## API Endpoints

### Health Check

```
GET /
```

Returns:

```json
{
  "status": "Project Argus API Running"
}
```

---

### Process Email Jobs

```
POST /api/process
```

Example Request

```json
{
  "clients": [
    {
      "clientName": "Juan Dela Cruz"
    }
  ]
}
```

Returns rendered email jobs ready for sending through n8n.

---

## Email Workflow

```
Google Sheets
        │
        ▼
Schedule Trigger (n8n)
        │
        ▼
Project Argus API
        │
        ▼
Google Drive Template
        │
        ▼
Placeholder Replacement
        │
        ▼
HTML Email
        │
        ▼
Gmail
```

---

## Supported Events

| Event | Description |
|--------|-------------|
| Birthday | Sends birthday greetings |
| Anniversary | Sends policy anniversary greetings |
| Premium Due | Sends premium payment reminders |

---

## Template Placeholders

Templates support placeholders such as:

```
{CLIENT_NAME}
{POLICY_NUMBER}
{POLICY_NAME}
{PREMIUM_AMOUNT}
{PREMIUM_DUE_DATE}
```

Additional placeholders can be added through the placeholder helper.

---

## Deployment

Project Argus is designed for cloud deployment.

Recommended stack:

- Railway
- Docker
- GitHub
- n8n

Deployment flow:

```
GitHub
    │
    ▼
Railway
    │
    ▼
Project Argus API
    │
    ▼
n8n
    │
    ▼
Gmail
```

---

