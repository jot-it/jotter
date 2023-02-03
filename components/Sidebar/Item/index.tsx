import Category, { CategoryProps } from "./Category";
import Link, { LinkProps } from "./Link";

export type ItemProps = CategoryProps | LinkProps;

function SidebarItem(props: ItemProps) {
  switch (props.type) {
    case "category":
      return <Category {...props} />;
    case "link":
      return <Link {...props} />;
  }
}

export default SidebarItem;
