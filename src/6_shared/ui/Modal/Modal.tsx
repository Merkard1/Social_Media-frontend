import React, { ReactNode } from "react";

import { useTheme } from "@/1_app/providers/ThemeProvider";

import { classNames, Mods } from "@/6_shared/lib/classNames/classNames";
import { useModal } from "@/6_shared/lib/hooks/useModal/useModal";

import { Overlay } from "../Overlay";
import Portal from "../Portal/Portal";

import cls from "./Modal.module.scss";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  } = props;

  const {
    close,
    isClosing,
    isMounted,
  } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, theme, "app_modal"])}>
        <Overlay onClick={close} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
