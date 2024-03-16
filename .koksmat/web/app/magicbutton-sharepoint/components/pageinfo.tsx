import { useProcess } from "@/koksmat/useprocess"
import { useEffect, useMemo, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
export interface IPageinfo {
    versions: Version[]
    page: string
    siteowners: Siteowner[]
  }
  
  export interface Version {
    folder?: string
    lastModifiedBy: string
    isTranslation?: boolean
    page: string
    lastModified: string
  }
  
  export interface Siteowner {
    Title: string
    UserPrincipalName: string
    Email: string
  }
  
export default function PageInfo(props : {
    url: string;
}) {
    const pageActions = useMemo(() => {return [
        {Title:"Approve",Email:""}]},[])
    const { isLoading, error, data } = useProcess(
        "sharepoint-governance",
        ["page","info", props.url,"-o","json"],
        20,
        "echo",
        undefined,
        false,
        undefined,
        undefined,
        false
      )

    const [pageinfo, setpageinfo] = useState<IPageinfo>({
        versions: [],
        page: "",
        siteowners: []
    })
    useEffect(() => {
      if (data) setpageinfo(JSON.parse(data))
    
     
    }, [data])
    
 return (<div>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Page History</AccordionTrigger>
        <AccordionContent>
        <div>
        {pageinfo.versions.map((v,i) => {
            return <div key={i} className="mt-3 text-sm">
                <div>{v.isTranslation?"translation":""}</div>
                <div>{v.lastModifiedBy}</div>
                <div>{v.lastModified}</div>
            </div>
        })}
    </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Site Owners</AccordionTrigger>
        <AccordionContent>
        {pageinfo.siteowners.map((v,i) => {
            return <div key={i} className="mt-3 text-sm">
                <div>{v.Title}</div>
                <div>{v.Email}</div>
            </div>
        })}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Page Actions</AccordionTrigger>
        <AccordionContent>
        {pageActions.map((v,i) => {
            return <div key={i} className="mt-3 text-sm">
                <div>{v.Title}</div>
                <div>{v.Email}</div>
            </div>
        })}
        </AccordionContent>
      </AccordionItem>

    </Accordion>


        
    </div>)
}