export const mainNavigationItems = [
  {
    label: "Hombre",
    to: "/products?audience=hombre",
    columns: [
      {
        title: "Indumentaria",
        to: "/products?audience=hombre&group=indumentaria",
        links: [
          {
            label: "Camperas",
            to: "/products?audience=hombre&group=indumentaria&type=camperas",
          },
          {
            label: "Camisetas",
            to: "/products?audience=hombre&group=indumentaria&type=camisetas",
          },
        ],
      },
      {
        title: "Calzado",
        to: "/products?audience=hombre&group=calzado",
        links: [
          {
            label: "Botines",
            to: "/products?audience=hombre&group=calzado&type=botines",
          },
          {
            label: "Zapatillas",
            to: "/products?audience=hombre&group=calzado&type=zapatillas",
          },
          {
            label: "Ojotas",
            to: "/products?audience=hombre&group=calzado&type=ojotas",
          },
        ],
      },
      {
        title: "Accesorios",
        to: "/products?audience=hombre&group=accesorios",
        links: [
          {
            label: "Mochilas",
            to: "/products?audience=hombre&group=accesorios&type=mochilas",
          },
        ],
      },
    ],
  },
  {
    label: "Mujer",
    to: "/products?audience=mujer",
    columns: [
      {
        title: "Indumentaria",
        to: "/products?audience=mujer&group=indumentaria",
        links: [
          {
            label: "Tops",
            to: "/products?audience=mujer&group=indumentaria&type=tops",
          },
          {
            label: "Calzas",
            to: "/products?audience=mujer&group=indumentaria&type=calzas",
          },
        ],
      },
      {
        title: "Calzado",
        to: "/products?audience=mujer&group=calzado",
        links: [
          {
            label: "Zapatillas",
            to: "/products?audience=mujer&group=calzado&type=zapatillas",
          },
        ],
      },
      {
        title: "Accesorios",
        to: "/products?audience=mujer&group=accesorios",
        links: [
          {
            label: "Gorras",
            to: "/products?audience=mujer&group=accesorios&type=gorras",
          },
          {
            label: "Bolsos",
            to: "/products?audience=mujer&group=accesorios&type=bolsos",
          },
        ],
      },
    ],
  },
  {
    label: "Kids",
    to: "/products?audience=kids",
    columns: [
      {
        title: "Indumentaria",
        to: "/products?audience=kids&group=indumentaria",
        links: [
          {
            label: "Buzos",
            to: "/products?audience=kids&group=indumentaria&type=buzos",
          },
        ],
      },
      {
        title: "Calzado",
        to: "/products?audience=kids&group=calzado",
        links: [
          {
            label: "Botines",
            to: "/products?audience=kids&group=calzado&type=botines",
          },
          {
            label: "Zapatillas",
            to: "/products?audience=kids&group=calzado&type=zapatillas",
          },
        ],
      },
      {
        title: "Accesorios",
        to: "/products?audience=kids&group=accesorios",
        links: [
          {
            label: "Botellas",
            to: "/products?audience=kids&group=accesorios&type=botellas",
          },
        ],
      },
    ],
  },
  {
    label: "Lanzamientos",
    to: "/products?promo=launch",
    columns: [
      {
        title: "Novedades",
        to: "/products?promo=launch",
        links: [
          { label: "Hombre", to: "/products?promo=launch&audience=hombre" },
          { label: "Mujer", to: "/products?promo=launch&audience=mujer" },
          { label: "Kids", to: "/products?promo=launch&audience=kids" },
        ],
      },
    ],
  },
  {
    label: "Sale",
    to: "/products?promo=sale",
    columns: [
      {
        title: "Ofertas",
        to: "/products?promo=sale",
        links: [
          { label: "Hombre", to: "/products?promo=sale&audience=hombre" },
          { label: "Mujer", to: "/products?promo=sale&audience=mujer" },
          { label: "Kids", to: "/products?promo=sale&audience=kids" },
        ],
      },
    ],
  },
];

export const footerNavigationLinks = [
  { label: "Hombre", to: "/products?audience=hombre" },
  { label: "Mujer", to: "/products?audience=mujer" },
  { label: "Kids", to: "/products?audience=kids" },
  { label: "Sale", to: "/products?promo=sale" },
];
