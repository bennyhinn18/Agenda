from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import time

options = webdriver.ChromeOptions()
options.add_argument("user-data-dir=C:/Users/benny/AppData/Local/Google/Chrome/User Data/Default/insta")

# Initialize Chrome WebDriver
driver = webdriver.Chrome(options=options)
'''
# Open Instagram login page
driver.get("https://www.instagram.com/accounts/login/")

# Wait for the login elements to be present
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.NAME, "username"))
)

# Enter your username and password
username = driver.find_element(By.NAME, "username")
password = driver.find_element(By.NAME, "password")
username.send_keys("bennyhinn_17")
password.send_keys("bN3IF-5xqKz4aSW")
password.send_keys(Keys.RETURN)

# Wait for the main page to load
WebDriverWait(driver, 20).until(
    EC.presence_of_element_located((By.XPATH, "//div[@role='dialog']"))
)
'''
# Navigate to the direct messages page
driver.get("https://www.instagram.com/direct/inbox/")

# Wait for the messages to load
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//div[@role='dialog']"))
)

# Open the first chat
first_chat = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//div[@role='dialog']//a"))
)
first_chat.click()

# Scrape messages
while True:
    try:
        # Look for the message elements
        messages = WebDriverWait(driver, 5).until(
            EC.presence_of_all_elements_located((By.XPATH, "//div[@role='dialog']//div[@class='_7UhW9   xLCgt      MMzan  KV-D4              fDxYl     ']"))
        )
        
        for message in messages:
            print(message.text)
        
        # Check for new messages every 5 seconds
        time.sleep(5)
    except (StaleElementReferenceException, NoSuchElementException):
        print("Chat not found or stale element reference. Retrying...")
        break  # Exit the loop

# Close the WebDriver
driver.quit()