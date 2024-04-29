import Link from "next/link";
const data = [
  {
    title: "Overview",
    link: "",
  },
  {
    title: "Analytics",
    link: "",
  },
  {
    title: "Reports",
    link: "",
  },
  {
    title: "Notification",
    link: "",
  },
];
export function NavBar() {
  return (
    <div className="flex flex-row h-[70px]  items-center p-[20px] ">
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[50px] h-[50px] border-gray border-[1px] mr-5 dark:border-gray-500"></div>
      <div className="rounded-full w-[calc(100vw-195px)] h-[50px] border-gray border-[1px] dark:border-gray-500 flex flex-row justify-start items-center align-middle overflow-x-auto px-4">
        <div className="md:block hidden">
          <div className="flex flex-row justify-center gap-8 ">
            {data?.map((item) => {
              return (
                <Link href={"#"} key={item.title}>
                  <h4 className="text-gray-500 text-[14px] hover:text-black dark:hover:text-white font-semibold ease-in-out duration-300">
                    {item?.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
