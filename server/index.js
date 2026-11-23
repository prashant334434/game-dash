import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";

const PORT = 8787;
const TICK_MS = 10000;

const db = new DatabaseSync(new URL("./ranks.db", import.meta.url).pathname);
db.exec(
  "CREATE TABLE IF NOT EXISTS scores (user_id INTEGER PRIMARY KEY, score INTEGER NOT NULL DEFAULT 0)",
);
const addUser = db.prepare("INSERT OR IGNORE INTO scores (user_id) VALUES (?)");
const readOrder = db.prepare("SELECT user_id FROM scores ORDER BY score DESC, user_id");

const clients = new Set();
const snapshot = () =>
  `data: ${JSON.stringify({
    order: readOrder.all().map((r) => r.user_id),
    updatedAt: Date.now(),
  })}\n\n`;
const broadcast = () => {
  const msg = snapshot();
  for (const res of clients) res.write(msg);
};

// Simulated game activity: every tick each player earns 0-99 points.
// ponytail: replace with a POST /api/scores endpoint once real games report scores.
setInterval(() => {
  db.exec("UPDATE scores SET score = score + abs(random() % 100)");
  console.log(`[ranks db] ${new Date().toLocaleTimeString()}`);
  console.table(db.prepare("SELECT user_id, score FROM scores ORDER BY score DESC").all());
  broadcast();
}, TICK_MS);

createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname !== "/api/ranks/stream") {
    res.writeHead(404).end();
    return;
  }
  for (const id of (url.searchParams.get("ids") ?? "").split(",")) {
    if (/^\d+$/.test(id)) addUser.run(Number(id));
  }
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write(snapshot());
  clients.add(res);
  req.on("close", () => clients.delete(res));
}).listen(PORT, () => console.log(`ranks server on :${PORT}`));
