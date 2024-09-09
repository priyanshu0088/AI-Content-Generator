"use client";
import React, { useState } from "react";
import Formsection from "../_components/Formsection";
import OutputSection from "../_components/OutputSection";
import Templates from "@/app/(data)/Templates";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment"; // Importing moment.js

interface PROPS {
  params: {
    "template-slug": string;
  };
}

// Renamed the local function to avoid conflict
function formatMoment() {
  return moment().format('DD/MM/yyyy');
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == props.params["template-slug"]
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const { user } = useUser();

  const GenerateAIcontent = async (formData: any) => {
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;

    const finalAIPrompt = JSON.stringify(formData) + "," + SelectedPrompt;

    const result = await chatSession.sendMessage(finalAIPrompt);

    console.log(result.response.text());
    setAiOutput(result?.response.text());
    await SaveInDb(formData, selectedTemplate?.slug, result?.response.text());
    setLoading(false);
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        email: user?.primaryEmailAddress?.emailAddress, // Update to use the 'email' column
        createdAt: formatMoment(), // Optional: if you want to keep the createdAt column
      });
      console.log("Insert Result:", result);
    } catch (error) {
      console.error("Error inserting into aiOutput:", error);
    }
  };
  

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button><ArrowLeft /> Back</Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Formsection */}
        <Formsection
          selectedTemplate={selectedTemplate}
          userForminput={(v: any) => GenerateAIcontent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
