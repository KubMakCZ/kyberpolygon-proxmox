Cíl: Vytvoření postupů a skriptů pro snadnou údržbu a aktualizace celého monorepa "kyberpolygon-proxmox".

Úkoly pro tebe:
1. Vytvoř v kořenovém adresáři soubor `MAINTENANCE.md`.
2. Do tohoto souboru napiš detailní, krok za krokem návod:
   - Jak bezpečně upgradovat Node.js verze pro frontendy (Vite) i backend (Appwrite funkce).
   - Jak pravidelně a efektivně aktualizovat balíčky (pomocí `npm-check-updates` nebo `npm outdated`), aby se předešlo nakumulování zranitelností z Dependabotu.
   - Jak nasadit aktualizované Appwrite funkce pomocí Appwrite CLI.
3. Vytvoř bash skript `update-all.sh`, který automaticky projde všechny tři projekty (polygon_tutor, polygon_Vue_example, appwrite_functions/*), promaže `node_modules` a `package-lock.json`, provede čistou instalaci a pokusí se bezpečně aktualizovat balíčky (např. npm audit fix). Ujisti se, že je skript bezpečný a zastaví se při první chybě.
