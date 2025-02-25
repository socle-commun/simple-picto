// generate-components.js
const fs = require("fs");
const path = require("path");

// Définition des composants avec leur tag HTML, le type de l'élément et l'interface correspondante
const components = [
    { tag: "div", type: "HTMLDivElement", interface: "React.HTMLAttributes<HTMLDivElement>" },
  { tag: "aside", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "button", type: "HTMLButtonElement", interface: "React.ButtonHTMLAttributes<HTMLButtonElement>" },
  { tag: "span", type: "HTMLSpanElement", interface: "React.HTMLAttributes<HTMLSpanElement>" },
  { tag: "section", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "article", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "header", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "footer", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "nav", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "label", type: "HTMLLabelElement", interface: "React.LabelHTMLAttributes<HTMLLabelElement>" },
  { tag: "input", type: "HTMLInputElement", interface: "React.InputHTMLAttributes<HTMLInputElement>" },
  { tag: "textarea", type: "HTMLTextAreaElement", interface: "React.TextareaHTMLAttributes<HTMLTextAreaElement>" },
  { tag: "select", type: "HTMLSelectElement", interface: "React.SelectHTMLAttributes<HTMLSelectElement>" },
  { tag: "option", type: "HTMLOptionElement", interface: "React.OptionHTMLAttributes<HTMLOptionElement>" },
  { tag: "fieldset", type: "HTMLFieldSetElement", interface: "React.FieldsetHTMLAttributes<HTMLFieldSetElement>" },
  { tag: "legend", type: "HTMLLegendElement", interface: "React.HTMLAttributes<HTMLLegendElement>" },
  { tag: "output", type: "HTMLElement", interface: "React.HTMLAttributes<HTMLElement>" },
  { tag: "progress", type: "HTMLProgressElement", interface: "React.ProgressHTMLAttributes<HTMLProgressElement>" },
  { tag: "meter", type: "HTMLMeterElement", interface: "React.HTMLAttributes<HTMLMeterElement>" },
];

components.forEach((comp) => {
  // Le nom du composant avec une majuscule (ex: "Button" pour "button")
  const componentName = comp.tag.charAt(0).toUpperCase() + comp.tag.slice(1);
  const dir = path.join(__dirname, comp.tag);

  // Création du dossier s'il n'existe pas déjà
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Contenu du fichier index.ts basé sur le template fourni
  const indexContent = `import React, { forwardRef } from "react";
import { cn } from "@/utilities/cn";

export interface ${componentName}Props extends ${comp.interface} {
}

const ${componentName} = forwardRef<${comp.type}, ${componentName}Props>(
  (props: ${componentName}Props, ref: React.ForwardedRef<${comp.type}>) => {
    const _props: ${componentName}Props = {
      className: cn(props.className)
    };
    return (
      <${comp.tag} ref={ref} className={cn(_props.className)} />
    );
  }
);

export default ${componentName};
`;

  // Écriture du fichier index.ts
  fs.writeFileSync(path.join(dir, "index.tsx"), indexContent, "utf8");

  // Contenu d'un test simple pour le composant
  const testContent = `import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ${componentName} from "./index";

describe("<${componentName} />", () => {
  it("renders without crashing", () => {
    const { container } = render(<${componentName}>Test</${componentName}>);
    expect(container).toBeInTheDocument();
  });
});
`;

  // Écriture du fichier test.ts
  fs.writeFileSync(path.join(dir, "index.test.tsx"), testContent, "utf8");
});

console.log("Génération des composants terminée !");
