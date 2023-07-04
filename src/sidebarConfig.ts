import { Item } from "./components/Sidebar";

const sidebarConfig: Item[] = [
  {
    type: "category",
    label: "Introduction",
    href: "/note/0",
    id: "0",
    items: [
      {
        type: "link",
        label: "Topic 1",
        href: "/note/1",
        id: "1",
      },
      {
        type: "link",
        label: "Topic 2",
        href: "/note/2",
        id: "2",
      },
      {
        type: "category",
        label: "Topic3",
        href: "/note/3",
        id: "3",
        items: [
          {
            type: "link",
            label: "Topic 1",
            href: "/note/4",
            id: "4",
          },
          {
            type: "link",
            label: "Topic 2",
            href: "/note/5",
            id: "5",
          },
        ],
      },
    ],
  },
  {
    type: "category",
    label: "Chapter1",
    href: "/note/6",
    id: "6",
    items: [
      {
        type: "link",
        label: "Topic 1",
        href: "/note/7",
        id: "7",
      },
      {
        type: "link",
        label: "Topic 2",
        href: "/note/8",
        id: "8",
      },
      {
        type: "link",
        label: "Topic 3",
        href: "/note/9",
        id: "9",
      },
    ],
  },
  {
    type: "link",
    label: "Topic1",
    href: "/note/10",
    id: "10",
  },
];

export default sidebarConfig;
