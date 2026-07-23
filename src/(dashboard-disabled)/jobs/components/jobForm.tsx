"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  JobSchema,
  JobInput,
} from "@/lib/validations/jobs";

import {
  JobStatus,
  JobType,
} from "@/lib/constants/jobs";

interface JobFormProps {
  defaultValues?: Partial<JobInput>;
  onSubmit: (data: JobInput) => void | Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function JobForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save",
}: JobFormProps) {
  const form = useForm<JobInput>({
    resolver: zodResolver(JobSchema),

    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: JobType.FULL_TIME,
      status: JobStatus.OPEN,
      salary: "",
      description: "",

      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        title: defaultValues.title ?? "",
        company: defaultValues.company ?? "",
        location: defaultValues.location ?? "",
        type: defaultValues.type ?? JobType.FULL_TIME,
        status: defaultValues.status ?? JobStatus.OPEN,
        salary: defaultValues.salary ?? "",
        description: defaultValues.description ?? "",
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Title */}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Job Title
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Frontend Developer"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company */}

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Google"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Bangalore"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
                {/* Job Type */}

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value={JobType.FULL_TIME}>
                    Full Time
                  </SelectItem>

                  <SelectItem value={JobType.PART_TIME}>
                    Part Time
                  </SelectItem>

                  <SelectItem value={JobType.INTERNSHIP}>
                    Internship
                  </SelectItem>

                  <SelectItem value={JobType.CONTRACT}>
                    Contract
                  </SelectItem>

                  <SelectItem value={JobType.REMOTE}>
                    Remote
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value={JobStatus.OPEN}>
                    Open
                  </SelectItem>

                  <SelectItem value={JobStatus.CLOSED}>
                    Closed
                  </SelectItem>

                  <SelectItem value={JobStatus.DRAFT}>
                    Draft
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Salary */}

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>

              <FormControl>
                <Input
                  placeholder="₹10 LPA"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Enter job description..."
                  className="min-h-35"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
                <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>

      </form>
    </Form>
  );
}