import React from 'react';
import '@shohamgilad/tailwind-test.styles.tailwind-styles/dist/styles.css';
import tw, { styled } from "twin.macro";

const Button = styled.button(() => [tw`bg-red rounded-md p-2`]);

export type TailwindButtonProps = {
  /**
   * a text to be rendered in the component.
   */
  text: string,
  className: string
};

export function TailwindButton({ text, className }: TailwindButtonProps) {
  return (
    <Button className={className}>
      {text}
    </Button>
  );
}
