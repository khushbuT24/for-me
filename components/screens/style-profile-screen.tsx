"use client";

import { useState } from "react";
import {
  emptyStylePreferences,
  useSavedStylePreferences,
  type StylePreferences,
} from "@/lib/style-preferences";

type StyleProfileScreenProps = {
  onSave: (preferences: StylePreferences) => boolean;
};

const styleTags = ["Minimal", "Classic", "Elegant", "Neutral tones", "Modern", "Streetwear", "Bohemian", "Sporty"];
const colors = ["#e4d0b7", "#a3a3a0", "#d5d4ce", "#78654e", "#c5a681", "#202020", "#ffffff", "#23395b", "#56704b", "#a64253"];
const brands = ["COS", "ZARA", "THE ROW", "MANGO"];

export function StyleProfileScreen({ onSave }: StyleProfileScreenProps) {
  const savedPreferences = useSavedStylePreferences();
  const [customBrand, setCustomBrand] = useState("");
  const [customStyle, setCustomStyle] = useState("");
  const [customColor, setCustomColor] = useState("#b68fad");
  const [draft, setDraft] = useState<StylePreferences>(emptyStylePreferences);
  const [hasDraft, setHasDraft] = useState(false);
  const preferences = hasDraft ? draft : savedPreferences;

  function toggle(key: keyof StylePreferences, value: string) {
    const selected = preferences[key];
    setDraft({
      ...preferences,
      [key]: selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    });
    setHasDraft(true);
  }

  function addPreference(key: keyof StylePreferences, value: string) {
    const trimmed = value.trim();
    if (!trimmed || preferences[key].some((item) => item.toLowerCase() === trimmed.toLowerCase())) return;
    setDraft({ ...preferences, [key]: [...preferences[key], trimmed] });
    setHasDraft(true);
  }

  return (
    <div className="style-panel">
      <div className="eyebrow">UNIQUELY, UNMISTAKABLY YOU</div>
      <h2>Your style DNA</h2>
      <p>Choose the styles, colors, and brands you love. Save your profile to personalize your stylist recommendations.</p>
      <div className="filter-row">
        {Array.from(new Set([...styleTags, ...preferences.styleTags])).map((tag) => (
          <button
            className={preferences.styleTags.includes(tag) ? "active" : ""}
            aria-pressed={preferences.styleTags.includes(tag)}
            onClick={() => toggle("styleTags", tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <form className="preference-entry" onSubmit={(event) => { event.preventDefault(); addPreference("styleTags", customStyle); setCustomStyle(""); }}>
        <label htmlFor="custom-style">Add your own style</label>
        <div><input id="custom-style" value={customStyle} onChange={(event) => setCustomStyle(event.target.value)} placeholder="e.g. Vintage" maxLength={60} /><button className="button" disabled={!customStyle.trim()}>Add style</button></div>
      </form>
      <h3>Your color palette</h3>
      <p>Select your favorites or add a custom color. Tap a selected color to remove it.</p>
      <div className="palette">
        {Array.from(new Set([...colors, ...preferences.colors])).map((color) => (
          <button
            key={color}
            style={{
              background: color,
              boxShadow: preferences.colors.includes(color)
                ? "0 0 0 2px var(--background), 0 0 0 4px var(--beige)"
                : undefined,
            }}
            aria-label={`Prefer ${color}`}
            aria-pressed={preferences.colors.includes(color)}
            onClick={() => toggle("colors", color)}
          />
        ))}
      </div>
      <form className="preference-entry" onSubmit={(event) => { event.preventDefault(); addPreference("colors", customColor); }}>
        <label htmlFor="custom-color">Add a color</label>
        <div><input id="custom-color" type="color" value={customColor} onChange={(event) => setCustomColor(event.target.value)} /><span>{customColor}</span><button className="button" disabled={preferences.colors.includes(customColor)}>Add color</button></div>
      </form>
      <h3>Preferred brands</h3>
      <p>Pick brands below or add your own. Tap a selected brand to remove it.</p>
      <div className="brands">
        {Array.from(new Set([...brands, ...preferences.brands])).map((brand) => (
          <button
            key={brand}
            aria-pressed={preferences.brands.includes(brand)}
            onClick={() => toggle("brands", brand)}
            style={{
              color: preferences.brands.includes(brand)
                ? "var(--beige)"
                : undefined,
              textDecoration: preferences.brands.includes(brand)
                ? "underline"
                : undefined,
              textUnderlineOffset: 5,
            }}
          >
            {brand}
          </button>
        ))}
      </div>
      <form className="preference-entry" onSubmit={(event) => { event.preventDefault(); addPreference("brands", customBrand); setCustomBrand(""); }}>
        <label htmlFor="custom-brand">Add a preferred brand</label>
        <div><input id="custom-brand" value={customBrand} onChange={(event) => setCustomBrand(event.target.value)} placeholder="e.g. Uniqlo" maxLength={80} /><button className="button" disabled={!customBrand.trim()}>Add brand</button></div>
      </form>
      <button
        className="button"
        onClick={() => {
          if (onSave(preferences)) setHasDraft(false);
        }}
      >
        Save preferences
      </button>
    </div>
  );
}
