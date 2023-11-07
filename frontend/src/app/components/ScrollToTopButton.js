import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ScrollToTopButtonWrapper } from "@/app/styles/styles.js";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 130);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollToTopButtonWrapper isVisible={isVisible} onClick={scrollToTop}>
      <Image
        src="/assets/icons/arrow.svg"
        alt="Scroll to Top"
        width="35"
        height="35"
        style={{ transform: "rotate(180deg)" }}
      />
    </ScrollToTopButtonWrapper>
  );
}
