import useGame from "@/hooks/useGame";
import useTranslations from "@/hooks/useTranslations";

/**
 * Turns all game sounds off and on, on every screen (WCAG 1.4.2).
 * The choice is remembered for the next games.
 */
const SoundToggle = () => {
  const { muted, setMuted } = useGame();
  const t = useTranslations();

  return (
    <button
      type="button"
      className="sound-toggle"
      aria-pressed={muted ? "true" : "false"}
      aria-label={t("mute")}
      onClick={() => setMuted(!muted)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor" />
        {muted ? (
          <path d="M16 9l6 6M22 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}
      </svg>
    </button>
  );
};

export default SoundToggle;
