import React from "react";
import clsx from "clsx";
import { useCurrentSidebarCategory, filterDocCardListItems } from "@docusaurus/theme-common";
import CustomDocCard from "@site/src/components/CustomDocCard";
import CustomDocCardList from "@site/src/components/CustomDocCardList";
function DocCardListForCurrentSidebarCategory({ className }) {
  const category = useCurrentSidebarCategory();
  return <CustomDocCardList items={category.items} className={className} />;
}
export default function DocCardList(props) {
  const { items, className, columnWidth = 6, sidebar_class_name } = props;

  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }
  const filteredItems = filterDocCardListItems(items).filter((item) => item.className != "hidden");
  return (
    <section className={clsx("row", className)}>
      {filteredItems.map((item, index) => (
        <article key={index} className={`col col--${columnWidth} margin-bottom--lg`}>
          <CustomDocCard item={item} />
        </article>
      ))}
    </section>
  );
}
