export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-l-4 border-primary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-semibold">JM</span>
        </div>
      </div>
    </div>
  );
} 