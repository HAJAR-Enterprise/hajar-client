import React from "react";
import { Skeleton } from "@heroui/react";

const VideoSkeleton = () => {
  return (
    <div className="min-h-scree">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="border-2 shadow-sm bg-white rounded-lg p-4"
            >
              <Skeleton className="w-full aspect-video rounded-lg" />
              <div className="space-y-2 px-2 py-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-8 rounded-lg" />
                  </div>
                  <Skeleton className="h-3 w-24 rounded-lg" />
                </div>
                <div className="w-full flex justify-end">
                  <Skeleton className="h-3 w-18 px-8 py-4 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
