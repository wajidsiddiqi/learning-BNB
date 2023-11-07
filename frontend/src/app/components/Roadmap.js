import { gloock } from "../fonts";
import {
  PageWrapper,
  H1Title,
  Content,
  ListItem,
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
          <H2Title className={gloock.className} $Dark>
            1.
          </H2Title>
          <H3Title className={gloock.className} $Dark>
            Lorem Ipsum
          </H3Title>
          <ParaMid style={{ textAlign: "left" }}>
            <ul>
              <ListItem>
                Lorem ipsum dolor sit amet, consectetuer elit.
              </ListItem>
              <ListItem>Aliquam tincidunt mauris eu risus.</ListItem>
              <ListItem>Vivamus vestibulum ntulla nec ante.</ListItem>
              <ListItem>Cras ornare tristique elit.</ListItem>
              <ListItem>Nunc dignissim risus id metus.</ListItem>
              <ListItem>Praesent placerat risus quis eros.</ListItem>
            </ul>
          </ParaMid>
        </Box_2>

        <Box_2>
          <H2Title className={gloock.className} $Dark>
            2.
          </H2Title>
          <H3Title className={gloock.className} $Dark>
            Lorem Ipsum
          </H3Title>
          <ParaMid style={{ textAlign: "left" }}>
            <ul>
              <ListItem>
                Lorem ipsum dolor sit amet, consectetuer elit.
              </ListItem>
              <ListItem>Aliquam tincidunt mauris eu risus.</ListItem>
              <ListItem>Vivamus vestibulum ntulla nec ante.</ListItem>
              <ListItem>Cras ornare tristique elit.</ListItem>
              <ListItem>Nunc dignissim risus id metus.</ListItem>
              <ListItem>Praesent placerat risus quis eros.</ListItem>
            </ul>
          </ParaMid>
        </Box_2>

        <Box_2>
          <H2Title className={gloock.className} $Dark>
            3.
          </H2Title>
          <H3Title className={gloock.className} $Dark>
            Lorem Ipsum
          </H3Title>
          <ParaMid style={{ textAlign: "left" }}>
            <ul>
              <ListItem>
                Lorem ipsum dolor sit amet, consectetuer elit.
              </ListItem>
              <ListItem>Aliquam tincidunt mauris eu risus.</ListItem>
              <ListItem>Vivamus vestibulum ntulla nec ante.</ListItem>
              <ListItem>Cras ornare tristique elit.</ListItem>
              <ListItem>Nunc dignissim risus id metus.</ListItem>
              <ListItem>Praesent placerat risus quis eros.</ListItem>
            </ul>
          </ParaMid>
        </Box_2>
      </Content>
    </PageWrapper>
  );
}
