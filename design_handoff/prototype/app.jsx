const { useEffect: useEffect_app } = React;

// key → [--accent, --accent-2]. Single source of truth for the accent tweak.
const ACCENTS = {
  brass:  ['#B8860B', '#D4A84B'],
  amber:  ['#C8963E', '#E8C36A'],
  signal: ['#0E5DC2', '#4D8DE8'],
  forest: ['#1B5E3B', '#3B8B5F'],
  ember:  ['#D9430F', '#F0703D'],
};

// Resolve a stored accent value to a key, tolerating the legacy object shape
// ({value,color}) that an earlier TweakColor wiring persisted to disk.
function resolveAccentKey(a) {
  if (typeof a === 'string') {
    if (ACCENTS[a]) return a;
    const hit = Object.keys(ACCENTS).find((k) => ACCENTS[k][0].toLowerCase() === a.toLowerCase());
    if (hit) return hit;
  } else if (a && typeof a === 'object') {
    if (a.value && ACCENTS[a.value]) return a.value;
    if (a.color) return resolveAccentKey(a.color);
  }
  return 'brass';
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentKey = resolveAccentKey(tweaks.accent);

  useEffect_app(() => {
    const [c1, c2] = ACCENTS[accentKey];
    document.documentElement.setAttribute('data-accent', accentKey);
    document.documentElement.style.setProperty('--accent', c1);
    document.documentElement.style.setProperty('--accent-2', c2);
    document.documentElement.setAttribute('data-density', tweaks.density);
    document.documentElement.setAttribute('data-focus', tweaks.focus);
  }, [accentKey, tweaks.density, tweaks.focus]);

  return (
    <>
      <Nav />
      <Hero focus={tweaks.focus} />
      <PillarStrip focus={tweaks.focus} />
      <ProductionGap />
      <Engagements />
      <Operators />
      <Case />
      <CredibilityBand />
      <FinalCTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakColor
            label="Accent color"
            value={ACCENTS[accentKey][0]}
            options={Object.values(ACCENTS).map((c) => c[0])}
            onChange={(hex) => setTweak('accent', resolveAccentKey(hex))}
          />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio
            label="Hero"
            value={tweaks.focus}
            options={[
              { value: 'tightened', label: 'Tightened' },
              { value: 'classic',   label: 'Classic' },
            ]}
            onChange={(v) => setTweak('focus', v)}
          />
          <TweakRadio
            label="Density"
            value={tweaks.density}
            options={[
              { value: 'spacious', label: 'Spacious' },
              { value: 'dense',    label: 'Dense' },
            ]}
            onChange={(v) => setTweak('density', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
