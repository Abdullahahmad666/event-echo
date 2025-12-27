import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { LazyImage } from "@/components/ui/LazyImage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import heroimage from"../components/assets/hero.jpeg";

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Celebration",
  "Anniversary",
  "Social Gathering",
  "Other",
];

const Inquire = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    await response.json(); // now SAFE

    toast({
      title: 'Thank you for your inquiry!',
      description: "We'll be in touch within 24–48 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      budget: '',
      message: '',
    });
  } catch (err) {
    toast({
      title: 'Something went wrong',
      description: 'Please try again later.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[40vh] md:h-[50vh] min-h-[300px] md:min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <LazyImage
            src={heroimage}
            alt="Contact us"
            containerClassName="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-foreground/20" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <p className="animate-fade-in text-primary-foreground/80 font-sans text-xs tracking-[0.3em] uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground animate-fade-in-delay-1">
            Let's Create Together
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-1">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                We'd Love to Hear From You
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Ready to start planning your dream event? Fill out the form and we'll get back to you within 24-48 hours to schedule a complimentary consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-soft-sienna mt-1" />
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Email
                    </p>
                    <a href="mailto:saminatanveer@hotmail.com" className="text-foreground hover:text-soft-sienna transition-colors">
                      saminatanveer@hotmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-soft-sienna mt-1" />
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Phone
                    </p>
                    <a href="tel:+1234567890" className="text-foreground hover:text-soft-sienna transition-colors">
                      +19052999442
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-soft-sienna mt-1" />
                  <div>
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1">
                      Location
                    </p>
                    <p className="text-foreground">Milton Ontario, Canada</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={200} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-sans text-xs tracking-[0.15em] uppercase">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-border bg-transparent focus:border-foreground transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-sans text-xs tracking-[0.15em] uppercase">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-border bg-transparent focus:border-foreground transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-sans text-xs tracking-[0.15em] uppercase">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-border bg-transparent focus:border-foreground transition-colors"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType" className="font-sans text-xs tracking-[0.15em] uppercase">
                      Event Type *
                    </Label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 border border-border bg-transparent text-foreground focus:border-foreground focus:outline-none transition-colors"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate" className="font-sans text-xs tracking-[0.15em] uppercase">
                      Estimated Event Date
                    </Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="border-border bg-transparent focus:border-foreground transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guestCount" className="font-sans text-xs tracking-[0.15em] uppercase">
                      Estimated Guest Count
                    </Label>
                    <Input
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="border-border bg-transparent focus:border-foreground transition-colors"
                      placeholder="e.g., 100-150"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="font-sans text-xs tracking-[0.15em] uppercase">
                    Estimated Budget (Optional)
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="border-border bg-transparent focus:border-foreground transition-colors"
                    placeholder="e.g., $100 - $10,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-sans text-xs tracking-[0.15em] uppercase">
                    Tell Us About Your Vision *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="border-border bg-transparent focus:border-foreground transition-colors resize-none"
                    placeholder="Share your ideas, inspiration, and anything else we should know..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-foreground text-background font-sans text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inquire;
