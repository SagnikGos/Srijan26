import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

/**
 * POST /api/superadmin/clear-cache
 * Clears ALL Next.js data caches (admin + superadmin level).
 * Accessible by SUPERADMIN role only.
 */
export async function POST() {
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPERADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Admin-level caches
    revalidateTag("admin-events", {});
    revalidateTag("event-participants", {});
    revalidateTag("event-admins", {});
    revalidateTag("live-events", {});

    // Superadmin-level caches
    revalidateTag("superadmin-users", {});
    revalidateTag("superadmin-merch", {});

    console.log(
      `[Cache Clear] Full cache purge by SUPERADMIN ${session.user.email} at ${new Date().toISOString()}`
    );

    return Response.json(
      {
        ok: true,
        message: "All caches cleared successfully",
        clearedTags: [
          "admin-events",
          "event-participants",
          "event-admins",
          "live-events",
          "superadmin-users",
          "superadmin-merch",
        ],
        clearedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Cache Clear] Failed to clear all caches:", error);
    return Response.json(
      { error: "Failed to clear cache" },
      { status: 500 }
    );
  }
}
