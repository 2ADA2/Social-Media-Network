import "./CoverButton.css";
import { Button } from "@/shared/ui/Button";
import type { ButtonProps } from "@/shared/ui/Button/Button.tsx";

export const CoverButton = ({ children, onClick }: ButtonProps) => {
  return (
    <Button className="cover-button" onClick={ onClick }>
      { children }
    </Button>
  );
};
