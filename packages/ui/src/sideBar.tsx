"use client"
import Link from "next/link"
import { TbSettingsCog } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";
import { TiTabsOutline } from "react-icons/ti";
import { usePathname } from 'next/navigation'

interface SideBarProps {
     title: string; link: string; icon: JSX.Element ;
  }
const data:SideBarProps[]=[
    {
        title:"Models",
        link:"dashboard",
        icon:<TbSettingsCog />
    },
    {
        title:"Components",
        link:"components",
        icon:<TbSettingsCog />

    },
    {
        title:"Users",
        link:"users",
        icon:<HiOutlineUsers />

    },
    {
        title:"Tabs",
        link:"#",
        icon:<TiTabsOutline />
    },
]
export function SideBar() {
    // const path = usePathname();
console.log(usePathname(),"path")
  return (
    <div className="md:block hidden">

        <div className="flex flex-col gap-2 ">{data?.map((item)=>{
    return(
        <Link href={`/${item?.link}`}>
<div className={`p-2 rounded-lg w-[180px] hover:bg-gray-100 hover:text-black dark:hover:bg-gray-100 dark:hover:bg-opacity-25 dark:hover:text-white dark:text-white  flex flex-row gap-2 text-center text-sm align-middle font-medium ${usePathname().split('/').pop() === item?.link && "bg-[black] dark:bg-gray-200  text-white dark:text-black dark:bg-opacity-25"} ease-in-out duration-300`}>
           {/* <div className="flex flex-col justify-center"> {item.icon}</div>  */}
            <h4>{item?.title}</h4>
        </div>
        </Link>
    )
        })}</div>
    </div>
  )
}

// className="md:block hidden"