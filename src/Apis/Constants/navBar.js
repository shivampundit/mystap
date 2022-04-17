import contact from "../Assets/Dashboard/contact.svg";
import bq from "../Assets/Dashboard/bq.svg";
import market from "../Assets/Dashboard/market.svg";
import price from "../Assets/Dashboard/price.svg";
import money from "../Assets/Dashboard/moneyIcon.svg";
import products from "../Assets/Dashboard/productsIcon.svg";
// import message from "../Assets/Dashboard/message.svg";
import premiumIcon from "../Assets/Dashboard/premiumIcon.svg";
import { ROUTES } from "../Router/routes";

export const SIDE_MENU = [
  { label: "Manage Leads", icon: contact, to: ROUTES.LEADS },
  { label: "Go Premium", icon: premiumIcon, to: ROUTES.GO_PREMIUM },
  // { label: "BOQ assistance", icon: bq, to: ROUTES.BOQ },
  { label: "Market", icon: market, to: ROUTES.MAGAZINES, target: "_blank" },
  {
    label: "Brand Partner",
    icon: price,
    to: ROUTES.BRAND_OFFERS,
    target: "_blank",
  },
];

export const TOP_NAV_MENU = [
  { label: "Products", to: ROUTES.PRODUCTS, icon: products },
  { label: "Pricing", to: ROUTES.PRICING, icon: money },
  {
    label: "Brand Offers",
    to: ROUTES.BRAND_OFFERS,
    icon: price,
    target: "_blank",
  },
  { label: "Magazine", to: ROUTES.MAGAZINES, icon: market, target: "_blank" },
];
