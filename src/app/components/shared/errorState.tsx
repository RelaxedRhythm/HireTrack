interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 py-10 text-destructive">
      {message}
    </div>
  );
}