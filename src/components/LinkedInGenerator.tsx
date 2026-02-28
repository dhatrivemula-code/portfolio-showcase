import { useState } from "react";
import type { ResumeData } from "@/types/resume";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface LinkedInGeneratorProps {
  data: ResumeData;
}

const LinkedInGenerator = ({ data }: LinkedInGeneratorProps) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await supabase.functions.invoke("generate-linkedin", {
        body: { resumeData: data },
      });

      if (response.error) throw response.error;
      setResult(response.data.text);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to generate LinkedIn section");
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="border border-border rounded-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles size={18} className="text-primary" />
          AI LinkedIn About Section
        </h2>
        <Button size="sm" onClick={generate} disabled={loading}>
          {loading ? <Loader2 size={14} className="animate-spin mr-1" /> : <Sparkles size={14} className="mr-1" />}
          Generate
        </Button>
      </div>

      {result ? (
        <div className="relative">
          <div className="bg-muted rounded-lg p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
          <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={copyText}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Click "Generate" to create an enthusiastic LinkedIn About section based on your resume data.
        </p>
      )}
    </div>
  );
};

export default LinkedInGenerator;
