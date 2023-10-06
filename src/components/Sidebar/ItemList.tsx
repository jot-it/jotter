import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { useSnapshot } from "valtio";
import SidebarItem, { Item } from "./Item";

export type SidebarItemListProps = {
  items: Item[];
};

function SidebarItemList({ items }: SidebarItemListProps) {
  const [value, setValue] = useState<string[]>([]);
  const setOpen = (id: string) => {
    setValue((prev) => [...prev, id]);
  };
  const snap = useSnapshot(items);
  return (
    <Accordion.Root
      className="h-full"
      type="multiple"
      value={value}
      onValueChange={(values) => setValue(values)}
      data-testid="sidebar-item-list"
    >
      {snap.map(({ id }, i) => (
        <SidebarItem
          item={items[i]}
          parent={items}
          key={id}
          setOpen={setOpen}
        />
      ))}
    </Accordion.Root>
  );
}

export default SidebarItemList;
