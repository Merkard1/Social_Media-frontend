import { CSSProperties, useMemo } from "react";

import UserIcon from "@/6_shared/assets/icons/user-filled.svg";
import { classNames, Mods } from "@/6_shared/lib/classNames/classNames";

import { AppImage } from "../../redesigned/AppImage/AppImage";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";

import cls from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

/**
 * Outdated, use new components from folder redesigned
 * @deprecated
 */

const Avatar = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted,
}: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};

export default Avatar;