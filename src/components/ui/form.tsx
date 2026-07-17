"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"


const Form = FormProvider


const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller {...props} />
}


const FormItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))

FormItem.displayName = "FormItem"



const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<"label">
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none",
      className
    )}
    {...props}
  />
))

FormLabel.displayName = "FormLabel"



const FormControl = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(className)}
    {...props}
  />
))

FormControl.displayName = "FormControl"



const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, children, ...props }, ref) => {

  const { formState } = useFormContext()

  return (
    <p
      ref={ref}
      className={cn(
        "text-sm font-medium text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
})

FormMessage.displayName = "FormMessage"



function useFormField() {
  const fieldContext = useFormContext()

  return {
    ...fieldContext,
  }
}



export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  useFormField,
}