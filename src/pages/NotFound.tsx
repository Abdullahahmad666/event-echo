import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-6">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Error 404
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            Page Not Found
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-sans text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Return Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;