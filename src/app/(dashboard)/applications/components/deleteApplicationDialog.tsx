"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


interface Props {
  applicationId: string;
  open: boolean;
  setOpen: (value:boolean)=>void;
  refresh:()=>void;
}


export default function DeleteApplicationDialog({
  applicationId,
  open,
  setOpen,
  refresh,
}:Props){


  async function handleDelete(){

    try{

      const res = await fetch(
        `/api/applications/${applicationId}`,
        {
          method:"DELETE",
        }
      );


      if(!res.ok){
        throw new Error(
          "Failed deleting application"
        );
      }


      refresh();
      setOpen(false);


    }
    catch(error){

      console.error(error);

    }

  }



  return (

    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Application?
          </AlertDialogTitle>


          <AlertDialogDescription>
            This action cannot be undone.
            The application record will be permanently removed.
          </AlertDialogDescription>


        </AlertDialogHeader>



        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>


          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>


        </AlertDialogFooter>


      </AlertDialogContent>


    </AlertDialog>

  );

}