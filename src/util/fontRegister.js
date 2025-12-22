import { Font } from "@react-pdf/renderer";
// import notoFont from "../../public/assets/font";

Font.register({
  family: "NotoSansThaiRegular",
  src: "/assets/fonts/NotoSansThai-Regular.ttf",
  fontWeight: "normal",
  fontStyle: "normal",
});

Font.register({
  family: "NotoSansThaiBlod",
  src: "/assets/fonts/NotoSansThai-Bold.ttf",
  fontWeight: "bold",
  fontStyle: "normal",
});