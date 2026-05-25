export function ThemeScript() {
  const script = `
    (() => {
      try {
        const stored = localStorage.getItem('midr-theme');
        const theme = stored === 'light' || stored === 'dark'
          ? stored
          : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const root = document.documentElement;
        root.classList.remove('theme-dark', 'theme-light');
        root.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.colorScheme = 'dark';
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
