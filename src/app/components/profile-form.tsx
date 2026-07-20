"use client";

import { updateProfile } from "@/actions/profile";

export default function ProfileForm({
    name,
}:{
    name:string;
}){

    return(

        <form
            action={async (formData) => {
                await updateProfile(formData);
            }}
        >

            <input
                name="name"
                defaultValue={name}
            />

            <button>
                Save
            </button>

        </form>

    )

}