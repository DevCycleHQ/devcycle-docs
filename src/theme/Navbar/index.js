// Note: importing from "@theme/Footer" would fail due to the file importing itself
import OriginalNavbar from '@theme-original/Navbar';
import React, { useEffect } from 'react';

import {
  useColorMode
} from '@docusaurus/theme-common';

export default function Navbar(props) {
  const { isDarkTheme } = useColorMode();

  useEffect(() => {
    if (isDarkTheme) {
      document.querySelector('html').classList.add("dark");
    } else {
      document.querySelector('html').classList.remove("dark");
    }
  }, [isDarkTheme])
  return (
    <>
      <OriginalNavbar {...props} />
      <div className="bg-gradient-to-l from-blue-700 to-blue-500 h-2"></div>
    </>
  );
}
