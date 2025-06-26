import {
  ColorPaletteIcon,
  GroupUsersIcon,
  HomeIcon,
  MailboxIcon,
  SearchBoxIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@/components/icons";

export interface SidebarRoute {
  name: string;
  path?: string;
  icon: React.ReactNode;
  children?: SidebarRoute[];
}

export const sidebarRoutes: {
  title: string;
  children: SidebarRoute[];
}[] = [
  {
    title: "Main Menu",
    children: [
      {
        name: "Dashboard",
        path: "/",
        icon: <HomeIcon className="text-neutral-500" />,
      },
      {
        name: "Order Management",
        path: "/orders",
        icon: <ShoppingCartIcon className="text-neutral-500" />,
      },
      {
        name: "Customer",
        path: "/users",
        icon: <GroupUsersIcon className="text-neutral-500" />,
      },
    ],
  },
  {
    title: "Product",
    children: [
      {
        name: "Product",
        path: "/products",
        icon: <MailboxIcon className="text-neutral-500" />,
      },
      {
        name: "Category",
        path: "/categories",
        icon: <SearchBoxIcon className="text-neutral-500 " />,
      },
      {
        name: "Color",
        path: "/colors",
        icon: <ColorPaletteIcon className="text-neutral-500 " />,
      },
      {
        name: "Brand",
        path: "/brands",
        icon: <StarIcon className="text-neutral-500 " />,
      },
    ],
  },
];
