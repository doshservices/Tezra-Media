"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Settings,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { VideoSource } from "@/lib/types";
import { FONT_BODY } from "./shared";

const ACCENT = "#4F8CFF";

const clock = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const h = Math.floor(whole / 3600);
  const m = Math.floor((whole % 3600) / 60);
  const s = whole % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
};

export function VideoPlayer({
  sources,
  poster,
  title,
  onPrev,
  onNext,
}: {
  sources: VideoSource[];
  poster?: string;
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [quality, setQuality] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [full, setFull] = useState(false);
  const [menu, setMenu] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const current = sources[quality];

  const show = useCallback(() => {
    setChrome(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    // Only hide while something is actually playing, or the controls vanish on a paused video.
    hideTimer.current = setTimeout(() => {
      if (video.current && !video.current.paused) setChrome(false);
    }, 2600);
  }, []);

  useEffect(() => () => void (hideTimer.current && clearTimeout(hideTimer.current)), []);

  const toggle = useCallback(() => {
    const el = video.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }, []);

  const seekBy = useCallback((delta: number) => {
    const el = video.current;
    if (!el) return;
    el.currentTime = Math.min(Math.max(el.currentTime + delta, 0), el.duration || 0);
  }, []);

  // Switching quality must not restart the video, so carry the position across the source swap.
  const pickQuality = (index: number) => {
    const el = video.current;
    const at = el?.currentTime ?? 0;
    const wasPlaying = el ? !el.paused : false;
    setQuality(index);
    setMenu(false);
    requestAnimationFrame(() => {
      const next = video.current;
      if (!next) return;
      next.load();
      next.currentTime = at;
      if (wasPlaying) void next.play();
    });
  };

  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys = [" ", "k", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "m", "f"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    show();
    const el = video.current;
    if (!el) return;
    if (event.key === " " || event.key === "k") toggle();
    if (event.key === "ArrowLeft") seekBy(-5);
    if (event.key === "ArrowRight") seekBy(5);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const next = Math.min(Math.max(el.volume + (event.key === "ArrowUp" ? 0.1 : -0.1), 0), 1);
      el.volume = next;
      setVolume(next);
      setMuted(next === 0);
    }
    if (event.key === "m") {
      el.muted = !el.muted;
      setMuted(el.muted);
    }
    if (event.key === "f") void (full ? document.exitFullscreen() : shell.current?.requestFullscreen());
  };

  if (!current) return null;

  const pct = duration > 0 ? (time / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const iconButton = {
    background: "none",
    border: "none",
    padding: "6px",
    cursor: "pointer",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "opacity 0.15s",
  } as const;

  return (
    <div
      ref={shell}
      className="tz-player"
      onMouseMove={show}
      onMouseLeave={() => playing && setChrome(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{
        position: "relative",
        background: "#000000",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        outline: "none",
        fontFamily: FONT_BODY,
        cursor: chrome ? "default" : "none",
      }}
    >
      <video
        ref={video}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          show();
        }}
        onPause={() => {
          setPlaying(false);
          setChrome(true);
        }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onProgress={(e) => {
          const el = e.currentTarget;
          if (el.buffered.length > 0) setBuffered(el.buffered.end(el.buffered.length - 1));
        }}
        onVolumeChange={(e) => {
          setVolume(e.currentTarget.volume);
          setMuted(e.currentTarget.muted);
        }}
        style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
      >
        <source src={current.url} type={current.mimeType} />
      </video>

      {/* Centre play affordance, before first play and while buffering */}
      {(!playing || waiting) && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          style={{
            position: "absolute",
            inset: 0,
            margin: "auto",
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.35)",
            background: "rgba(10,10,14,0.55)",
            backdropFilter: "blur(6px)",
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {waiting ? (
            <span className="tz-spin" style={{ width: "26px", height: "26px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#FFFFFF", display: "block" }} />
          ) : (
            <Play size={28} fill="#FFFFFF" style={{ marginLeft: "4px" }} />
          )}
        </button>
      )}

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "40px 16px 14px",
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)",
          opacity: chrome ? 1 : 0,
          transform: chrome ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          pointerEvents: chrome ? "auto" : "none",
        }}
      >
        {/* Scrubber */}
        <div style={{ position: "relative", height: "16px", display: "flex", alignItems: "center", marginBottom: "2px" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.22)" }} />
          <div style={{ position: "absolute", left: 0, width: `${bufferedPct}%`, height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.34)" }} />
          <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: "4px", borderRadius: "2px", background: ACCENT }} />
          <div style={{ position: "absolute", left: `${pct}%`, width: "12px", height: "12px", marginLeft: "-6px", borderRadius: "50%", background: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.5)", pointerEvents: "none" }} />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step="any"
            value={time}
            aria-label="Seek"
            onChange={(e) => {
              const next = Number(e.target.value);
              setTime(next);
              if (video.current) video.current.currentTime = next;
            }}
            className="tz-range"
            style={{ position: "relative", width: "100%", margin: 0 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} style={iconButton}>
            {playing ? <Pause size={19} fill="#FFFFFF" /> : <Play size={19} fill="#FFFFFF" />}
          </button>

          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label="Previous"
            style={{ ...iconButton, opacity: onPrev ? 1 : 0.3, cursor: onPrev ? "pointer" : "default" }}
          >
            <SkipBack size={18} fill="#FFFFFF" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            aria-label="Next"
            style={{ ...iconButton, opacity: onNext ? 1 : 0.3, cursor: onNext ? "pointer" : "default" }}
          >
            <SkipForward size={18} fill="#FFFFFF" />
          </button>

          <div className="tz-volume" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const el = video.current;
                if (!el) return;
                el.muted = !el.muted;
                setMuted(el.muted);
              }}
              style={iconButton}
            >
              <VolumeIcon size={19} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              aria-label="Volume"
              onChange={(e) => {
                const next = Number(e.target.value);
                const el = video.current;
                if (!el) return;
                el.volume = next;
                el.muted = next === 0;
                setVolume(next);
                setMuted(next === 0);
              }}
              className="tz-range tz-range-volume"
              style={{ width: "76px" }}
            />
          </div>

          <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.85)", letterSpacing: "0.02em", marginLeft: "6px", fontVariantNumeric: "tabular-nums" }}>
            {clock(time)} <span style={{ color: "rgba(255,255,255,0.45)" }}>/ {clock(duration)}</span>
          </span>

          <span style={{ flex: 1 }} />

          {sources.length > 1 && (
            <div style={{ position: "relative" }}>
              <button type="button" onClick={() => setMenu((v) => !v)} aria-label="Quality" aria-expanded={menu} style={iconButton}>
                <Settings size={18} />
              </button>
              {menu && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "40px",
                    right: 0,
                    minWidth: "132px",
                    padding: "6px",
                    borderRadius: "10px",
                    background: "rgba(16,16,22,0.96)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div style={{ fontSize: "10.5px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", padding: "6px 10px 8px" }}>
                    QUALITY
                  </div>
                  {sources.map((source, i) => (
                    <button
                      key={source.label + i}
                      type="button"
                      onClick={() => pickQuality(i)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 10px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontFamily: FONT_BODY,
                        background: i === quality ? "rgba(79,140,255,0.18)" : "transparent",
                        color: i === quality ? "#FFFFFF" : "rgba(255,255,255,0.72)",
                      }}
                    >
                      {source.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            aria-label={full ? "Exit full screen" : "Full screen"}
            onClick={() => void (full ? document.exitFullscreen() : shell.current?.requestFullscreen())}
            style={iconButton}
          >
            {full ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      <span className="sr-only">{title}</span>

      <style>{`
        .tz-player:focus-visible { box-shadow: inset 0 0 0 2px ${ACCENT}; }
        .tz-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          height: 16px;
          cursor: pointer;
        }
        .tz-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px; border-radius: 50%;
          background: transparent; border: none;
        }
        .tz-range::-moz-range-thumb { width: 14px; height: 14px; border: none; background: transparent; }
        .tz-range-volume { height: 14px; }
        .tz-range-volume::-webkit-slider-runnable-track {
          height: 4px; border-radius: 2px; background: rgba(255,255,255,0.28);
        }
        .tz-range-volume::-moz-range-track { height: 4px; border-radius: 2px; background: rgba(255,255,255,0.28); }
        .tz-range-volume::-webkit-slider-thumb {
          -webkit-appearance: none; width: 11px; height: 11px; margin-top: -3.5px;
          border-radius: 50%; background: #FFFFFF;
        }
        .tz-range-volume::-moz-range-thumb { width: 11px; height: 11px; border-radius: 50%; background: #FFFFFF; border: none; }
        .tz-player button:hover { opacity: 0.78; }
        .tz-spin { animation: tzSpin 0.8s linear infinite; }
        @keyframes tzSpin { to { transform: rotate(360deg); } }
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        @media (max-width: 600px) {
          .tz-volume input { width: 48px !important; }
        }
      `}</style>
    </div>
  );
}
