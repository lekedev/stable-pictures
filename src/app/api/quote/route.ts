import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend success and drop it.
  if (clean(body.company, 100)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    email: clean(body.email, 160),
    property_type: clean(body.type, 80),
    package: clean(body.pkg, 40),
    target_date: /^\d{4}-\d{2}-\d{2}$/.test(clean(body.date, 10)) ? clean(body.date, 10) : null,
    budget: clean(body.budget, 60),
    notes: clean(body.notes, 2000),
  };

  if (!lead.name || !lead.phone) return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });

  const { RESEND_API_KEY, LEADS_TO_EMAIL, LEADS_FROM_EMAIL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  const canEmail = !!(RESEND_API_KEY && LEADS_TO_EMAIL && LEADS_FROM_EMAIL);
  const canStore = !!(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

  if (!canEmail && !canStore) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[quote] lead (no Resend/Supabase configured):", lead);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[quote] no delivery configured; lead not saved");
    return NextResponse.json({ error: "We could not send your request right now." }, { status: 503 });
  }

  const tasks: Promise<boolean>[] = [];

  if (canStore) {
    tasks.push(
      fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(lead),
      }).then((r) => { if (!r.ok) console.error("[quote] supabase", r.status); return r.ok; }).catch(() => false),
    );
  }

  if (canEmail) {
    const text = [
      `New quote request`,
      ``,
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email || "not given"}`,
      `Property: ${lead.property_type}`,
      `Package: ${lead.package}`,
      `Date: ${lead.target_date || "not given"}`,
      `Budget: ${lead.budget}`,
      ``,
      `Notes:`,
      lead.notes || "none",
    ].join("\n");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: LEADS_FROM_EMAIL,
          to: [LEADS_TO_EMAIL],
          reply_to: lead.email || undefined,
          subject: `Quote request: ${lead.name} (${lead.package})`,
          text,
        }),
      }).then((r) => { if (!r.ok) console.error("[quote] resend", r.status); return r.ok; }).catch(() => false),
    );
  }

  // Succeed if at least one channel captured the lead.
  const results = await Promise.all(tasks);
  if (!results.some(Boolean)) return NextResponse.json({ error: "We could not send your request right now." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
