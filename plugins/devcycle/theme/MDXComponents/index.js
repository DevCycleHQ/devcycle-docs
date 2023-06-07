import React from 'react'
import MDXHead from '@theme-original/MDXComponents/Head'
import MDXCode from '@theme-original/MDXComponents/Code'
import MDXA from '@theme-original/MDXComponents/A'
import MDXPre from '@theme-original/MDXComponents/Pre'
import MDXDetails from '@theme-original/MDXComponents/Details'
import MDXHeading from '@theme-original/MDXComponents/Heading'
import MDXUl from '@theme-original/MDXComponents/Ul'
import MDXImg from '@theme-original/MDXComponents/Img'
import Admonition from '@theme-original/Admonition'
import Mermaid from '@theme-original/Mermaid'
import Toggle from './Toggle'

export default {
  head: MDXHead,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  details: MDXDetails,
  ul: MDXUl,
  img: MDXImg,
  h1: (props) => <MDXHeading as="h1" {...props} />,
  h2: (props) => <MDXHeading as="h2" {...props} />,
  h3: (props) => <MDXHeading as="h3" {...props} />,
  h4: (props) => <MDXHeading as="h4" {...props} />,
  h5: (props) => <MDXHeading as="h5" {...props} />,
  h6: (props) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid,
  Toggle,
}
