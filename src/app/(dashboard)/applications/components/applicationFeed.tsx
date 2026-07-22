"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Briefcase,
  Mail,
  Star,
  FileText,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type { Application } from "@/types/applications";
import { ApplicationStatus } from "@prisma/client";

import EditApplicationDialog from "./editApplicationForm";
import DeleteApplicationDialog from "./deleteApplicationDialog";

interface Props {
  applications: Application[];
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

const STAGES = [
  { key: "APPLIED", label: "Applied", color: "border-slate-200 bg-slate-50/50 text-slate-800 dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-200" },
  { key: "SCREENING", label: "Screening", color: "border-amber-200 bg-amber-50/30 text-amber-800 dark:border-amber-900/20 dark:bg-amber-950/20 dark:text-amber-200" },
  { key: "INTERVIEW", label: "Interview", color: "border-purple-200 bg-purple-50/30 text-purple-800 dark:border-purple-900/20 dark:bg-purple-950/20 dark:text-purple-200" },
  { key: "OFFER", label: "Offer", color: "border-blue-200 bg-blue-50/30 text-blue-800 dark:border-blue-900/20 dark:bg-blue-950/20 dark:text-blue-200" },
  { key: "HIRED", label: "Hired", color: "border-emerald-200 bg-emerald-50/30 text-emerald-800 dark:border-emerald-900/20 dark:bg-emerald-950/20 dark:text-emerald-200" },
  { key: "REJECTED", label: "Rejected", color: "border-rose-200 bg-rose-50/30 text-rose-800 dark:border-rose-900/20 dark:bg-rose-950/20 dark:text-rose-200" },
];

export default function ApplicationFeed({
  applications,
  setRefresh,
}: Props) {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState<Application | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Group applications by status
  const groupedApplications = STAGES.reduce((acc, stage) => {
    acc[stage.key] = applications.filter((app) => app.status === stage.key);
    return acc;
  }, {} as Record<string, Application[]>);

  // Move candidate between stages
  async function moveStage(id: string, currentStatus: string, direction: "prev" | "next") {
    const statuses = Object.values(ApplicationStatus);
    const currentIndex = statuses.indexOf(currentStatus as ApplicationStatus);
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < statuses.length) {
      const nextStatus = statuses[nextIndex];
      try {
        setLoadingId(id);
        const res = await fetch(`/api/applications/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        });
        if (res.ok) {
          setRefresh((prev) => prev + 1);
        }
      } catch (e) {
        console.error("Error moving application stage:", e);
      } finally {
        setLoadingId(null);
      }
    }
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x min-h-[500px]">
        {STAGES.map((stage) => {
          const appsInStage = groupedApplications[stage.key] || [];

          return (
            <div
              key={stage.key}
              className={`flex-1 min-w-[280px] max-w-[340px] rounded-xl border p-4 flex flex-col snap-start ${stage.color}`}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-border/30 mb-4 shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {stage.label}
                </span>

                <span className="text-xs font-bold rounded-full bg-secondary/80 px-2 py-0.5 border border-border/40 text-muted-foreground">
                  {appsInStage.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {appsInStage.length > 0 ? (
                  appsInStage.map((app) => {
                    const statuses = Object.values(ApplicationStatus);
                    const statusIdx = statuses.indexOf(app.status);
                    const canMovePrev = statusIdx > 0;
                    const canMoveNext = statusIdx < statuses.length - 1;
                    const isMoving = loadingId === app.id;

                    return (
                      <Card
                        key={app.id}
                        className={`group/card border-border/40 hover:border-border/80 transition-all duration-200 hover:shadow-xs relative ${isMoving ? "opacity-60 pointer-events-none" : ""
                          }`}
                      >
                        <CardContent className="p-4.5 space-y-3">

                          {/* Name & Quick Action Dots */}
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm tracking-tight text-foreground">
                              {app.candidate.name}
                            </h4>

                            <div className="opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setSelectedApplication(app);
                                  setEditOpen(true);
                                }}
                                className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                              >
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteApplication(app);
                                  setDeleteOpen(true);
                                }}
                                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Email info */}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                            <span className="truncate">{app.candidate.email}</span>
                          </div>

                          {/* Job Applied */}
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/95 bg-muted/60 px-2 py-1.5 rounded-md border border-border/20">
                            <Briefcase className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                            <Link
                              href={`/jobs/${app.job.id}`}
                              className="truncate hover:underline"
                            >
                              {app.job.title}
                            </Link>
                          </div>

                          {/* Rating and Notes */}
                          {(app.rating !== null || app.notes) && (
                            <div className="border-t border-border/20 pt-2.5 space-y-2">
                              {app.rating !== null && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <span className="font-medium">Rating:</span>
                                  <div className="flex items-center gap-0.5 text-amber-500">
                                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                    <span className="font-semibold text-foreground">{app.rating}</span>
                                  </div>
                                </div>
                              )}

                              {app.notes && (
                                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                  <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 mt-0.5" />
                                  <p className="line-clamp-2 italic leading-relaxed text-muted-foreground/80">{app.notes}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Stage Transition Buttons */}
                          <div className="border-t border-border/20 pt-2.5 flex items-center justify-between gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="xs"
                              disabled={!canMovePrev || isMoving}
                              onClick={() => moveStage(app.id, app.status, "prev")}
                              className="h-6 w-11 px-0 flex items-center justify-center border-border/40"
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                            </Button>

                            <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground/50">
                              Move Stage
                            </span>

                            <Button
                              variant="outline"
                              size="xs"
                              disabled={!canMoveNext || isMoving}
                              onClick={() => moveStage(app.id, app.status, "next")}
                              className="h-6 w-11 px-0 flex items-center justify-center border-border/40"
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>

                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-border/30 rounded-xl bg-background/20 mt-2">
                    <span className="text-xs text-muted-foreground/50 italic">No candidates</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedApplication && (
        <EditApplicationDialog
          application={selectedApplication}
          open={editOpen}
          setOpen={setEditOpen}
          setRefresh={setRefresh}
        />
      )}

      {deleteApplication && (
        <DeleteApplicationDialog
          applicationId={deleteApplication.id}
          open={deleteOpen}
          setOpen={setDeleteOpen}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}