import { FC } from "react";

type TrackingCardProps = {
  lastInteraction: Date | null;
  inactive: boolean;
};

export const TrackingCard: FC<TrackingCardProps> = ({
  lastInteraction,
  inactive,
}) => {
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-2">
          <span className="text-3xl font-extrabold text-black select-none">⏱️</span>
        </div>
        <span className="text-3xl font-extrabold tracking-tight text-black">Tracker</span>
      </div>
      <div className="bg-white border border-black/10 shadow-lg p-10 rounded-2xl w-[28rem] flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold mb-2 text-black tracking-tight">Welcome!</h1>
        <p className="text-black text-center text-lg">
          User activity is being tracked.
          <br />
          Move your mouse, type, scroll, or interact to stay active.
        </p>
        <p className="text-gray-500 text-sm text-center">
          You will be marked as inactive after 10 seconds of no interaction.
        </p>
        <div className="mt-2 w-full flex flex-col items-center">
          <span className="font-semibold text-black">Last interaction:</span>{" "}
          <span className="text-black text-lg font-mono">
            {lastInteraction ? lastInteraction.toLocaleString() : "No activity yet"}
          </span>
        </div>
        {inactive && (
          <div className="text-black font-bold mt-4 border border-black p-3 rounded-lg bg-white w-full text-center shadow">
            You are inactive! Sending last interaction time to server...
          </div>
        )}
      </div>
    </>
  );
};
