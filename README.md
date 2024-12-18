# 🌐 Cloudflare Dynamic WAN IP Fixer

Keep your DNS records always up-to-date with your current WAN IP! This application continuously checks your public IP, updates a Cloudflare DNS `A` record if it changes, and sends email notifications about the change. Perfect for home servers, dynamic IP connections, or any environment where you need a stable domain pointing to your ever-changing IP.

## ✨ Features

- **Automatic IP Checks:** Regularly fetches your public IP from `https://api.ipify.org`.
- **Cloudflare DNS Updates:** Compares your current WAN IP with what’s on Cloudflare and updates the DNS `A` record if needed.
- **Email Notifications:** Sends an email alert each time your WAN IP changes.
- **Fake Mode for Testing:** Simulate IP changes for development or testing without affecting real DNS records.
- **Dockerized:** Easily run as a container for simplified deployment.

## 🏗️ How It Works

1. **Fetch Current IP:**  
   The app retrieves your WAN IP periodically (default every 5 minutes) via a public IP service.

2. **Compare IP with Cloudflare DNS:**  
   It checks the current DNS `A` record at Cloudflare. If the WAN IP differs, it updates the record with your new IP.

3. **Notify by Email:**  
   When a change occurs, the app sends an email notification to inform you that your WAN IP has changed.

## 🔧 Configuration

All configuration is done via environment variables. Store them in a `.env` file at the project root or set them as environment variables in your deployment environment.

**Required Variables:**

| Variable                  | Description                                                            | Default           |
|---------------------------|------------------------------------------------------------------------|-------------------|
| `INTERVAL_SECONDS`        | Interval in seconds between IP checks.                                 | `300` (5 minutes) |
| `CLOUDFLARE_API_TOKEN`    | Cloudflare API token with DNS edit permissions.                        | *none*            |
| `CLOUDFLARE_ZONE_ID`      | The Cloudflare Zone ID for your domain.                                | *none*            |
| `CLOUDFLARE_RECORD_ID`    | The specific DNS record ID to update.                                  | *none*            |
| `CLOUDFLARE_RECORD_NAME`  | The DNS record name (e.g. `example.com`).                              | *none*            |
| `FAKE_MODE`               | Set to `"true"` to simulate IP changes for testing, otherwise `"false"`. | `"false"`         |
| `EMAIL_HOST`              | SMTP host for sending emails.                                          | `smtp.gmail.com`  |
| `EMAIL_PORT`              | SMTP port (e.g., `465` for SSL, `587` for TLS).                         | `465`             |
| `EMAIL_SECURE`            | `"true"` for SSL, `"false"` for non-SSL (STARTTLS).                     | `"true"`          |
| `EMAIL_USER`              | Sender email address (SMTP username).                                   | *none*            |
| `EMAIL_PASS`              | SMTP password or app password.                                          | *none*            |
| `EMAIL_TO`                | Recipient email address for notifications.                              | *none*            |

### Where to Find These Values

- **Cloudflare Credentials:**
    - **Zone ID & Record ID:**  
      Log into Cloudflare → Select your domain → **Overview** for Zone ID.  
      For Record ID, use the Cloudflare API:
      ```bash
      curl -X GET "https://api.cloudflare.com/client/v4/zones/<CLOUDFLARE_ZONE_ID>/dns_records"          -H "Authorization: Bearer <CLOUDFLARE_API_TOKEN>"          -H "Content-Type: application/json"
      ```
      Find the A record you want to update and note its `id`.

    - **Cloudflare API Token:**  
      Go to **My Profile** → **API Tokens** → **Create Token** with DNS Edit permissions.

- **Email Credentials:**
    - **EMAIL_HOST & PORT:**  
      For Gmail: `smtp.gmail.com` and port `465` (SSL) or `587` (STARTTLS).
    - **EMAIL_USER & EMAIL_PASS:**  
      Use your email address and a secure app password if using Gmail with 2FA.

Set these values in `.env`:

```env
INTERVAL_SECONDS=300
CLOUDFLARE_API_TOKEN=<your_cloudflare_token>
CLOUDFLARE_ZONE_ID=<your_zone_id>
CLOUDFLARE_RECORD_ID=<your_record_id>
CLOUDFLARE_RECORD_NAME=example.com
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@example.com
FAKE_MODE=false
```

## 🚀 Deployment

### Run with Docker

1. **Build the Image:**
   ```bash
   docker build -t yourname/cloudflaredynwanipfixer .
   ```

2. **Run the Container:**
   ```bash
   docker run -d --name cloudflare_wan -env-file .env yourname/cloudflaredynwanipfixer
   ```

   The app will now periodically check your IP and update your DNS record if needed.

### Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.9'
services:
  cloudflaredynwanipfixer:
    build: .
    env_file:
      - .env
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```

### Running Without Docker

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build and run:
   ```bash
   npm run build
   npm start
   ```

Make sure `.env` is properly set!

## 🧪 Testing

- **Unit Tests & Coverage:**  
  Run:
  ```bash
  npm test
  ```

  A coverage report will be generated in the `coverage` directory.

- **Fake Mode:**  
  Set `FAKE_MODE=true` in `.env` to simulate IP changes without calling external services.

## 💡 Tips

- Regularly check logs for any errors in container using:
  ```bash
  docker logs cloudflare_wan
  ```
- Update your tokens and passwords periodically for security.
- Adjust `INTERVAL_SECONDS` depending on how frequently your IP changes.

## ❤️ Contribute

Feel free to open issues or submit PRs to improve this project. Let’s keep DNS updates smooth and automatic!

---

**Now you’re all set!** Get your environment variables ready, spin up the container, and enjoy an automatically updated DNS record for your dynamic WAN IP.
