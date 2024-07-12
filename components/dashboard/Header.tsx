'use client'

import { useState } from "react";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { signOut , getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import { MdAccountCircle, MdAccountBalanceWallet, MdLockOutline, MdMailOutline} from "react-icons/md";
import Sidebar from "./Sidebar";
import firebase_app from '@/firebase/config';
// import Image from "next/image"

export default function Header(props: any) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const auths = getAuth(firebase_app);
    const router = useRouter();
	const email = auths.currentUser?.email;
    const handleLogout = () => {
        signOut(auths)
        .then(() => {
            router.push('/login');
        })
        .catch((error) => {
            console.error(error);
        });
    };

	const routeSecurity = () => {
		router.push('/security');
	};

	const routeBilling = () => {
		router.push('/billing');
	};
	

    // Sidebar toggle for tablets and phones
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
    
    return ( 
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
			<div
				className="z-20 text-2xl pb-1 pl-2 text-black rounded lg:hidden cursor-pointer"
				onClick={toggleSidebar}
			>
				☰
			</div>

			<div className="flex-1 ">
				<h1 className="font-semibold text-lg text-center lg:text-left">{props.Name}</h1>
			</div>
			<DropdownMenu>
            <DropdownMenuTrigger asChild>
				
				<button className="rounded-full outline-none focus:outline-none">
					{/* <Image
						alt="Avatar"
						className="rounded-full"
						height="38"
						src="/user-example.jpg"
						style={{
						aspectRatio: "32/32",
						objectFit: "cover",
						}}
						width="38"
					/> */}
					<MdAccountCircle className="w-10 h-10"/>
					<span className="sr-only">Toggle user menu</span>
				</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
				<DropdownMenuLabel>{email ? email : "My Account"}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" onClick={routeSecurity} >
					<MdLockOutline className="mr-1"/>Security
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer" onClick={routeBilling}>
					<MdAccountBalanceWallet className="mr-1"/>Billing
				</DropdownMenuItem>
				{/* Example for adding support option */}
				{/*<DropdownMenuItem className="cursor-pointer" onClick={openEmailClient}>
						<MdMailOutline className="mr-1"/>Support
				</DropdownMenuItem> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
					Logout
				</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
		{/* Sidebar (conditionally rendered for mobile/tablet) */}
		{isSidebarOpen && (
			<div className="fixed inset-0 z-20 flex">
				<div className="flex bg-gray-100 w-[70vw] p-4">
					<div className="w-full">
						<Sidebar />
					</div>
				</div>
				<div className="flex-1 bg-black opacity-50" onClick={toggleSidebar}/>
			</div>
		)}
        </header>
  );
   
}