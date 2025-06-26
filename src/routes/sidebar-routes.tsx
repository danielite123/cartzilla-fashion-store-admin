import {
  ColorPaletteIcon,
  GroupUsersIcon,
  HomeIcon,
  MailboxIcon,
  SearchBoxIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@/components/icons";

export const sidebarRoutes = [
  {
    title: "Main Menu",
    children: [
      {
        name: "Dashboard",
        path: "/",
        icon: HomeIcon,
      },
      {
        name: "Order Management",
        path: "/orders",
        icon: ShoppingCartIcon,
      },
      {
        name: "Customer",
        path: "/users",
        icon: GroupUsersIcon,
      },
    ],
  },
  {
    title: "Product",
    children: [
      {
        name: "Product",
        path: "/products",
        icon: MailboxIcon,
      },
      {
        name: "Category",
        path: "/categories",
        icon: SearchBoxIcon,
      },
      {
        name: "Color",
        path: "/colors",
        icon: ColorPaletteIcon,
      },
      {
        name: "Brand",
        path: "/brands",
        icon: StarIcon,
      },
    ],
  },
];
