"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import type { Production } from "@/lib/types";
import { VideoPlayer } from "./VideoPlayer";
import {
  BODY_TEXT,
  BORDER,
  FONT_BODY,
  FONT_HEADING,
  GREY_BG,
  INK,
  MUTED_TEXT,
  NAVY,
  Section,
  SectionLabel,
} from "./shared";

/** One format card's productions: the selected one plays, the rest form the playlist. */
export function MediaFormatPage({ format, productions }: { format: string; productions: Production[] }) {
  const [index, setIndex] = useState(0);
  const current = productions[index];

  if (!current) return null;

  const goPrev = index > 0 ? () => setIndex(index - 1) : undefined;
  const goNext = index < productions.length - 1 ? () => setIndex(index + 1) : undefined;

  return (
    <div style={{ fontFamily: FONT_BODY }}>
      <Section background={NAVY} padding="36px 40px 0">
        <Link
          href="/media"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            marginBottom: "22px",
          }}
        >
          <ArrowLeft size={14} /> Tezra Media
        </Link>
        <SectionLabel text={format} tone="light" />
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0 0 6px",
            lineHeight: 1.15,
          }}
        >
          {current.title}
        </h1>
        {current.summary && (
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "720px", margin: "0 0 26px" }}>
            {current.summary}
          </p>
        )}
      </Section>

      <Section background={NAVY} padding="0 40px 56px">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {current.youtubeId ? (
            <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#000000", overflow: "hidden" }}>
              <iframe
                // nocookie keeps YouTube from setting tracking cookies until someone presses play.
                src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?rel=0&modestbranding=1`}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
          ) : (
            <VideoPlayer
              sources={current.sources}
              poster={current.poster}
              title={current.title}
              onPrev={goPrev}
              onNext={goNext}
            />
          )}
        </div>
      </Section>

      {productions.length > 1 && (
        <Section background={GREY_BG}>
          <SectionLabel text="More in this format" />
          <div className="playlist-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "26px" }}>
            {productions.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  style={{
                    textAlign: "left",
                    padding: 0,
                    border: `1px solid ${active ? NAVY : BORDER}`,
                    background: "#FFFFFF",
                    cursor: "pointer",
                    fontFamily: FONT_BODY,
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#0D0D0D", overflow: "hidden" }}>
                    {item.poster ? (
                      <Image
                        src={item.poster}
                        alt={item.posterAlt ?? item.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        style={{ objectFit: "cover", opacity: active ? 1 : 0.85 }}
                      />
                    ) : item.youtubeId ? (
                      <Image
                        src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        unoptimized
                        style={{ objectFit: "cover", opacity: active ? 1 : 0.85 }}
                      />
                    ) : null}
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(1,0,50,0.18)" }}>
                      <span style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(10,10,14,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Play size={16} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: "2px" }} />
                      </span>
                    </div>
                    {item.duration && (
                      <span style={{ position: "absolute", right: "8px", bottom: "8px", padding: "2px 6px", fontSize: "11px", color: "#FFFFFF", background: "rgba(0,0,0,0.72)", borderRadius: "3px" }}>
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ fontFamily: FONT_HEADING, fontSize: "15px", fontWeight: 700, color: active ? NAVY : INK, marginBottom: "4px" }}>
                      {item.title}
                    </div>
                    {item.summary && (
                      <div style={{ fontSize: "13px", lineHeight: 1.6, color: BODY_TEXT }}>{item.summary}</div>
                    )}
                    {active && (
                      <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: MUTED_TEXT, marginTop: "8px" }}>NOW PLAYING</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Section>
      )}

      <style>{`
        @media (max-width: 1000px) { .playlist-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 620px) { .playlist-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
