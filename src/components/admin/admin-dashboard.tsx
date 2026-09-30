'use client'

import { useCallback, useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { Loader2, LogOut, RefreshCw } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

type ContactRow = {
  id: string
  name: string
  email: string
  projectType: string
  budgetRange: string
  message: string
  isRead: boolean
  createdAt: string
}

type ProjectRow = {
  id: string
  title: string
  slug: string
  description: string
  featured: boolean
  sortOrder: number
}

type TestimonialRow = {
  id: string
  name: string
  role: string
  company: string
  quote: string
  sortOrder: number
}

export function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [inbox, setInbox] = useState<ContactRow[]>([])
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([])
  const [newProjectTitle, setNewProjectTitle] = useState('')

  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      const [contactRes, projectRes, testimonialRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/admin/projects'),
        fetch('/api/testimonials'),
      ])
      const contactData = (await contactRes.json()) as any
      const projectData = (await projectRes.json()) as any
      const testimonialData = (await testimonialRes.json()) as any
      setInbox(contactData.latest ?? [])
      setProjects(projectData.projects ?? [])
      setTestimonials(testimonialData.testimonials ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const markRead = async (id: string, isRead: boolean) => {
    await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isRead }),
    })
    loadAll()
  }

  const toggleFeatured = async (project: ProjectRow) => {
    await fetch(`/api/admin/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !project.featured }),
    })
    loadAll()
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    loadAll()
  }

  const createProject = async () => {
    if (!newProjectTitle.trim()) return
    await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newProjectTitle.trim(),
        description: 'Add a short summary in the admin or database.',
        tags: 'Next.js',
        featured: false,
      }),
    })
    setNewProjectTitle('')
    loadAll()
  }

  const updateTestimonialOrder = async (id: string, sortOrder: number) => {
    await fetch(`/api/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sortOrder }),
    })
    loadAll()
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-200">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">DevFusion Admin</h1>
          <p className="text-sm text-slate-400">Inbox, projects & testimonials</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadAll} className="border-white/20">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut()} className="border-white/20">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading…
          </div>
        ) : (
          <Tabs defaultValue="inbox">
            <TabsList className="bg-white/5">
              <TabsTrigger value="inbox">Inbox ({inbox.filter((m) => !m.isRead).length})</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            <TabsContent value="inbox" className="mt-6 space-y-4">
              {inbox.length === 0 && <p className="text-slate-400">No messages yet.</p>}
              {inbox.map((msg) => (
                <article
                  key={msg.id}
                  className={`rounded-xl border p-4 ${msg.isRead ? 'border-white/10 bg-white/5' : 'border-orange-500/40 bg-orange-500/5'}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-orange-300">
                        {msg.email}
                      </a>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => markRead(msg.id, !msg.isRead)}>
                      {msg.isRead ? 'Mark unread' : 'Mark read'}
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    {msg.projectType} · {msg.budgetRange} ·{' '}
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{msg.message}</p>
                </article>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="mt-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="New project title"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="border-white/20 bg-white/5"
                />
                <Button onClick={createProject}>Add project</Button>
              </div>
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <p className="font-semibold text-white">{p.title}</p>
                    <p className="text-xs text-slate-400">/{p.slug}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch checked={p.featured} onCheckedChange={() => toggleFeatured(p)} id={`f-${p.id}`} />
                      <Label htmlFor={`f-${p.id}`}>Featured</Label>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => deleteProject(p.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="testimonials" className="mt-6 space-y-4">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">
                    {t.name} — {t.role}, {t.company}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{t.quote}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Label>Sort order</Label>
                    <Input
                      type="number"
                      className="w-24 border-white/20 bg-white/5"
                      defaultValue={t.sortOrder}
                      onBlur={(e) => updateTestimonialOrder(t.id, Number(e.target.value))}
                    />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
