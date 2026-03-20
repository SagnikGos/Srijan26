import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

/**
 * POST /api/admin/clear-cache
 * Clears all admin-level Next.js data caches.
 * Accessible by SUPERADMIN roles.
 */
export async function POST() {
  const session = await auth();

  if (
    !session?.user ||
    !["SUPERADMIN"].includes(session.user.role)
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidateTag("admin-events", {});
    revalidateTag("event-participants", {});
    revalidateTag("event-admins", {});
    revalidateTag("live-events", {});

    console.log(
      `[Cache Clear] Admin cache cleared by ${session.user.email} (${session.user.role}) at ${new Date().toISOString()}`
    );

    return Response.json(
      {
        ok: true,
        message: "Admin cache cleared successfully",
        clearedTags: [
          "admin-events",
          "event-participants",
          "event-admins",
          "live-events",
        ],
        clearedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Cache Clear] Failed to clear admin cache:", error);
    return Response.json(
      { error: "Failed to clear cache" },
      { status: 500 }
    );
  }
}
