import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Sidebar, { Item } from "../components/Sidebar";
import { RiSideBarFill } from "react-icons/ri";

test("Renders when the document loads", () => {
  render(
    <Sidebar items={[]}>
      <Sidebar.Items />
    </Sidebar>
  );
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

test("Renders a link child", () => {
  const items: Item[] = [
    { type: "link", href: "#", label: "item link", id: 0 },
  ];

  render(
    <Sidebar items={items}>
      <Sidebar.Items />
    </Sidebar>
  );

  expect(screen.getByText(/item link/)).toBeInTheDocument();
});

test("Renders a category child", () => {
  const items: Item[] = [
    { type: "category", id: 0, label: "item category", items: [] },
  ];

  render(
    <Sidebar items={items}>
      <Sidebar.Items />
    </Sidebar>
  );
  expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
});

test("Links inside categories are hidden by default", () => {
  const items: Item[] = [
    {
      type: "category",
      label: "Category",
      id: 0,
      items: [
        {
          type: "link",
          label: "Link",
          id: 1,
          href: "#",
        },
      ],
    },
  ];

  render(
    <Sidebar items={items}>
      <Sidebar.Items />
    </Sidebar>
  );
  expect(screen.queryByText(/Link/i)).not.toBeInTheDocument();
});

// Integration test
test("Category opens and closes when the user clicks on it", async () => {
  const items: Item[] = [
    {
      type: "category",
      label: "Category",
      id: 0,
      items: [
        {
          type: "link",
          label: "Link",
          id: 1,
          href: "#",
        },
      ],
    },
  ];

  render(
    <Sidebar items={items}>
      <Sidebar.Items />
    </Sidebar>
  );

  // Open Category
  expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("region")).toBeVisible();

  // Close Category
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("region", { hidden: true })).not.toBeVisible();
});

// test.skip("Open context-menu when user use right click");
