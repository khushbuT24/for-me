"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "../icon";
import { Photo } from "../shared/photo";
import {
  api,
  ApiError,
  getUserId,
  type WardrobeItem,
} from "@/lib/wardrobe-api";
import {
  addStylePreferencesToMessage,
  loadStylePreferences,
} from "@/lib/style-preferences";

type Message = {
  role: "user" | "assistant";
  text: string;
  items?: WardrobeItem[];
};
type AgentEvent = {
  errorMessage?: string;
  content?: { parts?: { text?: string; thought?: boolean }[] };
  actions?: {
    stateDelta?: { wardrobe_selection?: WardrobeItem[] };
    state_delta?: { wardrobe_selection?: WardrobeItem[] };
  };
};

export function StylistScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const sessionId = useRef("");

  async function send(text: string) {
    if (!text.trim() || busy) return;
    setBusy(true);
    setError("");
    setMessages((previous) => [...previous, { role: "user", text }]);
    setMessage("");
    try {
      const userId = getUserId();
      const requestText = addStylePreferencesToMessage(
        text,
        loadStylePreferences(),
      );
      async function createSession() {
        const session = await api<{ id: string }>(
          `/api/agent/apps/app/users/${encodeURIComponent(userId)}/sessions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{}",
          },
        );
        sessionId.current = session.id;
      }
      if (!sessionId.current) await createSession();
      const run = () =>
        api<AgentEvent[]>("/api/agent/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            app_name: "app",
            user_id: userId,
            session_id: sessionId.current,
            new_message: { role: "user", parts: [{ text: requestText }] },
          }),
        });
      let events: AgentEvent[];
      try {
        events = await run();
      } catch (err) {
        if (
          !(err instanceof ApiError) ||
          err.status !== 404 ||
          !/session not found/i.test(err.message)
        )
          throw err;
        // A restart or expired session can invalidate a browser's session ID.
        // Recreate only on this definite pre-execution failure, then retry once.
        sessionId.current = "";
        await createSession();
        events = await run();
      }
      const failed = events.find((event) => event.errorMessage);
      if (failed) throw new Error(failed.errorMessage);
      const reply = events
        .flatMap((event) => event.content?.parts ?? [])
        .filter((part) => part.text && !part.thought)
        .map((part) => part.text)
        .join("\n")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "");
      const selections = events.flatMap(
        (event) =>
          (event.actions?.stateDelta ?? event.actions?.state_delta)
            ?.wardrobe_selection ?? [],
      );
      const items = [
        ...new Map(selections.map((item) => [item.id, item])).values(),
      ];
      if (!reply && !items.length)
        throw new Error("No suggestion returned. Please try again.");
      setMessages((previous) => [
        ...previous,
        { role: "assistant", text: reply, items },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "The stylist is unavailable. Please try again.",
      );
      setMessage(text);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-intro">
        <Icon name="sparkle" size={35} />
        <h2>Great style starts with your pieces.</h2>
        <p>Share the place, occasion and time. We’ll find your look.</p>
        {!messages.length && (
          <button
            className="button secondary"
            disabled={busy}
            onClick={() => send("Suggest an outfit from my wardrobe.")}
            style={{ marginTop: 20 }}
          >
            Style my wardrobe
          </button>
        )}
      </div>
      <div aria-live="polite">
        {messages.map((entry, index) => (
          <div
            key={index}
            className={`chat-bubble ${entry.role === "user" ? "mine" : ""}`}
          >
            <div className="stylist-text">{entry.text}</div>
            {!!entry.items?.length && (
              <div className="chat-outfits">
                {entry.items.map((item) => (
                  <Link href={`/item?id=${item.id}`} key={item.id}>
                    <Photo src={item.image_url} alt={item.name} />
                    <p>{item.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        {busy && <p role="status">Putting your look together…</p>}
      </div>
      {error && (
        <p className="wardrobe-error" role="alert">
          {error}
        </p>
      )}
      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          send(message);
        }}
      >
        <input
          aria-label="Message your stylist"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={4000}
          placeholder="Suggest a look from my wardrobe for dinner tomorrow…"
          disabled={busy}
        />
        <button aria-label="Send message" disabled={busy || !message.trim()}>
          <Icon name="arrow" />
        </button>
      </form>
      <small className="muted">
        Your wardrobe photos appear with the pieces selected for you.
      </small>
    </div>
  );
}
