#!/usr/bin/env node
/**
 * clean-dist.mjs — пост-процессор билда для Бегета
 *
 * Удаляет из dist/index.html все скрипты cdn.poehali.dev (телеметрия, инспектор)
 * и связанные комментарии. На работу сайта не влияет — эти скрипты нужны
 * только для превью на платформе.
 *
 * Запуск:  node clean-dist.mjs
 *  или:    bun clean-dist.mjs
 */
import fs from "node:fs";
import path from "node:path";

const indexPath = path.resolve("dist", "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("❌ Файл dist/index.html не найден. Сначала собери проект (build).");
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");
const before = html.length;

// 1. Удаляем все <script src="https://cdn.poehali.dev/...">
html = html.replace(
  /<script[^>]+src="https:\/\/cdn\.poehali\.dev\/[^"]+"[^>]*><\/script>\s*/g,
  ""
);

// 2. Удаляем служебные комментарии "IMPORTANT: DO NOT REMOVE..."
html = html.replace(
  /<!--\s*IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS COMMENT!\s*-->\s*/g,
  ""
);

// 3. Удаляем мета-тег pp-name (служебный для платформы)
html = html.replace(/<meta\s+name="pp-name"[^>]*>\s*/g, "");

// 4. Сворачиваем подряд идущие пустые строки
html = html.replace(/\n\s*\n\s*\n+/g, "\n\n");

const after = html.length;
fs.writeFileSync(indexPath, html, "utf8");

const removed = before - after;
console.log(`✅ dist/index.html почищен. Удалено ${removed} символов служебного кода.`);
console.log("   Теперь можно загружать содержимое dist/ на Бегет.");
