# Favicon – בועת הדיבור הירוקה

הקבצים כאן נוצרים על ידי:

```bash
npm run generate-favicons
```

**כדי להשתמש ב-PNG שלך (בועה ירוקה עם רקע שקוף):**

1. שים את קובץ ה-PNG בתיקייה זו בשם: `source.png`
2. הרץ: `npm run generate-favicons`

הסקריפט ייצור מחדש את כל הקבצים עם padding של ~10%, ממורכזים וברורים.  
אם `source.png` לא קיים, הסקריפט משתמש ב-`public/brand/bubble-icon.svg` כ-fallback.
