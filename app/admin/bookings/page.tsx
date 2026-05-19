import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { CustomerRow, BookingRow } from "@/lib/supabase/types";
import { SignOutButton } from "./SignOutButton";

export const metadata: Metadata = { title: "Admin — Bookings" };

function statusVariant(status: string | null) {
  if (status === "confirmed") return "success" as const;
  if (status === "pending") return "warning" as const;
  return "default" as const;
}

function formatTime(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function durationMins(start: string | null, end: string | null) {
  if (!start || !end) return "—";
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
  return `${mins} min`;
}

export default async function AdminBookingsPage() {
  const db = createServerClient();

  const [{ data: bookings }, { data: customers }] = await Promise.all([
    db.from("bookings").select("*").order("created_at", { ascending: false }),
    db.from("customers").select("*"),
  ]);

  const customerMap = Object.fromEntries(
    (customers ?? [])
      .filter((c): c is CustomerRow & { id: string } => !!c.id)
      .map((c) => [c.id, c])
  );

  const rows = (bookings ?? []).map((b: BookingRow) => ({
    ...b,
    customer: b.customer_id ? (customerMap[b.customer_id] ?? null) : null,
  }));

  const confirmed = rows.filter((r) => r.status === "confirmed").length;
  const revenue = rows
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + (r.total_price ?? 0), 0);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}
        <div className="mb-10 border-b border-border pb-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)]">Bookings</h1>
            <SignOutButton />
          </div>
          <div className="flex flex-wrap gap-8 mt-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Total</p>
              <p className="text-3xl font-bold mt-1">{rows.length}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Confirmed</p>
              <p className="text-3xl font-bold mt-1 text-green-600">{confirmed}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Revenue</p>
              <p className="text-3xl font-bold mt-1 text-primary">{formatCurrency(revenue)}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        {rows.length === 0 ? (
          <p className="text-muted-foreground">No bookings yet.</p>
        ) : (
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  {["Field", "Customer", "Email", "Phone", "Date", "Time", "Duration", "Total", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((b, i) => (
                  <tr key={b.id ?? i} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">{b.field_id ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.customer?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{b.customer?.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{b.customer?.phone ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(b.start_time)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatTime(b.start_time)} – {formatTime(b.end_time)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{durationMins(b.start_time, b.end_time)}</td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {b.total_price != null ? formatCurrency(b.total_price) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant(b.status)}>{b.status ?? "unknown"}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
