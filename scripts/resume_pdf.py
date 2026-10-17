# Generates a one-page entry-level software engineering resume PDF.
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

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


def section_title(label):
    global y
    txt(20 * mm, y, label.upper(), 11, "Helvetica-Bold", DARK)
    c.setStrokeColor(ORANGE)
    c.setLineWidth(1.2)
    c.line(20 * mm, y - 2.2 * mm, 70 * mm, y - 2.2 * mm)
    y -= 7 * mm


def para(s, size=9.5, x=20 * mm, w=W - 40 * mm, color=GRAY, leading=4.6 * mm):
    global y
    for line in simpleSplit(s, "Helvetica", size, w):
        txt(x, y, line, size, "Helvetica", color)
        y -= leading


def bullet(text, indent=20 * mm):
    global y
    for line in simpleSplit(f"• {text}", "Helvetica", 9.2, W - (indent + 10 * mm)):
        txt(indent, y, line, 9.2, "Helvetica", GRAY)
        y -= 4.6 * mm


def role_line(left, right, x_left=20 * mm, x_right=W - 20 * mm):
    global y
    txt(x_left, y, left, 10.2, "Helvetica-Bold", DARK)
    c.setFont("Helvetica", 8.8)
    c.setFillColor(ORANGE)
    c.drawRightString(x_right, y, right)
    y -= 5.2 * mm


# Header band
c.setFillColor(DARK)
c.rect(0, H - 46 * mm, W, 46 * mm, fill=1, stroke=0)
c.setFillColor(ORANGE)
c.rect(0, H - 48 * mm, W, 2 * mm, fill=1, stroke=0)

txt(20 * mm, H - 20 * mm, "ATONG GLORY", 26, "Helvetica-Bold", HexColor("#ffffff"))
txt(20 * mm, H - 26.5 * mm, "Entry-Level Software Engineer", 13, "Helvetica-Bold", ORANGE)
txt(
    20 * mm,
    H - 33 * mm,
    "atongglory17@gmail.com   |   github.com/atongglory   |   linkedin.com/in/atongglory   |   Bamenda, Cameroon",
    8.8,
    "Helvetica",
    LIGHT,
)

y = H - 58 * mm

section_title("Profile")
para(
    "Entry-level software engineer and 2026 Computer Engineering graduate (Software Engineering option) with hands-on experience contributing to web projects, coordinating interns, and supporting business IT systems. Seeking to contribute to a collaborative engineering team and build reliable, user-focused applications.",
    size=9.4,
    leading=4.4 * mm,
)
y -= 1 * mm

section_title("Projects")
role_line("Bilingual Full-Stack Portfolio", "Self-directed")
para(
    "Built with Next.js, React, TypeScript, and Prisma. Includes English and French interfaces, database-backed project content, case-study pages, protected admin routes, and a contact form.",
    size=8.8,
    leading=4 * mm,
)
role_line("Missbelleart and Lamzart blogs", "Built")
role_line("Vilen Pharmacy website", "In development")
role_line("JC Wisdom Construction website", "In development")
role_line("Boys' Brigade Cameroon web app", "In development")
role_line("Smart Attendance Management System", "Early-stage IoT project")
para("Collaborating with Eric Yunwe on the project for Bambili Baptist Church.", size=8.8, leading=4 * mm)
y -= 1 * mm

section_title("Experience")
role_line("IT & Social Media Manager", "JC Wisdom Construction Company Ltd | 2023–Present")
bullet("Provide IT support and handle network administration, hardware/software maintenance, and security.")
bullet("Manage social media remotely, including content creation, community management, marketing, reporting, and growth strategy.")
y -= 1 * mm

role_line("Chief Intern / Senior Intern", "Nexinch Ltd, Bamenda | 2024–2025")
bullet("Contributed to Laravel web projects and website development; coordinated junior interns, assigned tasks, and facilitated stand-up meetings.")
y -= 1 * mm

section_title("Education")
role_line("B.Tech, Computer Engineering (Software Engineering option)", "University of Bamenda | 2026")
role_line("Higher National Diploma (HND)", "2025")
y -= 1 * mm

section_title("Technical & professional skills")
para(
    "React, JavaScript, TypeScript, Next.js, Laravel, Prisma, Git, web development, IT support, network administration, hardware/software maintenance, and security.",
    size=9,
    leading=4.2 * mm,
)
para(
    "Problem solving, critical thinking, communication, leadership, collaboration, project coordination, research, and content creation.",
    size=9,
    leading=4.2 * mm,
)

y -= 1 * mm
section_title("Community involvement")
para(
    "Volunteer involvement with the Cameroon Baptist Convention, Boys' Brigade, companies, NGOs, and community social programs.",
    size=9,
    leading=4.2 * mm,
)

c.setTitle("Atong Glory — Entry-Level Software Engineer")
c.save()
print("Resume PDF generated")
