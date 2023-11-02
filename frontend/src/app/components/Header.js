"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import NextLink from "next/link";
import Hamburger from "hamburger-react";
import { Link as ScrollLink } from "react-scroll";

import {
  CenterSpaceBetween,
  CenterSpaceAround,
  MaxWidth,
  StyledConnectButton,
  StyledNav,
  StyledButton,
  HamburgerMenu,
  HeaderBtn,
  NavLinkText,
} from "@/app/styles/styles.js";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 675);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <StyledNav>
      <MaxWidth style={{ margin: "auto" }}>
        <CenterSpaceBetween>
          <NextLink href="/" style={{ textDecoration: "none" }}>
            <Image src="/assets/logo.svg" width="35" height="35" alt="Logo" />
          </NextLink>
          {/* Hamburger Menu */}
          {isMobile && isOpen && (
            <HamburgerMenu right={isOpen}>
              <CenterSpaceAround
                style={{ flexDirection: "column", gap: "2rem" }}
              >
                <NextLink
                  href="/"
                  style={{ textDecoration: "none" }}
                  onClick={handleMenuClose}
                >
                  <NavLinkText>Home</NavLinkText>
                </NextLink>

                <ScrollLink
                  to="roadmap"
                  smooth={true}
                  duration={500}
                  onClick={handleMenuClose}
                >
                  <NavLinkText>Roadmap</NavLinkText>
                </ScrollLink>

                <ScrollLink
                  to="team"
                  smooth={true}
                  duration={500}
                  onClick={handleMenuClose}
                >
                  <NavLinkText>Team</NavLinkText>
                </ScrollLink>

                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  onClick={handleMenuClose}
                >
                  <NavLinkText>About</NavLinkText>
                </ScrollLink>
              </CenterSpaceAround>
            </HamburgerMenu>
          )}

          {/* Menue */}
          {!isMobile && (
            <CenterSpaceAround style={{ gap: "2rem" }}>
              <NextLink href="/" style={{ textDecoration: "none" }}>
                <NavLinkText>Home</NavLinkText>
              </NextLink>

              <ScrollLink to="roadmap" smooth={true} duration={500}>
                <NavLinkText>Roadmap</NavLinkText>
              </ScrollLink>

              <ScrollLink to="team" smooth={true} duration={500}>
                <NavLinkText>Team</NavLinkText>
              </ScrollLink>

              <ScrollLink to="about" smooth={true} duration={500}>
                <NavLinkText>About</NavLinkText>
              </ScrollLink>
            </CenterSpaceAround>
          )}

          <HeaderBtn>
            <ConnectKitButton.Custom>
              {({ show, isConnected }) => {
                return (
                  <StyledConnectButton onClick={show}>
                    {isConnected ? "Disconnect" : "Connect"}
                  </StyledConnectButton>
                );
              }}
            </ConnectKitButton.Custom>

            {/* Hamburger Button - Fixed position */}
            {isMobile && (
              <StyledButton
                style={{ zIndex: "999", margin: "0", padding: "0" }}
              >
                <Hamburger
                  toggled={isOpen}
                  toggle={handleMenuToggle}
                  size={19.2}
                />
              </StyledButton>
            )}
          </HeaderBtn>
        </CenterSpaceBetween>
      </MaxWidth>
    </StyledNav>
  );
}
