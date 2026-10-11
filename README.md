# Toma el Rasol - Church Class Management Web Application

Production-ready web application for managing a church youth class/group. Built around the brand identity of Saint Bernabas, featuring an **Admin Portal**, **Child User Portal**, QR Code generator, batch QR Code ZIP exporter, Excel importer with interactive column mapping, automatic point rules engine, streak calculator, Eftkad visit tracker, birthday celebration mode, gift store, JSON backup/restore, automated background birthday email notification engine, and Supabase integration.

---

## 1. Direct Access URLs & User Roles

### Direct Access URLs
- **Main Gateway URL**: `Toma_elrasol.html`
- **Admin Portal Direct URL**: `admin/index.html`
- **Child User Portal Direct URL**: `user/index.html`

### Role-Based Access Control
- **General Admin** (`admin` / `GeneralAdmin#733`): Full administrative access to all tabs (Kashf, Leaderboard, Manual Score, Points System, Record Attendance, Attendance History, Eftkad Entry, Eftkad History, Birthdays, Birthday Notifications, Store & Presents, Data Backup).
- **Attendance Admin** (`attendance` / `AttendancePass#733`): Restricted strictly to **Record Attendance** (`attendance`). All other tabs are hidden and blocked.
- **T-dash Admin** (`T-dash` / `TDashPass#733`): Restricted strictly to **Manual Score / Bonus Points** (`score`). The Audit Log and all other tabs are hidden and blocked.

---

## 2. 📧 Automated 24/7 Background Birthday Email Notifications

### Email Recipients Configuration File
> 📁 **EMAIL CONFIGURATION FILE**: [`js/email-config.js`](file:///e:/tahdyrat/Toma%20el%20rasol/Website/js/email-config.js)

To add or remove email addresses that receive automated birthday notifications:
1. Open [`js/email-config.js`](file:///e:/tahdyrat/Toma%20el%20rasol/Website/js/email-config.js) in your text editor.
2. Update the `NOTIFICATION_EMAILS` array:

```javascript
window.EMAIL_CONFIG = {
  NOTIFICATION_EMAILS: [
    'servant@example.com'       // Easily add recipient emails here!
  ],
  ...
};
```

### How 24/7 Background Email Automation Works
The email system runs completely in the background without requiring anyone to open the website or view emails on the site:
1. **Beginning of the Month Roster Email (1st of Month)**:
   - Automatically executes on the 1st day of every month at midnight (`00:00`).
   - Compiles a complete roster of all children celebrating birthdays in that month with their names, IDs, and birthdates.
   - Automatically sends the digest email to all addresses listed in `NOTIFICATION_EMAILS`.
2. **1-Day Advance Reminder Email (Daily)**:
   - Automatically executes every night at midnight (`00:00`).
   - Checks the database for children whose birthday occurs **tomorrow** (`1 day in advance`).
   - Automatically sends a reminder email with the child's name, ID, and upcoming age.
3. **Background Execution Services**:
   - **Supabase Cloud Database `pg_cron`**: Scheduled background jobs in [`schema.sql`](file:///e:/tahdyrat/Toma%20el%20rasol/Website/schema.sql).
   - **GitHub Actions Workflow**: 24/7 cron runner configured in [`.github/workflows/birthday_emails.yml`](file:///e:/tahdyrat/Toma%20el%20rasol/Website/.github/workflows/birthday_emails.yml) executing [`scripts/send_birthday_emails.js`](file:///e:/tahdyrat/Toma%20el%20rasol/Website/scripts/send_birthday_emails.js).

---

## 3. 5-Digit Random Unique Child IDs

- Every child registered manually or via Excel import receives a **5-digit random numeric Child ID** (between `10000` and `99999`, e.g. `48291`, `83910`).
- Uniqueness is enforced to guarantee **zero duplicate IDs** across the entire database.

> 🔑 Administrative login accounts and credentials are listed in [IMPORTANT_INFO.txt](file:///e:/tahdyrat/Toma%20el%20rasol/Website/IMPORTANT_INFO.txt).

---

## 4. Steps to Make the Website Live

### Option A: GitHub Pages (Recommended)
1. Push your project files to a GitHub repository.
2. In your repository on GitHub, click **Settings -> Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Select **Branch**: `main` and **Folder**: `/ (root)`.
5. Click **Save**.
6. GitHub provides your live repository URLs:
   - Gateway: `https://<your-username>.github.io/<repo-name>/Toma_elrasol.html`
   - Admin Direct: `https://<your-username>.github.io/<repo-name>/admin/index.html`
   - User Direct: `https://<your-username>.github.io/<repo-name>/user/index.html`

### Option B: Vercel Deployment
1. Go to [Vercel](https://vercel.com) and click **Add New -> Project**.
2. Import your GitHub repository.
3. Keep standard static site configuration (no build command needed).
4. Click **Deploy**.

---

## 5. Key Functional Modules

### Excel File Import with Interactive Column Mapping
1. Go to **Kashf (Children)** in the Admin Dashboard.
2. Click **📊 Import from Excel**.
3. Select your `.xlsx`, `.xls`, or `.csv` file.
4. Select which Excel columns map to **Child Name** and **Birthdate**.
5. Click **Generate Preview** to review valid records, then click **Import Valid Children**.

### Batch QR Code ZIP Export
1. Go to **Kashf (Children)** in the Admin Dashboard.
2. Click **📥 Export All QR Codes (ZIP)**.
3. The system compiles a QR Code image for every registered child into a downloaded ZIP file (`Toma_el_Rasol_Children_QRCodes.zip`).
4. Each image file inside the ZIP is named after the child's name (e.g. `Ahmed Boutros_CH-0001.png`).

---

## 6. Live Supabase Backend Configuration

1. Create a free project at [Supabase](https://supabase.com).
2. Open **SQL Editor** in your Supabase Dashboard, copy the contents of `schema.sql`, and click **Run**.
3. Go to **Project Settings -> API**, copy your **URL** and **anon public key**.
4. Open `js/config.js` and paste your credentials:

```javascript
window.APP_CONFIG = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  ...
};
```

---

## 7. File Architecture

```text
/
├── Toma_elrasol.html           # Main Gateway Launcher
├── IMPORTANT_INFO.txt          # Credentials & Administrative Notes
├── admin/
│   └── index.html              # Admin Dashboard Portal
├── user/
│   └── index.html              # Child User Portal
├── css/
│   ├── global.css              # St. Thomas color tokens, reset, modals, toasts, utilities
│   ├── admin.css               # Admin layout, sidebar, tables, cards, multi-select list
│   └── user.css                # Gamified dark mode UI, glowing cards, flame animations
├── js/
│   ├── config.js               # Supabase credentials & local storage fallback config
│   ├── email-config.js         # 📧 Recipient Email List Configuration (NOTIFICATION_EMAILS)
│   ├── email-service.js        # Automated HTML email template generator
│   ├── supabase.js             # Hybrid Supabase client & clean LocalStorage driver
│   ├── auth.js                 # General Admin vs Attendance Admin role management
│   ├── utils.js                # Toast notifications, modal manager, date helpers, confetti
│   ├── excel-importer.js       # SheetJS parser, interactive column mapper, preview table
│   ├── qr-engine.js            # QR Code generator & batch ZIP exporter
│   ├── streaks.js              # Mass & Sunday School streak calculator
│   ├── points-engine.js        # Manual points adjustment & automatic rule engine
│   ├── children.js             # Kashf child CRUD, manual entry, profile modal
│   ├── attendance.js           # Bulk attendance recorder & auto points trigger
│   ├── eftkad.js               # Individual servant visit tracker & history table
│   ├── store.js                # Store status ON/OFF toggle, gift CRUD, 1-gift validator
│   ├── leaderboard.js          # Points ranking engine & podium medals
│   ├── birthdays.js            # Monthly birthday organizer & celebration detector
│   ├── notifications.js        # Automated native popup notification engine
│   ├── backup.js               # JSON database export & restore wizard
│   ├── admin-app.js            # Admin tab router & page controller
│   └── user-app.js             # Child user portal controller
├── scripts/
│   └── send_birthday_emails.js # 24/7 Background automated Node.js email dispatcher
├── .github/
│   └── workflows/
│       └── birthday_emails.yml # 24/7 Automated GitHub Actions cron schedule
├── assets/
│   ├── logo/
│   │   └── logo.jpeg           # Application brand logo
│   └── gifts/                  # Gift images
├── schema.sql                  # Complete Supabase DDL SQL script & pg_cron schedules
└── README.md                   # Detailed documentation
```
