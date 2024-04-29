
import { Header } from "@repo/ui/header";
import { SideBar } from "@repo/ui/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="border-[1px] m-[20px] rounded-lg h-[calc(100vh-120px)] dark:border-gray-700">
          <div className="flex flex-row gap-3 p-[10px] w-full">
            <SideBar />
            <div className="md:w-[calc(100vw-265px)] w-[calc(100vw-50px)] h-[calc(100vh-140px)]  overflow-y-auto border-[1px] rounded-lg dark:border-gray-700 p-[10px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
