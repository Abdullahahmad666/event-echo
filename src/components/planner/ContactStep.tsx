import { useState, type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMoney, type PricedPackage } from "@/lib/planner";

export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  venue: string;
  eventDate: string;
}

interface ContactStepProps {
  pkg: PricedPackage;
  budget: number;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (details: ContactDetails) => void;
}

const fields: {
  name: keyof ContactDetails;
  label: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
}[] = [
  { name: "name", label: "Your name", placeholder: "First and last name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", placeholder: "name@example.com", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", placeholder: "(905) 555-0123", type: "tel", autoComplete: "tel" },
  { name: "venue", label: "Venue", placeholder: "Venue name, or TBD", type: "text" },
  { name: "eventDate", label: "Event date", type: "date" },
];

export function ContactStep({ pkg, budget, isSubmitting, onBack, onSubmit }: ContactStepProps) {
  const [details, setDetails] = useState<ContactDetails>({ name: "", email: "", phone: "", venue: "", eventDate: "" });
  const included = pkg.items.filter((i) => i.tierIndex !== null);
  const lines = [
    ...included.map((i) => `${i.category.label}: ${i.category.tiers[i.tierIndex!].name}`),
    ...pkg.extras.map((e) => e.name),
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="mx-auto max-w-xl">
      <p className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span aria-hidden className="h-px w-8 bg-clay/60" />
        Last step
      </p>
      <h2 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
        Where should we <em className="text-clay">reach you?</em>
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Just the basics. We'll review your package and get back to you within 24–48 hours to set up a call.
      </p>

      <div className="mt-8 border border-border bg-card/70 p-5">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Your package</p>
        <p className="mt-1 font-serif text-2xl text-clay">
          {lines.length > 0 ? `${formatMoney(pkg.low)} – ${formatMoney(pkg.high)}` : "To be designed together"}
        </p>
        {lines.length > 0 && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{lines.join(" · ")}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">Budget: {formatMoney(budget)}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-7">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={`contact-${field.name}`}
              className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              {field.label}
              {field.required && <span className="text-clay"> *</span>}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              required={field.required}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={details[field.name]}
              onChange={(e) => setDetails((d) => ({ ...d, [field.name]: e.target.value }))}
              className={cn(
                "mt-2 w-full border-0 border-b border-border bg-transparent px-0 pb-2 pt-1 font-serif text-xl text-foreground",
                "placeholder:text-muted-foreground/50 transition-colors focus:border-clay focus:outline-none focus:ring-0",
              )}
            />
          </div>
        ))}

        <div className="flex flex-col-reverse items-start gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to my package
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-foreground px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSubmitting ? "Sending…" : "Send my package"}
          </button>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          We only use these details to reply to your inquiry. No newsletters, no sharing.
        </p>
      </form>
    </div>
  );
}
