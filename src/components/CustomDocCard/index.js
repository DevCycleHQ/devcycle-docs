import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // Import the FontAwesomeIcon component.
import "@fortawesome/fontawesome-svg-core/styles.css"
import { library } from '@fortawesome/fontawesome-svg-core' // Import the library component.
import { fab } from '@fortawesome/free-brands-svg-icons' // Import all brands icons.
import { fas } from '@fortawesome/free-solid-svg-icons' // Import all solid icons.'
import { faDataDogIcon } from '../CustomIcons/datadog'
import { vscodeIcon } from '../CustomIcons/vscode'

library.add(fab, fas, faDataDogIcon, vscodeIcon) // Add all icons to the library so you can use them without importing them individually.
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/theme-common/internal'
import styles from './styles.module.css'

function CardContainer({ href, children }) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer)}
    >
      {children}
    </Link>
  )
}
function CardLayout({ href, icon, iconSet, title, description }) {
  return (
    <CardContainer href={href}>
      <h2 className={clsx('text--truncate', styles.cardTitle)} title={title}>
        <FontAwesomeIcon
          icon={iconSet ? [iconSet, icon] : icon}
          className="mr-2"
        />
        <span className="ml-2">{title}</span>
      </h2>

      {description && description != 'hidden' && (
        <p
          className={clsx(styles.cardDescription)}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  )
}
function CardCategory({ item }) {
  const href = findFirstSidebarItemLink(item)

  if (!href) {
    return null
  }

  const { customProps = {} } = item

  return (
    <CardLayout
      href={href}
      title={item.label}
      description={customProps.description}
      icon={customProps.icon}
    />
  )
}
function CardLink({ item }) {
  const doc = useDocById(item.docId ?? undefined)
  return (
    <CardLayout
      href={item.href}
      title={item.label}
      icon={item?.customProps?.icon ? item.customProps.icon : item.icon}
      iconSet={item.iconSet}
      description={doc?.description ?? item.description}
    />
  )
}

export default function CustomDocCard({ item }) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />
    case 'category':
      return <CardCategory item={item} />
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`)
  }
}
