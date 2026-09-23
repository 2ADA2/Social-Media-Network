import "./avatar.css";

export interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  size: number;
  alt?: string;
  className?: string;
}

export const Index = ({ src, size, alt, className, ...props }: AvatarProps) => {
  return (
    <img src={ src }
         className={ "avatar " + className }
         alt={ alt || "avatar" }
         width={ size }
         height={ size } { ...props }/>
  );
};
