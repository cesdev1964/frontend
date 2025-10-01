export default function ImageComponent({
  imageSRC,
  width,
  height,
  alt = "imageAlt",
  borderRadius,
  border = "none",
  objectfit
}) {
  return (
    <img
      src={imageSRC}
      style={{
        width: width ,
        height:  height ,
        border: border ,
        borderRadius:  borderRadius ,
        objectFit:objectfit
      }}
      alt={alt}
    />
  );
}
