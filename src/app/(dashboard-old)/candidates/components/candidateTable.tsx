"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/candidates";
import { EmptyState } from "@/app/components/shared/emptyState";
import { TableSkeleton } from "@/app/components/shared/tableSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  FileText,
  Briefcase,
  Calendar,
  Star,
  ArrowUpRight,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { CandidateDetails } from "@/types/candidates";

interface CandidatesTableProps {
  candidates: Candidate[];
  loading?: boolean;
}

// Generate stable mock skill badges based on candidate's initials
const getMockSkills = (name: string) => {
  const skillsMap: Record<string, string[]> = {
    A: ["React", "TypeScript", "Next.js"],
    B: ["Node.js", "Express", "PostgreSQL"],
    C: ["Product Design", "Figma", "UI/UX"],
    D: ["Python", "Django", "Machine Learning"],
    E: ["Project Management", "Agile", "Scrum"],
    F: ["QA Testing", "Selenium", "Jest"],
    G: ["Go", "Kubernetes", "Docker"],
    H: ["HR Analytics", "Talent Sourcing", "ATS"],
    I: ["iOS Development", "Swift", "SwiftUI"],
    J: ["Java", "Spring Boot", "AWS"],
    K: ["Kotlin", "Android SDK", "Firebase"],
    L: ["Linux Systems", "Bash", "DevOps"],
    M: ["Marketing Strategy", "SEO", "Copywriting"],
    N: ["NestJS", "GraphQL", "MongoDB"],
    O: ["Operations", "Process Optimization", "Excel"],
    P: ["Product Management", "Roadmapping", "Jira"],
    R: ["Ruby on Rails", "Redis", "Sidekiq"],
    S: ["Sales", "Negotiation", "CRM Tools"],
    T: ["Tailwind CSS", "Vue.js", "Nuxt.js"],
    V: ["Video Editing", "After Effects", "Premiere"],
    W: ["Web3", "Solidity", "Smart Contracts"],
  };
  const letter = name.trim().charAt(0).toUpperCase();
  return skillsMap[letter] || ["React", "CSS", "Problem Solving"];
};

export default function CandidatesTable({
  candidates,
  loading = false,
}: CandidatesTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    candidates[0]?.id || null,
  );
  
  const [detailLoading, setDetailLoading] = useState(false);

  const effectiveSelectedId =
  selectedId ?? candidates[0]?.id ?? null;

const [selectedDetail, setSelectedDetail] =
  useState<CandidateDetails | null>(null);

  useEffect(() => {
    if (!effectiveSelectedId) {
    return;
  }
    async function fetchDetail() {
      try {
        setDetailLoading(true);
        const res = await fetch(`/api/candidates/${effectiveSelectedId}`);;
        if (res.ok) {
          const data = await res.json();
          setSelectedDetail(data);
        }
      } catch (e) {
        console.error("Error fetching candidate details:", e);
      } finally {
        setDetailLoading(false);
      }
    }

    fetchDetail();
  }, [effectiveSelectedId]);

  if (loading) {
    return <TableSkeleton />;
  }

  if (candidates.length === 0) {
    return (
      <EmptyState
        title="No Candidates Found"
        description="Add candidate profiles to build your directory."
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-210px)] min-h-120">
      {/* Left Pane: Candidate List */}
      <div className="w-full lg:w-[42%] flex flex-col border border-border/40 rounded-xl bg-card overflow-hidden">
        <div className="border-b border-border/30 bg-muted/20 px-4 py-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Candidates Directory ({candidates.length})
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-border/20">
          {candidates.map((candidate) => {
            const isSelected = candidate.id === selectedId;
            const initials = candidate.name
              ? candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "C";
            const skills = getMockSkills(candidate.name);

            return (
              <button
                key={candidate.id}
                onClick={() => setSelectedId(candidate.id)}
                className={`w-full text-left p-4 transition-all flex items-start gap-3.5 hover:bg-muted/30 group outline-none ${
                  isSelected
                    ? "bg-muted/70 border-l-2 border-primary"
                    : "border-l-2 border-transparent"
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground border border-border/40 shrink-0 mt-0.5">
                  {initials}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold tracking-tight text-foreground truncate group-hover:text-primary transition-colors">
                      {candidate.name}
                    </h4>

                    <span className="text-[10px] bg-secondary/50 border border-border/30 px-1.5 py-0.5 rounded-full text-muted-foreground font-semibold tracking-wide shrink-0">
                      {candidate._count?.applications ?? 0}{" "}
                      {candidate._count?.applications === 1 ? "app" : "apps"}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground truncate">
                    {candidate.email}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-semibold text-muted-foreground bg-muted border border-border/40 px-1 py-0.5 rounded-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground shrink-0 self-center" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Selected Profile Preview */}
      <div className="flex-1 border border-border/40 rounded-xl bg-card flex flex-col overflow-hidden">
        {detailLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/60" />
            <span className="text-xs mt-2 font-medium">
              Fetching candidate details...
            </span>
          </div>
        ) : selectedDetail ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header Details */}
            <div className="border-b border-border/30 bg-muted/10 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-base font-bold text-secondary-foreground border border-border/40">
                  {selectedDetail.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {selectedDetail.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground/60" />
                      {selectedDetail.email}
                    </span>
                    {selectedDetail.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground/60" />
                        {selectedDetail.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link href={`/candidates/${selectedDetail.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="inline-flex items-center gap-1.5"
                >
                  <span>Full Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            {/* Content Details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Documents Links */}
              {(selectedDetail.resumeUrl || selectedDetail.linkedinUrl) && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Documents & Links
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedDetail.resumeUrl && (
                      <Link
                        href={selectedDetail.resumeUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                      >
                        <FileText className="h-4 w-4 text-red-500" />
                        <span>View Resume PDF</span>
                      </Link>
                    )}
                    {selectedDetail.linkedinUrl && (
                      <Link
                        href={selectedDetail.linkedinUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                      >
                        {/* <Linkedin className="h-4 w-4 text-blue-600" /> */}
                        <span>LinkedIn Profile</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Active Applications */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Job Applications
                </h4>
                {selectedDetail.applications &&
                selectedDetail.applications.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDetail.applications.map((app) => (
                      <div
                        key={app.id}
                        className="rounded-lg border border-border/40 p-4 bg-background/50 hover:bg-background transition-colors space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="rounded-md border border-border/40 bg-secondary/30 p-1 text-muted-foreground">
                              <Briefcase className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm font-semibold tracking-tight text-foreground">
                              {app.job.title}
                            </span>
                          </div>

                          <Badge className="text-[9px] h-4.5 px-1.5 uppercase font-semibold tracking-wider">
                            {app.status}
                          </Badge>
                        </div>

                        {app.rating !== null && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="font-medium">Rating:</span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                              <span className="font-semibold text-foreground">
                                {app.rating}/10
                              </span>
                            </div>
                          </div>
                        )}

                        {app.notes && (
                          <div className="text-xs bg-muted/40 border border-border/30 rounded p-2.5 mt-1">
                            <span className="font-semibold text-muted-foreground block mb-0.5">
                              Recruiter Notes:
                            </span>
                            <p className="text-muted-foreground italic leading-relaxed">
                              {app.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Applied on{" "}
                            {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground italic border border-dashed border-border/40 rounded-lg p-4 text-center">
                    No active job applications found.
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-xs italic">
            Select a candidate from the directory list to preview.
          </div>
        )}
      </div>
    </div>
  );
}
