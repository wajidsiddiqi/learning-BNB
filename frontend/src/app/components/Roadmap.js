import Image from "next/image";
import { gloock } from "../fonts";
import {
  PageWrapper,
  H1Title,
  Content,
  Icons,
  ImageStyle,
  Box_2,
  H2Title,
  H3Title,
  ParaMid,
} from "@/app/styles/styles.js";

export default function Roadmap() {
  return (
    <PageWrapper id="roadmap" style={{ marginTop: "120px" }}>
      <H1Title className={gloock.className}>Roadmap</H1Title>

      <Content>
        <Box_2>
          <H2Title>1.</H2Title>
          <H3Title>Lorem Ipsum</H3Title>
          <ParaMid>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </ParaMid>
        </Box_2>

        <Box_2>
          <H2Title>2.</H2Title>
          <H3Title>Lorem Ipsum</H3Title>
          <ParaMid>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </ParaMid>
        </Box_2>

        <Box_2>
          <H2Title>3.</H2Title>
          <H3Title>Lorem Ipsum</H3Title>
          <ParaMid>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </ParaMid>
        </Box_2>
      </Content>
    </PageWrapper>
  );
}
