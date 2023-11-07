import Image from "next/image";
import { gloock } from "../fonts";
import {
  PageWrapper,
  H1Title,
  BoxContainer,
  RightSide,
  ImageStyle2,
  LeftSide,
  H2Title,
  ParaMid,
} from "@/app/styles/styles.js";

export default function About() {
  return (
    <PageWrapper id="about" style={{ marginTop: "120px" }}>
      <H1Title className={gloock.className}>About</H1Title>
      <BoxContainer>
        <RightSide>
          <Image
            src="/assets/Images/1.jpeg"
            alt="About Image"
            style={ImageStyle2}
            width={0}
            height={0}
            layout="responsive"
          />
        </RightSide>

        <LeftSide>
          <H2Title className={gloock.className}>Who are we?</H2Title>
          <ParaMid style={{ textAlign: "left" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget
            aliquet sem, sit amet feugiat dui. Sed viverra, ante in ornare
            blandit, magna nisl tincidunt nulla, in viverra justo ligula sit
            amet risus. Fusce a massa dictum, finibus diam in, malesuada sem. In
            hac habitasse platea dictumst. Morbi commodo magna non dapibus
            pellentesque. Donec rutrum velit et nisi euismod, maximus
            pellentesque risus cursus. Morbi ullamcorper sapien rhoncus,
            imperdiet massa ac, ullamcorper nunc. Nulla nec dui at augue aliquam
            blandit.
            <br />
            <br />
            Proin vestibulum posuere risus at pretium. Suspendisse potenti.
            Aenean iaculis molestie diam, sit amet bibendum nunc consequat
            dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aliquam egestas nibh vitae suscipit ultricies. Aliquam eget blandit
            mi. Suspendisse eu massa et nunc consectetur fringilla. Nullam
            aliquam magna lorem. Morbi nec luctus diam. In hac habitasse platea
            dictumst.
            <br />
            <br />
            Quisque non vestibulum justo, eu blandit nunc. Donec auctor varius
            tortor in dignissim. Suspendisse volutpat justo massa, id elementum
            felis vehicula nec. Nunc in velit a augue porta molestie. Fusce non
            pellentesque massa. Curabitur elementum erat eget mattis venenatis.
            Fusce mollis laoreet dui, eget pharetra orci. Vestibulum porta nisi
            eget felis euismod finibus.
          </ParaMid>
        </LeftSide>
      </BoxContainer>
    </PageWrapper>
  );
}
