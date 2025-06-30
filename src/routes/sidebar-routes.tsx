import {
  ChatIcon,
  CreditCardIcon,
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
        path: "/customers",
        icon: GroupUsersIcon,
      },
      {
        name: "Mails",
        path: "/mails",
        icon: ChatIcon,
      },
      {
        name: "Transaction",
        path: "/transaction",
        icon: CreditCardIcon,
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
        name: "Brand",
        path: "/brands",
        icon: StarIcon,
      },
    ],
  },
];
