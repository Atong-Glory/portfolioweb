# Generates a clean one-page resume PDF for the portfolio's "Download Resume" button
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
from pathlib import Path

W, H = A4
PUBLIC = Path(__file__).resolve().parents[1] / "public"
ORANGE = HexColor("#f97316")
DARK = HexColor("#0f172a")
GRAY = HexColor("#475569")
LIGHT = HexColor("#94a3b8")

c = canvas.Canvas(str(PUBLIC / "Atong-Glory-Resume.pdf"), pagesize=A4)

def txt(x, y, s, size=10, font="Helvetica", color=GRAY):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, s)

# Header band
c.setFillColor(DARK)
c.rect(0, H - 46*mm, W, 46*mm, fill=1, stroke=0)
c.setFillColor(ORANGE)
c.rect(0, H - 48*mm, W, 2*mm, fill=1, stroke=0)

txt(20*mm, H - 20*mm, "ATONG GLORY", 26, "Helvetica-Bold", HexColor("#ffffff"))
txt(20*mm, H - 26.5*mm, "Full-Stack Software Engineer", 13, "Helvetica-Bold", ORANGE)
txt(20*mm, H - 33*mm, "atongglory17@gmail.com   |   github.com/atongglory   |   linkedin.com/in/atongglory", 9, "Helvetica", LIGHT)

y = H - 58*mm

def heading(label):
    global y
    txt(20*mm, y, label.upper(), 11, "Helvetica-Bold", DARK)
    c.setStrokeColor(ORANGE); c.setLineWidth(1.2)
    c.line(20*mm, y - 2.2*mm, 70*mm, y - 2.2*mm)
    y -= 9*mm

def para(s, size=9.5, x=20*mm, w=W-40*mm, color=GRAY, leading=4.6*mm):
    global y
    for line in simpleSplit(s, "Helvetica", size, w):
        txt(x, y, line, size, "Helvetica", color)
        y -= leading

def item(left, right):
    global y
    txt(20*mm, y, left, 10, "Helvetica-Bold", DARK)
    txt(W-20*mm, y, right, 9, "Helvetica", ORANGE)
    y -= 5.2*mm

heading("Profile")
para("Full-stack software engineer focused on building useful web applications with TypeScript, React, and Next.js. This portfolio repository demonstrates a bilingual interface, database-backed content and contact routes, an admin area, and Cloudflare deployment configuration.")
y -= 3*mm

heading("Selected Project")
item("Bilingual Full-Stack Portfolio", "Self-directed")
para("Built with Next.js, TypeScript, Prisma, and Tailwind CSS. The repository includes English and French UI content, project case-study routes, a contact inbox, protected admin routes, and local SQLite / Cloudflare D1 data access.")
y -= 3*mm

heading("Implementation highlights")
para("Typed application routes, bilingual content, responsive UI, persistent contact submissions, optional Turnstile verification, rate limiting, and a documented Cloudflare Workers deployment path.")
y -= 3*mm

heading("Technologies in this repository")
para("TypeScript, React, Next.js, Tailwind CSS, Prisma, SQLite, Cloudflare D1, Cloudflare Workers, OpenNext, Git")
y -= 3*mm

heading("Contact")
para("Email: atongglory17@gmail.com  |  GitHub: github.com/atongglory  |  LinkedIn: linkedin.com/in/atongglory")

c.setTitle("Atong Glory — Full-Stack Software Engineer")
c.save()
print("Resume PDF generated")
