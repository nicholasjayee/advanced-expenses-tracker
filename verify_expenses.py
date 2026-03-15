
import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            # Navigate to the Expenses page directly (hash router)
            print("Navigating to expenses page...")
            await page.goto("http://localhost:3000/#/expenses", timeout=30000)

            # Wait for any text that indicates the page is loading/loaded
            # "Add Expense" is likely a button or header on the expenses page
            print("Waiting for page content...")
            await page.wait_for_selector("text=Expenses", timeout=10000)

            # Click "Chart View"
            print("Clicking Chart View...")
            await page.click("text=Chart View")

            # Wait a bit for animations/rendering
            await page.wait_for_timeout(2000)

            # Take a screenshot
            print("Taking screenshot...")
            await page.screenshot(path="expenses_screenshot.png", full_page=True)
            print("Screenshot taken successfully")
        except Exception as e:
            print(f"Error: {e}")
            # Take a debug screenshot if possible
            try:
                await page.screenshot(path="debug_screenshot.png")
                print("Debug screenshot taken")
            except:
                pass
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
