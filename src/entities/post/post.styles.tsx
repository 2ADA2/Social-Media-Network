import styled, { css } from "styled-components";

export const StyledPost = styled.article`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 12px;
  border-bottom: 2px solid var(--border-primary);
  color: var(--color-primary);

  @media (min-width: 768px) {
    padding: 24px;
    width: 700px;
    background: var(--bg-primary);
  }
`;

export const PostHeader = styled.header`
  display: flex;
  height: 42px;
  gap: 12px;
  line-height: 24px;
`;

export const PostDate = styled.div`
  color: var(--color-muted);
`;

export const HeaderData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
`;

export const PostImage = styled.img`
  border-radius: 4px;
  max-height: 500px;
  object-fit: contain;
  background: var(--bg-primary);
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 150%;
  margin: 0;
  color: var(--color-primary);
`;

export const PostControl = styled.footer`
  display: flex;
  gap: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ControlContainer = styled.div`
  display: flex;
  gap: 8px;
  min-width: 80px;
  align-items: center;
`;

export const ControlText = styled.span`
  font-size: 12px;
  color: var(--color-primary);

  @media (max-width: 350px) {
    font-size: 10px;
  }
`;

export const StyledSVG = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  
  svg {
    width: 18px;

    height: 18px;
    ${ props =>
        props.$active &&
        css`
          fill: red;
        ` };

    path {
      stroke: ${ ({ $active }) => ($active ? 'red' : 'var(--color-primary)') };
    }
  }
`;

export const StyledArrowIcon = styled.div`
  width: 16px;
  height: 16px;

  path {
    fill: var(--color-primary);
    stroke: var(--bg-secondary);
  }
`;

export const PostComments = styled.ol`
  list-style: none;
  counter-reset: item;
  padding: 0;
  margin: 0;

  li {
    counter-increment: item;
    color: var(--color-primary);
    font-size: 14px;
    margin-bottom: 16px;
  }

  li:last-child {
    margin-bottom: 0;
  }

  li::before {
    content: "#" counter(item) ". ";
    color: var(--color-primary);
  }
`;


