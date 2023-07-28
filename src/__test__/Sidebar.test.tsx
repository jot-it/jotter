import SidebarContextProvider from "@/components/Sidebar/SidebarContextProvider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter} from "next/navigation";
import Sidebar, { Item } from "../components/Sidebar";
import { mocked } from "./helpers";

jest.mock("next/navigation");

type RenderParameters = Parameters<typeof render>;

const renderWithItems = (items: Item[], options?: RenderParameters[1]) => {
  return render(
    <SidebarContextProvider items={items}>
      <Sidebar>
        <Sidebar.Items />
      </Sidebar>
    </SidebarContextProvider>,
    options
  );
};

test("Renders when the document loads", () => {
  renderWithItems([]);

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

test("Renders a link child", () => {
  const items: Item[] = [
    { type: "link", href: "#", label: "item link", id: "0" },
  ];

  renderWithItems(items);

  expect(screen.getByText(/item link/)).toBeInTheDocument();
});

test("Renders a category child", () => {
  const items: Item[] = [
    { type: "category", id: "0", label: "item category", href: "#", items: [] },
  ];

  renderWithItems(items);

  expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
});

test("Links inside categories are hidden by default", () => {
  const items: Item[] = [
    {
      type: "category",
      label: "Category",
      id: "0",
      href: "#",
      items: [
        {
          type: "link",
          label: "Link",
          id: "1",
          href: "#",
        },
      ],
    },
  ];

  renderWithItems(items);

  expect(screen.queryByText(/Link/i)).not.toBeInTheDocument();
});

test("Inactive links do not contain aria-current", () => {
  const items: Item[] = [
    {
      type: "link",
      label: "item",
      id: "0",
      href: "#new",
    },
  ];

  renderWithItems(items);

  expect(screen.getByRole("link")).not.toHaveAttribute("aria-current", "page");
});

test("Active links have aria-current attribute set to page", async () => {
  const items: Item[] = [
    {
      type: "link",
      label: "item",
      id: "0",
      href: "#new",
    },
  ];
  mocked(usePathname).mockReturnValueOnce("#new");

  renderWithItems(items);

  await userEvent.click(screen.getByRole("link"));

  expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
});

// Integration test
test("Category opens and closes when the user clicks on it", async () => {
  mocked(useRouter).mockReturnValueOnce({
    push: jest.fn(),
    
  });

  const items: Item[] = [
    {
      type: "category",
      label: "Category",
      id: "0",
      href: "#",
      items: [
        {
          type: "link",
          label: "Link",
          id: "1",
          href: "#",
        },
      ],
    },
  ];

  renderWithItems(items);

  // Open Category
  expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("region")).toBeVisible();

  // Close Category
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
});
