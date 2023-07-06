import Header from "@/app/Header";
import Sidebar, { Item } from "@/components/Sidebar";
import SidebarContextProvider from "@/components/Sidebar/SidebarContextProvider";
import { render, screen } from "@testing-library/react";
import * as nextRouter from "next/navigation";

jest.mock("next/navigation");

jest.mock("../hooks/useMatchMedia", () => jest.fn());

test("Renders when some path matches", () => {
  jest.spyOn(nextRouter, "useParams").mockReturnValue({
    id: "1",
  });

  const items: Item[] = [
    {
      type: "link",
      href: "/",
      id: "1",
      label: "Introduction",
    },
  ];

  render(
    <SidebarContextProvider items={items}>
      <Header />
      <Sidebar.Items />
    </SidebarContextProvider>
  );

  expect(
    screen.getByLabelText(/Breadcrumbs?/i, { selector: "ol" })
  ).toContainElement(
    screen.getByRole("link", { name: "Introduction", current: "page" })
  );
});

test("Does not render when path does not match any link", () => {
  jest.spyOn(nextRouter, "useParams").mockReturnValue({
    id: "0",
  });

  const items: Item[] = [
    {
      type: "link",
      href: "/",
      id: "1",
      label: "Introduction",
    },
  ];

  render(
    <SidebarContextProvider items={items}>
      <Header />
      <Sidebar.Items />
    </SidebarContextProvider>
  );

  expect(
    screen.getByLabelText(/Breadcrumbs?/i, { selector: "ol" })
  ).not.toContainElement(
    screen.queryByRole("link", { name: "Introduction", current: "page" })
  );
});

test("Last link contains aria-current page", () => {
  jest.spyOn(nextRouter, "useParams").mockReturnValue({
    id: "1",
  });

  const items: Item[] = [
    {
      type: "category",
      href: "/",
      id: "0",
      label: "Chapter 1",
      items: [
        {
          type: "link",
          href: "/",
          id: "1",
          label: "Introduction",
        },
      ],
    },
  ];

  render(
    <SidebarContextProvider items={items}>
      <Header />
      <Sidebar.Items />
    </SidebarContextProvider>
  );

  expect(screen.getByRole("link", { name: "Chapter 1" })).not.toHaveAttribute(
    "aria-current",
    "page"
  );

  expect(
    screen.getByRole("link", { name: "Introduction", current: "page" })
  ).toBeInTheDocument();
});
