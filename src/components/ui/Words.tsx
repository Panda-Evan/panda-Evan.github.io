import { Fragment } from "react";

/**
 * Autorise le retour à la ligne uniquement entre les mots
 * (évite "SITE E- / COMMERCE" sur les grands titres).
 * L'espace reste hors des spans nowrap pour rester un point de coupure.
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
