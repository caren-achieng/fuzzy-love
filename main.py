"""Run with python main.py. Download survey.sqlite3 from the workspace to analyse."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import json
import sqlite3
import uuid

ROOT = Path(__file__).resolve().parent
DB = ROOT / "survey.sqlite3"
ASSETS = {"/": ("index.html", "text/html"), "/match.js": ("match.js", "text/javascript")}

class App(BaseHTTPRequestHandler):
    def do_GET(self):
        asset = ASSETS.get(self.path)
        if not asset:
            return self.send_error(404)
        body = (ROOT / asset[0]).read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", asset[1] + "; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path != "/feedback":
            return self.send_error(404)
        try:
            length = int(self.headers.get("Content-Length", 0))
            if not 0 < length <= 40000:
                return self.send_error(413)
            data = json.loads(self.rfile.read(length))
            token = str(uuid.UUID(data["id"]))
            assert_valid = (data["choice"] in ("fuzzy","strict","equal","neither")
                            and data["first"] in ("fuzzy","strict")
                            and isinstance(data["comment"], str) and len(data["comment"]) <= 600)
            if not assert_valid:
                raise ValueError()
            with sqlite3.connect(DB) as conn:
                conn.execute("INSERT OR IGNORE INTO feedback VALUES (?,CURRENT_TIMESTAMP,?)",
                             (token, json.dumps(data)))
        except (KeyError, ValueError, TypeError, AttributeError):
            return self.send_error(400)
        except sqlite3.Error:
            return self.send_error(503)
        self.send_response(204)
        self.end_headers()

if __name__ == "__main__":
    with sqlite3.connect(DB) as conn:
        conn.execute("CREATE TABLE IF NOT EXISTS feedback(id TEXT PRIMARY KEY, time TEXT, response TEXT)")
    port = int(os.environ.get("PORT", "8501"))
    print(f"Mixed Signals running at http://localhost:{port}", flush=True)
    ThreadingHTTPServer(("0.0.0.0", port), App).serve_forever()
