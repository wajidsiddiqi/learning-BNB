"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
// import Footer from "./components/Footer";
// import EnlargeImage from "./components/EnlargeImage";
// import { TotalSupply } from "./components/getterFuntions";
import Mint from "./components/Mint";
import { gloock } from "./fonts";
import {
  PageWrapper,
  MainH1Title,
  ParaBig,
  ParaMid,
  ParaSm,
  StyledButton,
  ImageContainer,
  ImageStyle,
  Center,
  LeftSide,
  RightSide,
  Container,
  Box,
  ChildContainer,
  BoxContainer,
  Icon,
  QuantityBox,
  BoxContainer_2,
  ParaContainer,
} from "@/app/styles/styles.js";

export default function Home() {
  const [mintQuantity, setMintQuantity] = useState(1);

  const handleDecrement = () => {
    if (mintQuantity <= 1) return;
    setMintQuantity(mintQuantity - 1);
  };

  const handleIncrement = () => {
    if (mintQuantity >= 2) return;
    setMintQuantity(mintQuantity + 1);
  };

  return (
    <React.Fragment>
      <Header />
      <PageWrapper>
        <Container>
          <MainH1Title className={gloock.className}>
            Flora Pixel for Earth's Future
          </MainH1Title>
          <ParaContainer>
            <ParaBig>
              Watch beauty bloom with 'Flower Pixel' NFTs. These digital
              blossoms are more than pixels; they're petals of hope for our
              environment. Invest in art that invests in nature. Mint now!
            </ParaBig>
          </ParaContainer>
          <Box>
            <BoxContainer_2>
              <ChildContainer>
                <Center>
                  <StyledButton
                    style={{
                      borderTopRightRadius: "0rem",
                      borderBottomRightRadius: "0rem",
                    }}
                    onClick={handleDecrement}
                  >
                    -
                  </StyledButton>
                  <QuantityBox>{mintQuantity}</QuantityBox>
                  <StyledButton
                    style={{
                      borderTopLeftRadius: "0rem",
                      borderBottomLeftRadius: "0rem",
                    }}
                    onClick={handleIncrement}
                  >
                    +
                  </StyledButton>
                </Center>
              </ChildContainer>

              <ChildContainer>
                <Center>
                  <Mint quantity={mintQuantity} />{" "}
                </Center>
              </ChildContainer>
            </BoxContainer_2>
            <ParaSm>Mint Price: 0.01 BNB</ParaSm>
          </Box>
        </Container>
      </PageWrapper>
      {/* <Footer /> */}
    </React.Fragment>
  );
}
