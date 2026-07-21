import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex h-52 flex-col items-center justify-center rounded-lg border border-dashed">
      <Inbox className="mb-3 h-10 w-10 text-muted-foreground" />

      <h3 className="font-medium">{title}</h3>

      {description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}