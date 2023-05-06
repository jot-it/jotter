import { ItemProps } from "./Sidebar";

const sidebarConfig: ItemProps[] = [
  {
    type: "category",
    label: "Introduction",
    items: [
      {
        type: "link",
        label: "Topic 1",
        href: "#in01",
      },
      {
        type: "link",
        label: "Topic 2",
        href: "#in02",
      },
      {
        type: "category",
        label: "Topic 3",
        items: [
          {
            type: "link",
            label: "Topic 1",
            href: "#ch01",
          },
          {
            type: "link",
            label: "Topic 2",
            href: "#ch02",
          },
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Chapter 1",
    items: [
      {
        type: "link",
        label: "Topic 1",
        href: "#ch01",
      },
      {
        type: "link",
        label: "Topic 2",
        href: "#ch02",
      },
      {
        type: "link",
        label: "Topic 3",
        href: "#ch03",
      },
    ],
  },
];

export default sidebarConfig;
