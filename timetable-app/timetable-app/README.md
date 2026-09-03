# המערכת שלי — מערכת שעות למורה

אפליקציית PWA בקובץ אחד. נפתחת במסך מלא באייפון, עובדת בלי אינטרנט, בלי התחברות.

## העלאה ל-GitHub Pages

1. ריפו חדש בשם `timetable`, ציבורי (Public).
2. להעלות את כל הקבצים כאן — כולל תיקיית `icons` — לשורש הריפו.
3. Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, Folder: `/ (root)` → Save.
4. אחרי 1–2 דקות הכתובת תהיה:
   `https://<שם-המשתמש>.github.io/timetable/`

## עדכון גרסה

אחרי כל שינוי ב-`index.html` צריך גם לשנות את השורה ב-`sw.js`:

```js
var CACHE = "timetable-v1";   →   "timetable-v2"
```

בלי זה הטלפון ימשיך להציג את הגרסה הישנה מהמטמון.

## קבצים

- `index.html` — כל האפליקציה (HTML+CSS+JS), כולל מערכת השעות המוזנת
- `manifest.json` — שם, אייקונים, פתיחה במסך מלא
- `sw.js` — עבודה אופליין
- `icons/` — אייקוני האפליקציה
