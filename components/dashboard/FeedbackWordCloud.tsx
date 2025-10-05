"use client";

import { useMemo } from "react";
import { SentimentAnalysis } from "@/types/dashboard";

type WordData = SentimentAnalysis["wordFrequency"][number];

interface FeedbackWordCloudProps {
  words: WordData[];
}

export function FeedbackWordCloud({ words }: FeedbackWordCloudProps) {
  const processedWords = useMemo(() => {
    if (!words || words.length === 0) return [];

    const maxCount = Math.max(...words.map((w) => w.count));
    const minCount = Math.min(...words.map((w) => w.count));

    // Color palette inspired by your examples
    const colorPalettes = {
      positive: [
        "text-emerald-600",
        "text-teal-600",
        "text-green-600",
        "text-emerald-500",
      ],
      negative: [
        "text-rose-500",
        "text-red-500",
        "text-orange-500",
        "text-pink-500",
      ],
      neutral: [
        "text-gray-500",
        "text-gray-600",
        "text-slate-600",
        "text-zinc-600",
      ],
    };

    // Additional vibrant colors for variety
    const vibrantColors = [
      "text-purple-600",
      "text-violet-600",
      "text-indigo-600",
      "text-blue-600",
      "text-yellow-600",
      "text-amber-600",
      "text-orange-600",
      "text-coral-500",
    ];

    return words.map((word, index) => {
      const normalizedSize =
        (word.count - minCount) / (maxCount - minCount || 1);

      // More dramatic size variation (0.75rem to 4rem)
      const fontSize = 0.75 + normalizedSize * 3.25;

      // Font weight variation
      const fontWeight = 500 + Math.floor(normalizedSize * 400);

      // Determine orientation - mix of horizontal and vertical
      // Larger words tend to be horizontal, smaller ones can be vertical
      const isVertical =
        index % 4 === 1 || (index % 5 === 3 && normalizedSize < 0.6);

      // Color selection with variety
      let colorClass: string;
      if (index % 7 === 0 || index % 11 === 0) {
        // Add some vibrant colors for variety
        colorClass = vibrantColors[index % vibrantColors.length];
      } else {
        const palette = colorPalettes[word.sentiment];
        colorClass = palette[index % palette.length];
      }

      return {
        ...word,
        fontSize,
        fontWeight,
        isVertical,
        colorClass,
      };
    });
  }, [words]);

  if (!words || words.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No word frequency data available
      </div>
    );
  }

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-3 p-8 md:p-12 min-h-[400px] bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30">
      {processedWords.map((word, index) => (
        <div
          key={`${word.word}-${index}`}
          className={`group relative inline-flex items-center justify-center transition-all duration-300 cursor-default hover:scale-110 hover:z-10 ${word.colorClass}`}
          style={{
            fontSize: `${word.fontSize}rem`,
            fontWeight: word.fontWeight,
            lineHeight: 1,
            writingMode: word.isVertical ? "vertical-rl" : "horizontal-tb",
            textOrientation: word.isVertical ? "mixed" : "unset",
            margin: word.fontSize > 2 ? "0.5rem" : "0.25rem",
          }}
        >
          <span
            className="select-none uppercase tracking-wide font-display"
            style={{
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
              letterSpacing: word.fontSize > 2 ? "0.02em" : "0.01em",
            }}
          >
            {word.word}
          </span>

          {/* Enhanced Tooltip */}
          <div
            className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 scale-95 group-hover:scale-100"
            style={{
              [word.isVertical ? "right" : "bottom"]: "100%",
              [word.isVertical ? "top" : "left"]: "50%",
              transform: word.isVertical
                ? "translateY(-50%)"
                : "translateX(-50%)",
              [word.isVertical ? "marginRight" : "marginBottom"]: "0.75rem",
            }}
          >
            <div className="px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl whitespace-nowrap">
              <div className="font-semibold">{word.word}</div>
              <div className="text-gray-300 mt-0.5">
                {word.count} mention{word.count !== 1 ? "s" : ""} •{" "}
                {word.sentiment}
              </div>
              {/* Arrow */}
              <div
                className="absolute"
                style={{
                  [word.isVertical ? "left" : "top"]: "100%",
                  [word.isVertical ? "top" : "left"]: "50%",
                  transform: word.isVertical
                    ? "translateY(-50%)"
                    : "translateX(-50%)",
                  marginTop: word.isVertical ? "0" : "-1px",
                  marginLeft: word.isVertical ? "-1px" : "0",
                }}
              >
                <div
                  className={`border-[5px] border-transparent ${
                    word.isVertical
                      ? "border-r-gray-900/95"
                      : "border-t-gray-900/95"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
