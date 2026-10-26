import { Fragment } from "react";

/**
 * Allows line breaks between words only (avoids "SITE E- / COMMERCE" on big titles).
 * Spaces stay outside the nowrap spans so they remain break opportunities.
 */
export default function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="whitespace-nowrap">{word}</span>
        </Fragment>
      ))}
    </>
  );
}
