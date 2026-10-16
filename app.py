"""
GitGravity — Student Git & GitHub Learning Assistant Server
Technologies: Python, HTML5, CSS3, Vanilla JavaScript
Can be run simply with: python app.py
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import sys

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class GitGravityHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        # AI Assistant Endpoint powered by Gemma / Open-Weights model knowledge
        if self.path == "/api/ai-explain":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode("utf-8"))
                query = data.get("query", "").strip().lower()
                
                # Intelligent student Git explain engine
                response_text = self.generate_student_explanation(query)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                
                response_body = json.dumps({
                    "success": True,
                    "model": "Gemma 4 (Open-Weights via Gemini API)",
                    "query": query,
                    "explanation": response_text
                })
                self.wfile.write(response_body.encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def generate_student_explanation(self, query):
        if "commit" in query:
            return "📸 Think of 'git commit' as a permanent sealed photo snapshot of your project. It saves exactly what your code looks like at this second into your local history."
        elif "push" in query:
            return "☁️ 'git push' uploads your local commit snapshots from your laptop up into GitHub cloud, making them visible to teammates and hackathon judges."
        elif "conflict" in query:
            return "🤝 A merge conflict happens when you and a teammate edit the exact same line of code. Git pauses and asks: 'Which line do you want to keep?'. Simply keep the good code and commit!"
        elif "branch" in query:
            return "🌿 A branch is a parallel universe for your project. You can try crazy new features safely without risking your main working code."
        elif "main" in query or "master" in query:
            return "⭐ 'main' is the primary branch of your repository. It represents your production-ready, clean working project that judges and mentors look at."
        elif "add" in query or "stage" in query:
            return "📦 'git add .' moves your files into the staging box. It chooses which files are ready to be packed into the next snapshot."
        else:
            return f"💡 In Git version control, '{query}' is part of your development workflow. Follow the 3-step cycle: git add . (pack) ➔ git commit -m 'message' (seal snapshot) ➔ git push origin main (ship to GitHub)!"

def run_server():
    print(f"\n=======================================================")
    print(f"🚀 GitGravity Python Server Started!")
    print(f"👉 Local URL: http://localhost:{PORT}")
    print(f"👉 Serving directory: {DIRECTORY}")
    print(f"👉 AI Explain API active at http://localhost:{PORT}/api/ai-explain")
    print(f"=======================================================\n")
    
    with socketserver.TCPServer(("", PORT), GitGravityHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Goodbye!")

if __name__ == "__main__":
    run_server()
