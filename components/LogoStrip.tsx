import Image from "next/image";
import { logos } from "@/content/site";
import { tilt } from "@/lib/ui";
import { Tape } from "./doodle/Tape";

const stampColours = ["text-orange-deep", "text-blue-deep", "text-ink", "text-green-deep"];

export function LogoStrip() {
  return (
    <section aria-labelledby="logos-title" className="defer-render py-12 [--defer-h:550px] md:py-16 md:[--defer-h:400px]">
      <h2 id="logos-title" className="sr-only">
        {logos.builtForLabel} and {logos.toolsLabel.toLowerCase()}
      </h2>
      <div className="page">
        <div className="card-hard grid gap-10 bg-paper-deep p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <div>
            <h3 className="font-hand text-2xl font-bold text-blue-deep">{logos.builtForLabel}</h3>
            <ul className="mt-4 flex flex-wrap gap-6">
              {logos.builtFor.map((client) => (
                <li key={client.name}>
                  <figure className="polaroid w-32 pb-9" style={tilt(-3)}>
                    <Tape tone="blue" angle={-6} className="-top-3 left-1/2 h-6 w-16 -translate-x-1/2" />
                    <Image src={client.src} width={client.width} height={client.height} alt={`${client.name} logo`} sizes="108px" />
                    <figcaption className="absolute inset-x-1 bottom-1.5 text-center font-hand text-sm leading-tight">
                      {client.name}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-hand text-2xl font-bold text-blue-deep">{logos.toolsLabel}</h3>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
              {logos.tools.map((tool, i) => (
                <li
                  key={tool}
                  className={`stamp bg-white px-3 py-1 text-[0.85rem] ${stampColours[i % stampColours.length]}`}
                  style={tilt(i % 2 ? 2 : -2.5)}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
