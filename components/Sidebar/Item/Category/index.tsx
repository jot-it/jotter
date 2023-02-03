import { ItemProps } from "..";
import SidebarItemList from "../../ItemList";

export type CategoryProps = {
  type: "category";
  items: ItemProps[];
};

function Category({ items }: CategoryProps) {
  return <SidebarItemList items={items} />;
}

export default Category;
