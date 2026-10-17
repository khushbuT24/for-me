"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icon";
import { Button } from "./shared/button";
import { HomeScreen } from "./screens/home-screen";
import { WardrobeScreen } from "./screens/wardrobe-screen";
import { StylistScreen } from "./screens/stylist-screen";
import { UploadScreen } from "./screens/upload-screen";
import { TryOnScreen } from "./screens/try-on-screen";
import { MixMatchScreen } from "./screens/mix-match-screen";
import { PlanScreen } from "./screens/plan-screen";
import { PackingScreen } from "./screens/packing-screen";
import { StyleProfileScreen } from "./screens/style-profile-screen";
import { ProfileScreen } from "./screens/profile-screen";
import { WelcomeScreen } from "./screens/welcome-screen";
import { SavedLooksScreen } from "./screens/looks-screen";
import { SuggestionsScreen } from "./screens/suggestions-screen";
import { ItemScreen } from "./screens/item-screen";
import { OutfitScreen } from "./screens/outfit-screen";
import {
  saveStylePreferences,
  type StylePreferences,
} from "@/lib/style-preferences";
const nav = [
  ["home", "Home", "/"],
  ["wardrobe", "Wardrobe", "/wardrobe"],
  ["sparkle", "AI Stylist", "/stylist"],
  ["looks", "Saved Looks", "/looks"],
  ["profile", "My Profile", "/profile"],
];
export function FormeApp({ screen }: { screen: string }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const toggle = (id: string) => {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };
  const notify = (text: string) => {
    setNotice(text);
    setTimeout(() => setNotice(""), 3500);
  };
  const savePreferences = (preferences: StylePreferences) => {
    try {
      saveStylePreferences(preferences);
      notify("Your style preferences have been updated");
      return true;
    } catch {
      notify("Could not save your style preferences");
      return false;
    }
  };
  const title: Record<string, string> = {
    wardrobe: "Your wardrobe",
    stylist: "Your AI stylist",
    suggestions: "Outfit suggestions",
    looks: "Saved looks",
    profile: "Profile & settings",
    upload: "Upload clothes",
    item: "Item details",
    "try-on": "Virtual try-on",
    "mix-match": "Mix & match",
    plan: "Plan your look",
    packing: "Travel packing",
    "style-profile": "Your style profile",
    outfit: "Outfit details",
  };

  function renderScreen() {
    switch (screen) {
      case "wardrobe":
        return <WardrobeScreen />;
      case "stylist":
        return <StylistScreen />;
      case "upload":
        return <UploadScreen notify={notify} />;
      case "try-on":
        return <TryOnScreen notify={notify} />;
      case "mix-match":
        return <MixMatchScreen saved={saved} toggle={toggle} notify={notify} />;
      case "plan":
        return <PlanScreen />;
      case "packing":
        return <PackingScreen />;
      case "style-profile":
        return <StyleProfileScreen onSave={savePreferences} />;
      case "profile":
        return <ProfileScreen />;
      case "welcome":
        return <WelcomeScreen />;
      case "looks":
        return <SavedLooksScreen saved={saved} toggle={toggle} />;
      case "suggestions":
        return <SuggestionsScreen saved={saved} toggle={toggle} />;
      case "item":
        return <ItemScreen notify={notify} />;
      case "outfit":
        return <OutfitScreen notify={notify} />;
      default:
        return null;
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="wordmark" href="/">
          FORME<span>PERSONAL STYLE, REIMAGINED</span>
        </Link>
        <div className="nav-label">YOUR EVERYDAY, ELEVATED</div>
        <nav>
          {nav.map(([icon, label, url]) => (
            <Link
              key={label}
              className={
                (screen === "home" ? url === "/" : url === `/${screen}`)
                  ? "active"
                  : ""
              }
              href={url}
            >
              <Icon name={icon} />
              {label}
              {label === "AI Stylist" && <span className="new-badge">AI</span>}
            </Link>
          ))}
        </nav>
        <div className="nav-divider" />
        <div className="nav-label">A LITTLE MORE YOU</div>
        <nav>
          <Link href="/plan">
            <Icon name="calendar" />
            Plan a Look
          </Link>
          <Link href="/packing">
            <Icon name="bag" />
            Travel Packing
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="personal-note">
            <Icon name="sparkle" />
            <h3>Style that knows you.</h3>
            <p>
              A wardrobe full of possibilities.
              <br />
              Let’s find yours.
            </p>
            <Link href="/style-profile">
              Discover your style <Icon name="arrow" size={16} />
            </Link>
          </div>
          <Link href="/profile" className="user">
            <span className="avatar">K</span>
            <span>
              Khushbu<small>Your personal style space</small>
            </span>
            <span className="user-arrow">↗</span>
          </Link>
        </div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div className="breadcrumb">
            Your style. Your way.
            <span>
              {" "}
              / {screen === "home" ? "Home" : title[screen] || "Welcome"}
            </span>
          </div>
          <Link href="/" className="mobile-logo">
            FORME
          </Link>
          <div className="topbar-right">
            <span className="weather">
              <Icon name="sun" size={17} /> 28° <span>Bangalore</span>
            </span>
            <button
              aria-label="Notifications"
              onClick={() =>
                notify("You’re all caught up. Your next great look is waiting.")
              }
            >
              <Icon name="bell" size={20} />
              <i />
            </button>
            <Link href="/profile" className="avatar small">
              K
            </Link>
          </div>
        </header>
        {screen === "home" ? (
          <HomeScreen saved={saved} toggle={toggle} />
        ) : (
          <div className="page inner-page">
            <div className="page-heading">
              <div>
                <Link href="/" className="back-link">
                  <Icon name="back" size={16} /> Back to your space
                </Link>
                <h1>
                  {title[screen] ||
                    "Your personal style, intelligently curated."}
                </h1>
                <p>
                  {screen === "wardrobe"
                    ? "The pieces you love. The possibilities you haven’t met."
                    : "Thoughtfully styled. Entirely you."}
                </p>
              </div>
              {screen === "wardrobe" && (
                <Button href="/upload">
                  <Icon name="upload" size={18} /> Add clothes
                </Button>
              )}
            </div>
            {renderScreen()}
          </div>
        )}
      </main>
      <nav className="mobile-nav">
        {nav.map(([icon, label, url]) => (
          <Link
            className={
              (screen === "home" ? url === "/" : url === `/${screen}`)
                ? "active"
                : ""
            }
            key={url}
            href={url}
          >
            <Icon name={icon} size={21} />
            <span>
              {label === "Saved Looks"
                ? "Looks"
                : label === "My Profile"
                  ? "Profile"
                  : label === "AI Stylist"
                    ? "AI Stylist"
                    : label}
            </span>
          </Link>
        ))}
      </nav>
      {notice && (
        <div className="toast" role="status">
          <Icon name="check" size={19} />
          {notice}
        </div>
      )}
    </div>
  );
}
