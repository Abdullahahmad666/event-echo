import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";

export function BudgetPlannerSection() {
  return (
    <section className="bg-deep-espresso py-20 text-cream md:py-28">
      <div className="container mx-auto px-6 text-center lg:px-12">
        <AnimatedSection>
          <p className="flex items-center justify-center gap-4 font-sans text-xs uppercase tracking-[0.3em] text-cream/60">
            <span aria-hidden className="h-px w-10 bg-cream/30" />
            Budget planner
            <span aria-hidden className="h-px w-10 bg-cream/30" />
          </p>
        </AnimatedSection>
        <AnimatedSection delay={150}>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Know your budget?
            <br />
            <em className="font-light text-soft-sienna">See what it can look like.</em>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cream/70">
            Pick a budget, rank what matters most, and get a real price range in under a minute. No contact details
            needed.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={450}>
          <Link
            to="/inquire"
            className="group mt-10 inline-flex items-center gap-3 bg-cream px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] text-foreground transition-opacity hover:opacity-90"
          >
            Open the budget planner
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
