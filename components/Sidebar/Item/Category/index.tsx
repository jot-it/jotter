import * as Accordion from "@radix-ui/react-accordion";
import SidebarItem, { ItemProps } from "..";
import SidebarItemList from "../../ItemList";
import { IoChevronDownOutline as Chevron } from "react-icons/io5";

export type CategoryProps = {
  type: "category";
  label: string;
  items: ItemProps[];
};

function Category({ items, label }: CategoryProps) {
  return (
    <Accordion.Item value={label}>
      <Accordion.Header>
        <Accordion.Trigger className="inline-flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-gray-800 hover:bg-gray-100">
          {label}
          <Chevron className="group-data-[state=open]:rotate-180" aria-hidden />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="ml-2">
        <SidebarItemList items={items} />
      </Accordion.Content>
    </Accordion.Item>
  );
}

export default Category;
