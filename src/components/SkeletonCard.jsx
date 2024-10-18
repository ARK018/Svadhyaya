import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[700px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[700px]" />
        <Skeleton className="h-4 w-[550px]" />
      </div>
    </div>
  );
}
