import styled, { keyframes } from "styled-components";

//!Colors
const Purple = "#e57bff";
const DarkPurple = "#171319";

const MaxWidth = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: auto;
`;

//!Wrappers Styles
const PageWrapper = styled(MaxWidth)`
  width: 100%;
  height: 100&;
  display: flex;
  flex-direction: column;
  padding: 0rem 6rem;
  padding-top: 120px;

  @media (max-width: 675px) {
    padding: 120px 40px 0px 40px;
  }

  @media (max-width: 592px) {
    padding: 100px 40px 0px 40px;
  }

  @media (max-width: 375px) {
    padding: 100px 30px 0px 30px;
  }
`;

//!Heading Styles
const MainH1Title = styled.h1`
  color: white;
  font-size: 80px;
  text-align: center;
  /* text-transform: uppercase; */
  font-weight: 800;

  @media (max-width: 592px) {
    line-height: 0.95;
    font-size: 60px;
  }

  @media (max-width: 385px) {
    font-size: 50px;
    line-height: 0.9;
  }
`;

const H1Title = styled(MainH1Title)`
  font-size: 60px;
  margin-bottom: 80px;

  @media (max-width: 385px) {
    font-size: 50px;
  }
`;

const H2Title = styled(MainH1Title)`
  color: ${(props) => (props.$Dark ? DarkPurple : "#ffff")};
  font-size: 75px;

  @media (max-width: 425px) {
    font-size: 60px;
  }
`;

const H3Title = styled(H2Title)`
  font-size: 40px;

  @media (max-width: 425px) {
    font-size: 30px;
  }
`;

//!Paragraph Styles
const ParaBig = styled.p`
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 300;
  text-align: center;

  @media (max-width: 592px) {
    font-size: 1.3rem;
  }
`;

const ParaMid = styled(ParaBig)`
  font-size: 20px;
  color: ${(props) => (props.Dark ? DarkPurple : "#ffff")};
  font-weight: 400;

  @media (max-width: 425px) {
    font-weight: 350;
    font-size: 18px;
  }
`;

const ParaSm = styled(ParaMid)`
  font-size: 1rem;
  font-weight: 500;
  color: ${DarkPurple};
  font-style: italic;
`;

//!Containers & Boxes
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterSpaceAround = styled(Center)`
  justify-content: space-around;
`;

const CenterSpaceBetween = styled(Center)`
  justify-content: space-between;
`;

const BoxContainer = styled(CenterSpaceBetween)`
  width: 100%;
  gap: 2rem;

  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;

const ParaContainer = styled(Center)`
  width: 80%;

  @media (max-width: 592px) {
    width: 100%;
  }
`;

const BoxContainer_2 = styled(CenterSpaceBetween)`
  flex-direction: column;
  gap: 0.5rem;
`;

const RightSide = styled(Center)`
  width: -webkit-fill-available;
  height: auto;
`;

const LeftSide = styled(RightSide)`
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
`;

const QuantityBox = styled(Center)`
  width: 6rem;
  font-size: 1.2rem;
  font-weight: 800;
  background-color: ${Purple};
  color: ${DarkPurple};
  padding: 10px 28px;
  cursor: pointer;

  @media (max-width: 592px) {
    font-size: 1rem;
    width: 1rem;
  }

  @media (max-width: 498px) {
    width: 9.5rem;
  }
`;

const Container = styled(Center)`
  margin-top: 120px;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 592px) {
    margin-top: 80px;
  }
`;

const ChildContainer = styled(Center)`
  flex-direction: column;
  gap: 0.1rem;
`;

const Box = styled(Center)`
  flex-direction: column;
  gap: 0.7rem;
`;

const ErrorContainer = styled(Center)`
  padding: 3rem;
  opacity: ${(props) => (props.$isErrorSeen ? 1 : 0)};
  visibility: ${(props) => (props.$isErrorSeen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
`;

const SuccessContainer = styled(ErrorContainer)`
  opacity: ${(props) => (props.$isSucSeen ? 1 : 0)};
  visibility: ${(props) => (props.$isSucSeen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
`;

const ErrorMsg = styled.div`
  background-color: ${Purple};
  border-radius: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  color: ${DarkPurple};
  font-size: 1.2rem;
  position: relative;
`;

const SuccessMsg = styled(ErrorMsg)`
  font-weight: bold;
`;

const Modal = styled(Center)`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.$isErrorSeen ? "visible" : "hidden")};
`;

const Modal2 = styled(Modal)`
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.$isSucSeen ? "visible" : "hidden")};
`;

const Content = styled(MaxWidth)`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  gap: 2rem;

  @media (max-width: 1094px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Box_2 = styled(Center)`
  transition: all 0.38s ease;
  background-color: ${Purple};
  padding: 22px;
  border-radius: 28px;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    transform: translateY(-10px);
    cursor: pointer;
  }
`;

//!Buttons Styles
const StyledConnectButton = styled.button`
  padding: 10px 28px;
  color: ${DarkPurple};
  cursor: pointer;
  border-radius: 14px;
  font-family: inherit;
  background-color: ${Purple};
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StyledButton = styled(StyledConnectButton)`
  @media (max-width: 592px) {
    font-size: 1rem;
  }
`;

const BurgerButton = styled(StyledButton)`
  margin: 0;
  padding: 0;
  z-index: 999;

  ${({ isOpen }) =>
    isOpen && `background-color: ${DarkPurple};  color: ${Purple};`}
`;

const HeaderBtn = styled(Center)`
  gap: 2rem;

  @media (max-width: 360px) {
    gap: 1rem;
  }
`;

const ScrollToTopButtonWrapper = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${Purple};
  border: none;
  border-radius: 14px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  z-index: 97;

  ${({ isVisible }) => isVisible && "display: flex;"}
`;

//!NavBar Styles
const StyledNav = styled.nav`
  width: 100%;
  padding: 1.5rem 5rem;
  z-index: 98;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  position: fixed;

  @media (max-width: 496px) {
    padding: 1.5rem 2rem;
  }
`;

const NavLinkText = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;

const HamburgerMenu = styled(PageWrapper)`
  background-color: ${Purple};
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${(props) => (props.isOpen ? "300px" : "0px")};
  z-index: 998;
  transition: all 0.3s ease-in-out;
  padding: 0;
  align-items: center;
  justify-content: center;
`;

const Menu = styled(CenterSpaceAround)`
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;
  flex-direction: column;
  gap: 2rem;

  ${NavLinkText} {
    color: ${DarkPurple};
  }
`;

//!Image Styles & Containers
const ImageStyle = {
  borderRadius: "14px",
  width: "200px",
  height: "auto",
  cursor: "pointer",
  margin: "4px",
};

const ImageStyle2 = {
  ...ImageStyle,
  margin: "0",
  width: "100%",
  borderRadius: "28px",
};

//!Icons Styles
const Icon = styled(Center)``;

const CloseIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  font-weight: bold;
`;

//!Footer Styles
const StyledFooter = styled.footer`
  width: 100%;
  padding: 1.5rem 5rem;
  background: ${Purple};
  position: relative;
  margin-top: 120px;

  @media (max-width: 496px) {
    padding: 1.5rem 2rem;
  }
`;

const FooterPara = styled.p`
  color: ${DarkPurple};
  font-size: 1.2rem;
  line-height: 1;
  text-align: center;

  @media (max-width: 525px) {
    font-size: 1rem;
  }
`;

const ListItem = styled.li`
  font-size: 20px;
  color: ${DarkPurple};
  margin: 24px;

  @media (max-width: 425px) {
    font-size: 18px;
  }
`;

export {
  ListItem,
  MaxWidth,
  MainH1Title,
  ParaBig,
  ParaMid,
  StyledButton,
  Center,
  CenterSpaceAround,
  CenterSpaceBetween,
  StyledConnectButton,
  StyledNav,
  Container,
  BoxContainer,
  ParaSm,
  Icon,
  ImageStyle,
  Box,
  FooterPara,
  StyledFooter,
  HeaderBtn,
  LeftSide,
  RightSide,
  ChildContainer,
  QuantityBox,
  Modal,
  BoxContainer_2,
  ErrorContainer,
  ErrorMsg,
  CloseIcon,
  SuccessContainer,
  SuccessMsg,
  PageWrapper,
  NavLinkText,
  ParaContainer,
  Modal2,
  HamburgerMenu,
  Content,
  H1Title,
  H2Title,
  H3Title,
  Box_2,
  ImageStyle2,
  ScrollToTopButtonWrapper,
  Menu,
  BurgerButton,
};
