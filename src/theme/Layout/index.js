import React from "react";
import Layout from "@theme-original/Layout";
import Head from "@docusaurus/Head";
import { Analytics } from "@vercel/analytics/react";

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <Analytics />
    </>
  );
}
