# Telegram Bot to Control Your PC 💻📲

Easily control your PC using commands sent through a Telegram bot. This project includes features like shutdown, restart, volume control, clipboard copy, screenshot capture, and more.

---
## Features 🔗
- **Shutdown and Restart:** Control PC power state.
- **Volume Control:** Set system volume to a desired level.
- **Clipboard Management:** Copy text directly from Telegram.
- **Command Execution:** Run shell commands and get outputs.
- **Screenshot Capture:** Take and receive screenshots of the primary monitor.
- **Open URLs:** Launch web links from Telegram.
- **Sleep Mode:** Put your PC to sleep remotely.
- **Status Check:** Verify if the bot is active.

---
## Installation 🔄
Follow these steps to set up and run the bot.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Python
- Download and install Python from [https://www.python.org/downloads/](https://www.python.org/downloads/).
- Verify installation by running:
  ```bash
  python --version
  ```

### 3. Install Required Libraries
Run the following command to install all necessary libraries:
```bash
pip install python-telegram-bot pyperclip pycaw mss
```

### 4. Configure the Bot

#### **Create a Telegram Bot:**
1. Open Telegram and search for `@BotFather`.
2. Start a chat and use the command `/newbot`.
3. Follow the instructions to set up the bot and get the **Bot Token**.

#### **Get Your Chat ID:**
1. Search for `@userinfobot` in Telegram.
2. Start a chat, and it will display your **Chat ID**.

### 5. Set Environment Variables
Setting environment variables ensures that sensitive information is not hardcoded.

#### **On Windows:**
1. Open Command Prompt and run:
   ```bash
   setx TELEGRAM_BOT_TOKEN "your_bot_token_here"
   ```
2. Replace `OWNER_CHAT_ID` in the code with your chat ID.

#### **On Linux/Mac:**
1. Open the terminal and run:
   ```bash
   export TELEGRAM_BOT_TOKEN="your_bot_token_here"
   ```
2. Replace `OWNER_CHAT_ID` in the code with your chat ID.

### 6. Start the Bot
Run the main script:
```bash
python main.py
```

---
## Usage 📑
Here’s how to use various commands through Telegram:

1. **Volume Control:**
   ```
   /volume <level>
   ```
   Example:
   ```
   /volume 50
   ```
   Sets the volume to 50%.

2. **Shutdown:**
   ```
   /shutdown
   ```
   Turns off the PC.

3. **Restart:**
   ```
   /restart
   ```
   Restarts the PC.

4. **Copy Text to Clipboard:**
   ```
   /copy <text>
   ```
   Example:
   ```
   /copy Hello, World!
   ```

5. **Execute Shell Commands:**
   ```
   /cmd <command>
   ```
   Example:
   ```
   /cmd dir
   ```

6. **Take Screenshot:**
   ```
   /screenshot
   ```
   Captures the primary monitor screenshot and sends it back.

7. **Open URL:**
   ```
   /openlink <url>
   ```
   Example:
   ```
   /openlink https://google.com
   ```

8. **Put PC to Sleep:**
   ```
   /sleep
   ```

9. **Check Bot Status:**
   ```
   /status
   ```

---
## Important Notes 📊
- **Replace `TELEGRAM_BOT_TOKEN` with your own token and `OWNER_CHAT_ID` with your own chat ID.**
- Ensure the bot token is securely stored.
- The project uses Windows commands; modify shell commands for other OS.

---
## Troubleshooting ⚠️
1. **Internet Connection Error:**
   Ensure your PC has an active internet connection.

2. **Unauthorized Access:**
   Only the specified chat ID can issue commands.

3. **Bot Token Error:**
   Ensure the `TELEGRAM_BOT_TOKEN` environment variable is correctly set.

---
🔐 Stay Secure and Happy Automating!

