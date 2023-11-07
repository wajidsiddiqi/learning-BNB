import Image from "next/image";
import { gloock } from "../fonts";
import {
  PageWrapper,
  H1Title,
  H3Title,
  ParaSm,
  Content,
  Icon,
  ImageStyle2,
  Box_2,
} from "@/app/styles/styles.js";

export default function Team() {
  return (
    <PageWrapper id="team">
      <H1Title className={gloock.className}>Our Team</H1Title>

      <Content>
        <Box_2>
          <Image
            src="/assets/Images/6.jpeg"
            alt="Team Member"
            style={ImageStyle2}
            width={0}
            height={0}
            layout="responsive"
          />
          <H3Title $Dark className={gloock.className}>
            Peter Joe
          </H3Title>
          <ParaSm>Founder</ParaSm>
          <Icon>
            <a href="#">
              <i>
                <Image
                  src="/assets/icons/twitter.svg"
                  width="35"
                  height="35"
                  alt="Twitter"
                />
              </i>
            </a>
          </Icon>
        </Box_2>

        <Box_2>
          <Image
            src="/assets/Images/3.jpeg"
            alt="Team Member"
            style={ImageStyle2}
            width={0}
            height={0}
            layout="responsive"
          />
          <H3Title $Dark className={gloock.className}>
            Wajid
          </H3Title>
          <ParaSm>Developer</ParaSm>
          <div>
            <a href="https://twitter.com/abdulwajidsid" target="_blank">
              <Icon>
                <Image
                  src="/assets/icons/twitter.svg"
                  width="35"
                  height="35"
                  alt="Twitter"
                />
              </Icon>
            </a>
          </div>
        </Box_2>

        <Box_2>
          <Image
            src="/assets/Images/2.jpeg"
            alt="Team Member"
            style={ImageStyle2}
            width={0}
            height={0}
            layout="responsive"
          />
          <H3Title $Dark className={gloock.className}>
            Tom Luka
          </H3Title>
          <ParaSm>Artist</ParaSm>
          <Icon>
            <a href="#">
              <i>
                <Image
                  src="/assets/icons/twitter.svg"
                  width="35"
                  height="35"
                  alt="Twitter"
                />
              </i>
            </a>
          </Icon>
        </Box_2>
      </Content>
    </PageWrapper>
  );
}
