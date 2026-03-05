from playwright.sync_api import sync_playwright
import time

def verify_dashboard():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the dashboard
        page.goto("http://localhost:3000/")

        # Wait for the dashboard to load (wait for the "Dashboard" heading)
        page.wait_for_selector("h2:has-text('Dashboard')", timeout=5000)

        # Give charts and data a moment to render
        time.sleep(2)

        # Take a screenshot
        page.screenshot(path="dashboard_verification.png", full_page=True)
        print("Screenshot saved to dashboard_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_dashboard()