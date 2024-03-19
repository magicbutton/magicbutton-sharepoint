"use client";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageInfo } from "@/magicservices/sharepoint-governance";

export default function PageInfo(props: { url: string }) {
  const { url } = props;
  const pageActions = useMemo(() => {
    return [{ Title: "Approve", Email: "" }];
  }, []);

  const { pageinfo, pageinfoerror, isLoading } = usePageInfo(url);

  return (
    <div>
      {isLoading && <div>{isLoading}</div>}

      {pageinfoerror && <div className="text-red-600">{pageinfoerror}</div>}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Page History</AccordionTrigger>
          <AccordionContent>
            <div>
              {pageinfo?.versions.map((v, i) => {
                return (
                  <div key={i} className="mt-3 text-sm">
                    <div>{v.isTranslation ? "translation" : ""}</div>
                    <div>{v.lastModifiedBy}</div>
                    <div>{v.lastModified}</div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Site Owners</AccordionTrigger>
          <AccordionContent>
            {pageinfo?.siteowners.map((v, i) => {
              return (
                <div key={i} className="mt-3 text-sm">
                  <div>{v.Title}</div>
                  <div>{v.Email}</div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Page Actions</AccordionTrigger>
          <AccordionContent>
            {pageActions.map((v, i) => {
              return (
                <div key={i} className="mt-3 text-sm">
                  <div>{v.Title}</div>
                  <div>{v.Email}</div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
