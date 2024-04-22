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
        link:"/",
        icon:<TbSettingsCog />
    },
    {
        title:"Components",
        link:"/components",
        icon:<TbSettingsCog />

    },
    {
        title:"Users",
        link:"/users",
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

  return (
    <div className="md:block hidden">

        <div className="flex flex-col gap-2 ">{data?.map((item)=>{
    return(
        <Link href={item?.link}>
        <div className={`p-2 bg-red border-[2px] dark:border-[1px] border-gray dark:border-gray-500 rounded-lg w-[180px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:text-white flex flex-row gap-2 text-center align-middle ${usePathname().split('/').pop() === "a" && "bg-gray-500 bg-opacity-25 text-gray-100"} ease-in-out duration-300`}>
           <div className="flex flex-col justify-center"> {item.icon}</div> 
            <h4>{item?.title}</h4>
        </div>
        </Link>
    )
        })}</div>
    </div>
  )
}

