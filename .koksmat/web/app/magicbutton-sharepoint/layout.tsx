

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
<div>
      <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-screen flex-row">
        <div className="grow bg-transparent blur-md"></div>
        <div className=" w-[0px] bg-transparent transition delay-150 ease-in-out">
      {children}
     
      </div></div>
     
    </div>
    </div>
  )
}
