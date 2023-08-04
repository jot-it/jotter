import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const SIDEBAR_PAGES = [
  "Introduction to Computer Science",
  "Algorithms",
  "Data Structures",
];

test("should add a new page with the name provided", async ({ page }) => {
  await page.getByRole("button", { name: /ADD NEW PAGE/i }).click();
  const newNote = await page.getByPlaceholder(/new note name/i);
  await newNote.fill(SIDEBAR_PAGES[0]);
  await newNote.press("Enter");

  await expect(
    page.getByRole("link", { name: SIDEBAR_PAGES[0] }),
  ).toBeVisible();
});

test.describe("Sidebar root context menu", () => {
  test("should create a new page", async ({ page }) => {
    await page.getByTestId("sidebar-item-list").click({ button: "right" });
    await page.getByRole("menuitem", { name: "New Page" }).click();
    const newNote = await page.getByPlaceholder(/new note name/i);
    await expect(newNote).toBeFocused();
    await expect(newNote).toBeEditable();
    await newNote.fill(SIDEBAR_PAGES[0]);
    await newNote.press("Enter");
    await expect(
      page.getByRole("link", { name: SIDEBAR_PAGES[0] }),
    ).toBeVisible();
  });

  test("should create a new category", async ({ page }) => {
    await page.getByTestId("sidebar-item-list").click({ button: "right" });
    await page.getByRole("menuitem", { name: "New category" }).click();
    const newNote = await page.getByPlaceholder(/new note name/i);
    await newNote.fill(SIDEBAR_PAGES[0]);
    await newNote.press("Enter");
    await expect(
      page.getByRole("button", { name: SIDEBAR_PAGES[0] }),
    ).toBeVisible();
  });
});

test.describe("Items context menu", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultPages(page);
  });

  test("should delete existing item", async ({ page }) => {
    const notes = page.getByTestId("sidebar-item");
    const firstPage = notes.nth(0);
    await firstPage.click({ button: "right" });
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await expect(notes).toHaveText(SIDEBAR_PAGES.slice(1));
  });

  test("should allow renaming item", async ({ page }) => {
    const notes = page.getByTestId("sidebar-item");
    await notes.nth(1).click({ button: "right" });
    await page.getByRole("menuitem", { name: /rename/i }).click();
    await page.locator("input").fill("My Renamed item");
    await page.locator("input").press("Enter");
    await expect(notes.nth(1)).toHaveText("My Renamed item");
  });
});

test.describe("category context menu", () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultCategories(page);
  });

  test("should allow creating new pages or sub-categories", async ({
    page,
  }) => {
    const items = page.getByTestId("sidebar-item");
    await items.nth(1).click({ button: "right" });
    await expect(page.getByRole("menu")).toContainText([
      /new page/i,
      /new category/i,
    ]);
  });

  test("should open when an item is created", async ({ page }) => {
    const items = page.getByTestId("sidebar-item");
    await items.nth(0).click({ button: "right" });
    await page.getByRole("menuitem", { name: /new page/i }).click();
    await expect(page.getByPlaceholder(/new note name/i)).toBeVisible();
  });

  test("should add a nested new page", async ({ page }) => {
    const items = page.getByTestId("sidebar-item");
    await items.nth(1).click({ button: "right" });
    await page.getByRole("menuitem", { name: /new page/i }).click();
    const input = page.getByPlaceholder(/new note name/i);
    await expect(input).toBeVisible();
    await input.fill(SIDEBAR_PAGES[1]);
    await input.press("Enter");
    await expect(items.nth(1).getByTestId("sidebar-item-list")).toHaveText(
      SIDEBAR_PAGES[1],
    );
  });
});

async function createDefaultPages(page: Page) {
  for (const label of SIDEBAR_PAGES) {
    await page.getByRole("button", { name: /add new page/i }).click();
    const newNote = await page.getByPlaceholder(/new note name/i);
    await newNote.fill(label);
    await newNote.press("Enter");
  }
}

async function createDefaultCategories(page: Page) {
  const itemLists = page.getByTestId("sidebar-item-list");
  for (const label of SIDEBAR_PAGES) {
    await itemLists.click({ button: "right" });
    await page.getByRole("menuitem", { name: "New category" }).click();
    const input = page.getByPlaceholder(/new note name/i);
    await input.fill(label);
    await input.press("Enter");
  }
}
