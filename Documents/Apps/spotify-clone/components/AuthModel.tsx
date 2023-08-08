"use client";

import { useRouter } from "next/navigation";
import Model from "./Model";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModel from "@/hooks/useAuthModel";
import { useEffect } from "react";

const AuthModel = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const {isOpen, onClose } = useAuthModel();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);
    
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return ( 
        <Model
            title = "Welcome Back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={() => {}}
        >
            <Auth 
                theme="dark"
                magicLink
                providers={["github"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e"
                            }
                        }
                    }
                }}
            />
        </Model>
     );
}
 
export default AuthModel;