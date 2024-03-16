"use client";

import * as React from "react";
import { useContext, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { MagicboxContext } from "@/koksmat/magicbox-context";
import { RootPanel } from "./components/panels";
import { Button } from "@/components/ui/button";
import PageInfo from "./components/pageinfo";

export default function RootPage() {
  const magicbox = useContext(MagicboxContext);
  const searchParams = useSearchParams();
  const [mode, setmode] = useState("");
  const [canSetKeepStandardOn, setcanSetKeepStandardOn] = useState(false);
  const [pageId, setpageId] = useState("");
  const cmd = searchParams.get("cmd");
  const href = searchParams.get("href");
  const tool = searchParams.get("tool");
  // This hook is listening an event that came from the Iframe
  React.useEffect(() => {
    type MessageTypes =
      | "ensureuser"
      | "closemagicbox"
      | "resolveduser"
      | "context"
      | "capabilities";
    interface Message {
      type: MessageTypes;
      messageId: string;
      str1: string;
    }
    const handler = async (
      ev: MessageEvent<{ type: MessageTypes; data: any }>
    ) => {
      console.log("ev", ev);

      // if (typeof ev.data !== 'object') return
      // if (!ev.data.type) return
      // if (ev.data.type !== 'button-click') return

      let r;
      try {
        const m = ev.data;
        switch (m.type) {
          case "resolveduser":
            //   setresolveduser(m.data?.LoginName)
            break;

          case "context":
            const context = JSON.parse(m.data);
            //   setlegacyPageContext(context)

            setpageId(context?.listId);
            break;

          case "capabilities":
            setcanSetKeepStandardOn(true);
            break;

          default:
            break;
        }
        //setmessage(ev.data.message)
      } catch (error) {
        console.log("ERROR", error);
      }
    };

    window.addEventListener("message", handler);
    if (!window.top)  return;
    window.top.postMessage(
      {
        type: "context",
        data: "",
      },
      "*"
    );
    // Don't forget to remove addEventListener
    return () => window.removeEventListener("message", handler);
  }, []);

  const parentCloseMe = () => {
    if (!window.top)  return;
    window.top.postMessage(
      {
        type: "closemagicbox",
        data: "",
      },
      "*"
    );
  }



  if (mode === "leftbar") {
    return (
      <div className="h-screen w-[64px] overflow-hidden  bg-gray-200 ">

      </div>
    );
  }

  
  return (
    <div className="m-4 h-screen overflow-hidden bg-gray-200">
      <RootPanel title="Page Information" onOpenChange={()=>parentCloseMe()}>

 {href && 
 <PageInfo url={href} />}
 
      </RootPanel>
    </div>
  );
}
