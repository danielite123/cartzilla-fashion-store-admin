import Image, { StaticImageData } from "next/image";

type AvatarProps = {
  src: string | StaticImageData;
  alt?: string;
  size?: number;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "avatar",
  size = 40,
  className,
}) => {
  return (
    <div className={className}>
      <div
        className="rounded-full overflow-hidden relative"
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-fit"
        />
      </div>
    </div>
  );
};

export default Avatar;
