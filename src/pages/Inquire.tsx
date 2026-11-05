import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { LazyImage } from "@/components/ui/LazyImage";
import { useToast } from "@/hooks/use-toast";
import { usePlanner } from "@/hooks/use-planner";
import { plannerConfig } from "@/data/plannerConfig";
import { formatMoney } from "@/lib/planner";
import { PlannerCard } from "@/components/planner/PlannerCard";
import { RangeSlider } from "@/components/planner/RangeSlider";
import { ChoiceGroup } from "@/components/planner/ChoiceGroup";
import { PriorityList } from "@/components/planner/PriorityList";
import { PackageSummary } from "@/components/planner/PackageSummary";
import { StickyPackageBar } from "@/components/planner/StickyPackageBar";
import { ContactStep, type ContactDetails } from "@/components/planner/ContactStep";
import heroimage from "../components/assets/hero.jpeg";

type Stage = "plan" | "contact" | "done";

const { budget: budgetRange, guests: guestRange } = plannerConfig;
const eventTypeOptions = plannerConfig.eventTypes.map((t) => ({ value: t, label: t }));

const Inquire = () => {
  const { toast } = useToast();
  const { state, pkg, status, setInputs, setEventType, setTier, resetToSuggestion, clear } = usePlanner();
  const [stage, setStage] = useState<Stage>("plan");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [summaryInView, setSummaryInView] = useState(false);
  const summaryRef = useRef<HTMLElement>(null);
  const plannerTopRef = useRef<HTMLDivElement>(null);

  const hasPackage = pkg.items.some((i) => i.tierIndex !== null);
  const budgetLabel = formatMoney(state.budget) + (state.budget >= budgetRange.max ? "+" : "");
  const guestLabel = `${state.guests}${state.guests >= guestRange.max ? "+" : ""} guests`;

  // Hide the sticky bar while the package card itself is on screen.
  useEffect(() => {
    const el = summaryRef.current;
    if (!el || stage !== "plan") return;
    const observer = new IntersectionObserver(([entry]) => setSummaryInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [stage]);

  const goTo = (next: Stage) => {
    setStage(next);
    requestAnimationFrame(() => plannerTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const handleSubmit = async (details: ContactDetails) => {
    setIsSubmitting(true);
    try {
      const included = pkg.items.filter((i) => i.tierIndex !== null);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          eventType: state.eventType,
          guestCount: state.guests,
          budget: state.budget,
          florals: plannerConfig.floralOptions.find((o) => o.value === state.floral)?.label ?? state.floral,
          package: {
            low: pkg.low,
            high: pkg.high,
            status,
            customized: state.customized,
            items: included.map((i) => ({
              category: i.category.label,
              tier: i.category.tiers[i.tierIndex!].name,
              description: i.category.tiers[i.tierIndex!].description,
              level: i.tierIndex! + 1,
              levels: i.category.tiers.length,
            })),
            notIncluded: pkg.items.filter((i) => i.tierIndex === null).map((i) => i.category.label),
            switchedOff: state.priorities
              .filter((p) => !p.enabled)
              .map((p) => plannerConfig.categories.find((c) => c.id === p.id)?.label ?? p.id),
            priorityOrder: state.priorities
              .filter((p) => p.enabled)
              .map((p) => plannerConfig.categories.find((c) => c.id === p.id)?.label ?? p.id),
          },
        }),
      });
      if (!response.ok) throw new Error("Failed to send");
      setSubmittedName(details.name.trim().split(/\s+/)[0] ?? "");
      clear();
      goTo("done");
    } catch {
      toast({
        title: "Something went wrong",
        description: `Your package wasn't sent. Please try again, or email us at ${plannerConfig.contact.email}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex h-[40vh] min-h-[300px] items-end overflow-hidden md:h-[46vh] md:min-h-[380px]">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage src={heroimage} alt="Decorated event stage" containerClassName="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-foreground/20" />
        </div>
        <div className="container relative z-10 mx-auto px-6 pb-14 lg:px-12">
          <p className="mb-4 animate-fade-in font-sans text-xs uppercase tracking-[0.3em] text-primary-foreground/80">
            Plan by budget
          </p>
          <h1 className="max-w-3xl animate-fade-in-delay-1 font-serif text-4xl leading-[1.1] text-primary-foreground md:text-5xl lg:text-6xl">
            Tell us your budget. <em className="font-light">We'll show you the room.</em>
          </h1>
        </div>
      </section>

      <section className="bg-background pb-32 pt-16 lg:pb-28 lg:pt-20">
        <div ref={plannerTopRef} className="container mx-auto scroll-mt-24 px-6 lg:px-12">
          {stage === "plan" && (
            <>
              <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                  Set your budget, rank what matters most, and watch a package come together with real prices.{" "}
                  <span className="text-foreground">No name, email or phone number needed to look around</span>, we
                  only ask for those if you'd like to book a call.
                </p>
                <div className="flex flex-col gap-2 text-sm lg:items-end">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Rather just talk?
                  </span>
                  <a
                    href={`mailto:${plannerConfig.contact.email}`}
                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-clay"
                  >
                    <Mail className="h-4 w-4 text-clay" /> {plannerConfig.contact.email}
                  </a>
                  <a
                    href={`tel:${plannerConfig.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-clay"
                  >
                    <Phone className="h-4 w-4 text-clay" /> {plannerConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12">
                <div className="space-y-6">
                  <PlannerCard step="01" title="Your decor budget">
                    <p className="font-serif text-5xl leading-none text-clay tabular-nums">{budgetLabel}</p>
                    <RangeSlider
                      className="mt-5"
                      value={state.budget}
                      min={budgetRange.min}
                      max={budgetRange.max}
                      step={budgetRange.step}
                      onChange={(budget) => setInputs({ budget })}
                      label="Decor budget"
                      valueText={budgetLabel}
                      minLabel={formatMoney(budgetRange.min)}
                      maxLabel={`${formatMoney(budgetRange.max)}+`}
                    />
                  </PlannerCard>

                  <PlannerCard step="02" title="Your celebration">
                    <ChoiceGroup
                      label="Event type"
                      variant="chips"
                      options={eventTypeOptions}
                      value={state.eventType}
                      onChange={setEventType}
                    />

                    <p className="mt-8 font-serif text-4xl leading-none text-foreground tabular-nums">{guestLabel}</p>
                    <RangeSlider
                      className="mt-4"
                      value={state.guests}
                      min={guestRange.min}
                      max={guestRange.max}
                      step={guestRange.step}
                      onChange={(guests) => setInputs({ guests })}
                      label="Guest count"
                      valueText={guestLabel}
                      minLabel={`${guestRange.min} guests`}
                      maxLabel={`${guestRange.max}+ guests`}
                    />

                    <p className="mb-3 mt-8 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Florals</p>
                    <ChoiceGroup
                      label="Floral style"
                      options={plannerConfig.floralOptions}
                      value={state.floral}
                      onChange={(floral) => setInputs({ floral })}
                    />
                  </PlannerCard>

                  <PlannerCard
                    step="03"
                    title="What matters most?"
                    description="Drag to rank these. We upgrade your top pick first, and anything you switch off stays out of the package."
                  >
                    <PriorityList priorities={state.priorities} onChange={(priorities) => setInputs({ priorities })} />
                  </PlannerCard>
                </div>

                <div className="lg:sticky lg:top-28 lg:self-start">
                  <PackageSummary
                    ref={summaryRef}
                    pkg={pkg}
                    status={status}
                    budget={state.budget}
                    customized={state.customized}
                    onSetTier={setTier}
                    onReset={resetToSuggestion}
                    onBook={() => goTo("contact")}
                  />
                </div>
              </div>
            </>
          )}

          {stage === "contact" && (
            <ContactStep
              pkg={pkg}
              budget={state.budget}
              isSubmitting={isSubmitting}
              onBack={() => goTo("plan")}
              onSubmit={handleSubmit}
            />
          )}

          {stage === "done" && (
            <div className="mx-auto max-w-xl py-10 text-center">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">Package received</p>
              <h2 className="mt-5 font-serif text-4xl text-foreground md:text-5xl">
                Thank you{submittedName ? `, ${submittedName}` : ""}. <em className="text-clay">Talk soon.</em>
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Your package is with us. We'll look it over and reach out within 24–48 hours to confirm availability
                and set up your call.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {plannerConfig.bookingUrl && (
                  <a
                    href={plannerConfig.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-foreground px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
                  >
                    Choose a time for your call
                  </a>
                )}
                <Link
                  to="/portfolio"
                  className="border border-foreground/30 px-10 py-4 font-sans text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
                >
                  See our work
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <StickyPackageBar
        low={pkg.low}
        high={pkg.high}
        hasPackage={hasPackage}
        visible={stage === "plan" && !summaryInView}
        onView={() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />
    </Layout>
  );
};

export default Inquire;
