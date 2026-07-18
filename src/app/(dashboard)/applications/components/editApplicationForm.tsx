"use client";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import ApplicationForm from "./applicationForm";


import type { Application } from "@prisma/client";



interface Props {

  application: Application;

  open:boolean;

  setOpen:(value:boolean)=>void;

  refresh:()=>void;

}



export default function EditApplicationDialog({

  application,
  open,
  setOpen,
  refresh

}:Props){


  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Edit Application
          </DialogTitle>

        </DialogHeader>



        <ApplicationForm

          initialData={application}

          refresh={refresh}

          onSuccess={()=>
            setOpen(false)
          }

        />


      </DialogContent>


    </Dialog>

  );

}