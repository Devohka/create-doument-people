import { useCallback } from "react";

export function useExportToWord() {
  const exportElementToWord = useCallback(
    ({ element, cssText, filename = "component-export" }) => {
      if (!element) return;

      // 1. Беремо повну розмітку елемента разом із кореневим класом
      //    важливо: outerHTML, не innerHTML
      const htmlContent = element.outerHTML;

      // 2. Формуємо повноцінний HTML-документ,
      //    де в <style> лежать ТІЛЬКИ класи, які реально є в компоненті,
      //    вже з іменами після CSS Modules (типу .page_ab12cd)
      const fullHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <style>
              ${cssText}
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;

      // 3. Створюємо Blob як Word-документ
      const blob = new Blob([fullHTML], {
        type: "application/msword;charset=utf-8",
      });

      // 4. Завантажуємо
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.doc`;
      document.body.appendChild(link);
      link.click();

      // 5. Прибираємо хвости
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    []
  );

  return { exportElementToWord };
}