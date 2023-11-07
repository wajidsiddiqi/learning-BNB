import { ImageStyle, MaxWidth } from "@/app/styles/styles.js";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function ScrollingImages() {
  return (
    <MaxWidth style={{ marginTop: "80px" }}>
      <Marquee speed={60}>
        <Image
          src="/assets/Images/1.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/8.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/11.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/7.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/5.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/10.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/9.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
        <Image
          src="/assets/Images/4.jpeg"
          alt="Image"
          style={ImageStyle}
          width={0}
          height={0}
          unoptimized
        />
      </Marquee>
    </MaxWidth>
  );
}
