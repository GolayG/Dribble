"use client";

import { useRouter } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth-client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createAuthClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="outline" size="md" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
