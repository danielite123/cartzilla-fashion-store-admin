import Image, { StaticImageData } from "next/image";
import { DropDownIcon } from "../icons";

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
    <div className={`flex flex-row gap-3 items-center ${className}`}>
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
      <DropDownIcon className="w-4 h-4 text-green-400 fill-current" />
    </div>
  );
};

export default Avatar;
