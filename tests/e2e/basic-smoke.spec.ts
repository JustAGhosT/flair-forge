import { expect, test } from '@playwright/test'

test.describe('Basic Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')
    
    // Verify the page loaded
    await expect(page).toHaveTitle(/FlairForge|AI-Powered Flyer Generator|Vite/)
    
    // Verify basic app structure is present
    const body = await page.locator('body')
    await expect(body).toBeVisible()
  })

  test('app renders without errors', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the app to be interactive
    await page.waitForLoadState('networkidle')
    
    // Check that the root element exists
    const root = await page.locator('#root')
    await expect(root).toBeVisible()
  })

  test('can navigate to homepage multiple times', async ({ page }) => {
    // First navigation
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
    
    // Second navigation
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })
})
