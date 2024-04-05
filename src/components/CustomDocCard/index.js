import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify-icon/react";

import { findFirstSidebarItemLink, useDocById } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";

function CardContainer({ href, children }) {
  return (
    <Link href={href} className={clsx("card padding--lg", styles.cardContainer)}>
      {children}
    </Link>
  );
}
function CardLayout({ href, icon, title, description }) {
  return (
    <CardContainer href={href}>
      <h2 className={clsx("flex", styles.cardTitle)} title={title}>
        <Icon icon={icon} height="24" className="mr-2" />
        <span className="ml-2">{title}</span>
      </h2>

      {description && description != "hidden" && (
        <p className={clsx(styles.cardDescription)} title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}
function CardCategory({ item }) {
  const href = findFirstSidebarItemLink(item);

  if (!href) {
    return null;
  }

  const { customProps = {} } = item;

  return <CardLayout href={href} title={item.label} description={customProps.description} icon={customProps.icon} />;
}
function CardLink({ item }) {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      href={item.href}
      title={item.label}
      icon={item?.customProps?.icon ? item.customProps.icon : item.icon}
      description={doc?.description ?? item.description}
    />
  );
}

export default function CustomDocCard({ item }) {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
