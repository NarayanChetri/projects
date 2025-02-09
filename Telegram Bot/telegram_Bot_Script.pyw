import os
import mss
import mss.tools
import subprocess
import pyperclip
import logging
import time
import socket
import re
from telegram import Update
from telegram.ext import Application, MessageHandler, CommandHandler, filters, CallbackContext
from ctypes import cast, POINTER
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume

OWNER_CHAT_ID = 1949030873

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
api_token = os.getenv("TELEGRAM_BOT_TOKEN")

if not api_token:
    raise ValueError("Bot token not set. Please set TELEGRAM_BOT_TOKEN.")


def check_internet_connection():
    try:
        socket.create_connection(("8.8.8.8", 53), timeout=5)
        return True
    except OSError:
        return False


async def check_owner(update: Update) -> bool:
    return update.message.chat.id == OWNER_CHAT_ID


async def change_volume(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    if context.args:
        try:
            level = int(context.args[0])
            if 0 <= level <= 100:
                devices = AudioUtilities.GetSpeakers()
                interface = devices.Activate(IAudioEndpointVolume._iid_, 1, None)
                volume = cast(interface, POINTER(IAudioEndpointVolume))
                volume.SetMasterVolumeLevelScalar(level / 100.0, None)
                await update.message.reply_text(f"Volume set to {level}%")
            else:
                await update.message.reply_text("Provide a volume level (0-100).")
        except ValueError:
            await update.message.reply_text("Provide a valid number between 0 and 100.")
        except Exception as e:
            await update.message.reply_text(f"Error: {e}")
    else:
        await update.message.reply_text("Usage: /volume <level>")


async def shutdown(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    await update.message.reply_text("Shutting down...")
    try:
        subprocess.run("shutdown /s /f /t 0", shell=True)
    except Exception as e:
        logging.error(f"Shutdown error: {e}")
        await update.message.reply_text(f"Error: {e}")


async def restart(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    await update.message.reply_text("Restarting...")
    try:
        subprocess.run("shutdown /r /f /t 0", shell=True)
    except Exception as e:
        logging.error(f"Restart error: {e}")
        await update.message.reply_text(f"Error: {e}")


async def copy_text(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    if context.args:
        text_to_copy = " ".join(context.args)
        pyperclip.copy(text_to_copy)
        await update.message.reply_text(f"Copied: {text_to_copy}")
    else:
        await update.message.reply_text("Usage: /copy <text>")


async def execute_cmd(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    if context.args:
        cmd_command = " ".join(context.args)
        try:
            result = subprocess.run(cmd_command, shell=True, text=True, capture_output=True)
            output = result.stdout.strip() or result.stderr.strip() or "No output."
            await update.message.reply_text(f"Output:\n{output}")
        except Exception as e:
            logging.error(f"CMD error: {e}")
            await update.message.reply_text(f"Error: {e}")
    else:
        await update.message.reply_text("Usage: /cmd <command>")


async def take_screenshot(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return

    try:
        with mss.mss() as sct:
            monitor = sct.monitors[1]
            screenshot = sct.grab(monitor)
            image_file = "screenshot.png"
            mss.tools.to_png(screenshot.rgb, screenshot.size, output=image_file)
        with open(image_file, 'rb') as photo:
            await update.message.reply_photo(photo=photo)
        os.remove(image_file)
    except Exception as e:
        logging.error(f"Screenshot error: {e}")
        await update.message.reply_text("Error taking screenshot.")


async def open_link(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return

    message_text = update.message.text
    url_matches = re.findall(r'https?://[\w./?=&%-]+', message_text)

    if url_matches:
        for url in url_matches:
            try:
                subprocess.run(f"start {url}", shell=True)
                await update.message.reply_text(f"Opening link: {url}")
            except Exception as e:
                logging.error(f"Error opening link: {e}")
                await update.message.reply_text(f"Error: {e}")
    else:
        await update.message.reply_text("No valid URL found in the message.")


async def handle_message(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        return
    message_text = update.message.text
    url_matches = re.findall(r'https?://[\w./?=&%-]+', message_text)

    if url_matches:
        for url in url_matches:
            try:
                subprocess.run(f"start {url}", shell=True)
                await update.message.reply_text(f"Opening link: {url}")
            except Exception as e:
                logging.error(f"Error opening link: {e}")
                await update.message.reply_text(f"Error: {e}")


async def status(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    await update.message.reply_text("Bot is working!")


async def sleep(update: Update, context: CallbackContext) -> None:
    if not await check_owner(update):
        await update.message.reply_text("Unauthorized.")
        return
    await update.message.reply_text("Putting the computer to sleep...")
    try:
        subprocess.run("rundll32.exe powrprof.dll,SetSuspendState 0,1,0", shell=True)
    except Exception as e:
        logging.error(f"Sleep error: {e}")
        await update.message.reply_text(f"Error: {e}")


async def send_startup_message(application):
    try:
        await application.bot.send_message(chat_id=OWNER_CHAT_ID, text="Bot has started successfully.")
    except Exception as e:
        logging.error(f"Failed to send startup message: {e}")


def main():
    while not check_internet_connection():
        logging.info("No internet. Retrying in 5 seconds...")
        time.sleep(5)

    application = Application.builder().token(api_token).build()

    application.add_handler(CommandHandler("shutdown", shutdown))
    application.add_handler(CommandHandler("restart", restart))
    application.add_handler(CommandHandler("copy", copy_text))
    application.add_handler(CommandHandler("cmd", execute_cmd))
    application.add_handler(CommandHandler("screenshot", take_screenshot))
    application.add_handler(CommandHandler("status", status))
    application.add_handler(CommandHandler("volume", change_volume))
    application.add_handler(CommandHandler("openlink", open_link))
    application.add_handler(CommandHandler("sleep", sleep))

    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    application.run_polling()


if __name__ == "__main__":
    main()
