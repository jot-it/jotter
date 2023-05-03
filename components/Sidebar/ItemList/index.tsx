import SidebarItem, { ItemProps } from "../Item";
import * as Accordion from "@radix-ui/react-accordion";

type SidebarItemListProps = {
  items: ItemProps[];
};

function SidebarItemList({ items }: SidebarItemListProps) {
  return (
    <Accordion.Root type="single" collapsible>
      {items.map((props, index) => (
        // TODO: generate a unique key for each item
        <SidebarItem key={index} {...props} />
      ))}
    </Accordion.Root>
  );
}

export default SidebarItemList;
