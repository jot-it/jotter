import { Item } from "./components/Sidebar";

const sidebarConfig: Item[] = [
  {
    type: "category",
    label: "Introduction",
    id: "0",
    items: [
      {
        type: "link",
        label: "Topic 1",
        href: "#in01",
        id: "1",
      },
      {
        type: "link",
        label: "Topic 2",
        href: "#in02",
        id: "2",
      },
      {
        type: "category",
        label: "Topic 3",
        id: "3",
        items: [
          {
            type: "link",
            label: "Topic 1",
            href: "#ch01",
            id: "4",
          },
          {
            type: "link",
            label: "Topic 2",
            href: "#ch02",
            id: "5",
          },
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Chapter 1",
    id: "6",
    items: [
      {
        type: "link",
        label: "Topic 1",
        href: "#ch01",
        id: "7",
      },
      {
        type: "link",
        label: "Topic 2",
        href: "#ch02",
        id: "8",
      },
      {
        type: "link",
        label: "Topic 3",
        href: "#ch03",
        id: "9",
      },
    ],
  },
  {
    type: "link",
    label: "Topic 1",
    href: "#t001",
    id: "10",
  },
];

export default sidebarConfig;
