import SidebarItem, { ItemProps } from "../Item";

type SidebarItemListProps = {
  items: ItemProps[];
};

function SidebarItemList({ items }: SidebarItemListProps) {
  return (
    <>
      {items.map((props, index) => (
        // TODO: generate a unique key for each item
        <ul key={index}>
          <SidebarItem {...props} />
        </ul>
      ))}
    </>
  );
}

export default SidebarItemList;
