interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "Nothing to display.",
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed py-10 text-muted-foreground">
      {message}
    </div>
  );
}