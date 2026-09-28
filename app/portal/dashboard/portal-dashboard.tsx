"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./portal-dashboard.module.css";

type PortalRole = "admin" | "client";

type ClientRecord = {
  id: string;
  contact_name: string;
  business_name: string | null;
};

type WebsiteRecord = {
  id: string;
  name: string;
  url: string;
  is_primary: boolean;
};

type ServiceRecord = {
  id: string;
  service_name: string;
  client_visible_summary: string | null;
};

type RequestRecord = {
  id: string;
  title: string | null;
  request_type: string;
  status: "received" | "working" | "complete";
  created_at: string;
};

type AdminRequestRecord = RequestRecord & {
  client_id: string;
  description: string;
  clientName: string;
  businessName: string | null;
  clientEmail: string;
  attachmentCount: number;
};

type DashboardData = {
  email: string;
  role: PortalRole;
  client: ClientRecord | null;
  website: WebsiteRecord | null;
  service: ServiceRecord | null;
  requests: RequestRecord[];
  adminRequests: AdminRequestRecord[];
};

const requestTypes = [
  {
    title: "Update something on my website",
    description: "Change text, photos, links, or another part of an existing page.",
    icon: "edit",
    href: "/portal/requests/new/website-update",
  },
  {
    title: "Upload photos",
    description: "Send new photos or files and keep them with the request they belong to.",
    icon: "image",
    href: "/portal/requests/new/upload-photos",
  },
  {
    title: "Change business information",
    description: "Update hours, contact details, services, pricing, or other business information.",
    icon: "business",
    href: "/portal/requests/new/change-business-information",
  },
  {
    title: "Add something new",
    description: "Request a new page, section, feature, or other addition to your site.",
    icon: "plus",
    href: "/portal/requests/new/add-something-new",
  },
  {
    title: "Something else",
    description: "Tell me what you need in your own words.",
    icon: "message",
    href: "/portal/requests/new/something-else",
  },
] as const;

const navItems = [
  { label: "Dashboard", target: "top", active: true },
  { label: "Requests", target: "requests" },
  { label: "Services", target: "services" },
  { label: "Billing", target: "billing", badge: "Phase 2" },
  { label: "Account", target: "account" },
];

function RequestIcon({ name }: { name: (typeof requestTypes)[number]["icon"] }) {
  const paths = {
    edit: (
      <>
        <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m21 15-5-5L5 19" />
      </>
    ),
    business: (
      <>
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-5h6v5M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" />
      </>
    ),
    plus: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function statusLabel(status: RequestRecord["status"]) {
  if (status === "working") return "Working on it";
  if (status === "complete") return "Complete";
  return "Received";
}

function requestTypeLabel(type: string) {
  const labels: Record<string, string> = {
    website_update: "Website update",
    upload_photos: "Photo upload",
    change_business_information: "Business information",
    add_something_new: "Something new",
    something_else: "Other request",
  };

  return labels[type] ?? "Website request";
}

export function PortalDashboard() {
  const supabase = useMemo(() => createClient(), []);
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setError("Portal authentication is not configured in this environment.");
      return;
    }

    const client = supabase;
    let active = true;

    async function loadDashboard() {
      const { data: authData, error: authError } = await client.auth.getUser();

      if (!active) return;

      if (authError || !authData.user) {
        window.location.replace("/portal/login");
        return;
      }

      const user = authData.user;

      const [{ data: adminRows, error: adminError }, { data: clientRows, error: clientError }] =
        await Promise.all([
          client
            .from("portal_admins")
            .select("user_id")
            .eq("user_id", user.id)
            .limit(1),
          client
            .from("clients")
            .select("id, contact_name, business_name")
            .eq("auth_user_id", user.id)
            .limit(1),
        ]);

      if (!active) return;

      if (adminError || clientError) {
        setError("We could not load your portal access. Please try again.");
        return;
      }

      const isAdmin = Boolean(adminRows?.length);
      const portalClient = clientRows?.[0] ?? null;

      if (!isAdmin && !portalClient) {
        setError("Your sign-in is valid, but this portal account is not linked to a client record.");
        return;
      }

      let website: WebsiteRecord | null = null;
      let service: ServiceRecord | null = null;
      let requests: RequestRecord[] = [];
      let adminRequests: AdminRequestRecord[] = [];

      if (isAdmin) {
        const { data: requestRows, error: requestError } = await client
          .from("service_requests")
          .select("id, client_id, title, description, request_type, status, created_at")
          .order("created_at", { ascending: false })
          .limit(20);

        if (!active) return;

        if (requestError) {
          setError("We could not load client requests. Please try again.");
          return;
        }

        const rawRequests = (requestRows ?? []) as Array<
          RequestRecord & { client_id: string; description: string }
        >;
        const clientIds = [...new Set(rawRequests.map((request) => request.client_id))];
        const requestIds = rawRequests.map((request) => request.id);

        let clientDetails: Array<{
          id: string;
          contact_name: string;
          business_name: string | null;
          email: string;
        }> = [];

        if (clientIds.length) {
          const { data: rows, error: detailsError } = await client
            .from("clients")
            .select("id, contact_name, business_name, email")
            .in("id", clientIds);

          if (detailsError) {
            setError("We could not load client details. Please try again.");
            return;
          }

          clientDetails = rows ?? [];
        }

        let attachmentRows: Array<{ request_id: string }> = [];

        if (requestIds.length) {
          const { data: rows, error: attachmentError } = await client
            .from("request_attachments")
            .select("request_id")
            .in("request_id", requestIds);

          if (attachmentError) {
            setError("We could not load request file information. Please try again.");
            return;
          }

          attachmentRows = rows ?? [];
        }

        const clientsById = new Map(clientDetails.map((row) => [row.id, row]));
        const attachmentCounts = new Map<string, number>();

        attachmentRows.forEach((row) => {
          attachmentCounts.set(
            row.request_id,
            (attachmentCounts.get(row.request_id) ?? 0) + 1,
          );
        });

        adminRequests = rawRequests.map((request) => {
          const requestClient = clientsById.get(request.client_id);

          return {
            ...request,
            clientName: requestClient?.contact_name ?? "Client",
            businessName: requestClient?.business_name ?? null,
            clientEmail: requestClient?.email ?? "",
            attachmentCount: attachmentCounts.get(request.id) ?? 0,
          };
        });
      }

      if (portalClient) {
        const [websiteResult, serviceResult, requestResult] = await Promise.all([
          client
            .from("client_websites")
            .select("id, name, url, is_primary")
            .eq("client_id", portalClient.id)
            .order("is_primary", { ascending: false })
            .limit(1),
          client
            .from("client_services")
            .select("id, service_name, client_visible_summary")
            .eq("client_id", portalClient.id)
            .eq("status", "active")
            .limit(1),
          client
            .from("service_requests")
            .select("id, title, request_type, status, created_at")
            .eq("client_id", portalClient.id)
            .order("created_at", { ascending: false })
            .limit(3),
        ]);

        if (!active) return;

        website = websiteResult.data?.[0] ?? null;
        service = serviceResult.data?.[0] ?? null;
        requests = (requestResult.data ?? []) as RequestRecord[];
      }

      setData({
        email: user.email ?? "Signed-in account",
        role: isAdmin ? "admin" : "client",
        client: portalClient,
        website,
        service,
        requests,
        adminRequests,
      });
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [supabase]);

  function scrollToPortalSection(target: string) {
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function signOut() {
    if (!supabase) return;

    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.replace("/portal/login");
  }

  if (error) {
    return (
      <main className={styles.centeredState}>
        <div className={styles.stateCard}>
          <Brand />
          <p className={styles.eyebrow}>Aaland Client Portal</p>
          <h1>We couldn&apos;t open the dashboard.</h1>
          <p>{error}</p>
          <Link href="/portal/login" className={styles.primaryLink}>
            Return to sign in
          </Link>
        </div>
      </main>
    );
  }

  if (!data) {
    return <DashboardSkeleton />;
  }

  const displayName =
    data.client?.business_name || data.client?.contact_name || "Aaland portal";
  const firstName = data.client?.contact_name?.split(" ")[0] ?? "Rebecca";
  const adminCounts = {
    received: data.adminRequests.filter((request) => request.status === "received").length,
    working: data.adminRequests.filter((request) => request.status === "working").length,
    complete: data.adminRequests.filter((request) => request.status === "complete").length,
  };
  const adminFileCount = data.adminRequests.reduce(
    (total, request) => total + request.attachmentCount,
    0,
  );

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Brand />

        <nav className={styles.nav} aria-label="Client portal">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToPortalSection(item.target)}
              className={item.active ? styles.navActive : styles.navLink}
            >
              <span>{item.label}</span>
              {item.badge ? <small>{item.badge}</small> : null}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <span>{data.role === "admin" ? "Portal administrator" : displayName}</span>
          <small>{data.email}</small>
          <button type="button" onClick={signOut} disabled={signingOut}>
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>
              {data.role === "admin" ? "Portal administration" : "Client portal"}
            </p>
            <h1>Hi, {firstName}.</h1>
          </div>
          <div className={styles.accountChip}>
            <span>{data.role === "admin" ? "Admin" : "Client"}</span>
            <strong>{data.email}</strong>
          </div>
        </header>

        {data.role === "admin" ? (
          <section className={styles.adminHero} aria-labelledby="admin-heading">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Client activity</p>
              <h2 id="admin-heading">Client requests</h2>
              <p>
                Review incoming website requests and files from approved Aaland
                clients. New requests arrive with a status of Received.
              </p>
            </div>

            <div className={styles.adminStats}>
              <div>
                <span>Received</span>
                <strong>{adminCounts.received}</strong>
              </div>
              <div>
                <span>Working on it</span>
                <strong>{adminCounts.working}</strong>
              </div>
              <div>
                <span>Complete</span>
                <strong>{adminCounts.complete}</strong>
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.requestHero} aria-labelledby="help-heading">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Website support</p>
              <h2 id="help-heading">What do you need help with?</h2>
              <p>
                Choose the closest option. The request form will only ask for the
                information needed to complete your update.
              </p>
            </div>

            <div className={styles.requestGrid}>
              {requestTypes.map((request) => (
                <Link
                  key={request.title}
                  href={request.href}
                  className={styles.requestCard}
                >
                  <span className={styles.requestIcon}>
                    <RequestIcon name={request.icon} />
                  </span>
                  <strong>{request.title}</strong>
                  <span>{request.description}</span>
                  <small>Start request →</small>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={styles.dashboardGrid}>
          <section
            className={
              styles.panel +
              (data.role === "admin" ? " " + styles.adminRequestsPanel : "")
            }
            id="requests"
          >
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.eyebrow}>Requests</p>
                <h2>
                  {data.role === "admin"
                    ? "Recent client requests"
                    : "Recent requests"}
                </h2>
              </div>
              <span className={styles.quietBadge}>
                {data.role === "admin"
                  ? data.adminRequests.length
                    ? data.adminRequests.length + " shown"
                    : "None yet"
                  : data.requests.length
                    ? data.requests.length + " shown"
                    : "None yet"}
              </span>
            </div>

            {data.role === "admin" ? (
              data.adminRequests.length ? (
                <div className={styles.adminRequestList}>
                  {data.adminRequests.map((request) => (
                    <Link
                      key={request.id}
                      href={"/portal/admin/requests/" + request.id}
                      className={styles.adminRequestRow}
                    >
                      <div className={styles.adminRequestMain}>
                        <div className={styles.adminRequestClient}>
                          <strong>
                            {request.businessName || request.clientName}
                          </strong>
                          <span>
                            {request.clientName}
                            {request.clientEmail
                              ? " • " + request.clientEmail
                              : ""}
                          </span>
                        </div>
                        <div className={styles.adminRequestSummary}>
                          <strong>
                            {request.title || requestTypeLabel(request.request_type)}
                          </strong>
                          <span>{request.description}</span>
                        </div>
                      </div>
                      <div className={styles.adminRequestMeta}>
                        <span>
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(request.created_at))}
                        </span>
                        <span>
                          {request.attachmentCount
                            ? request.attachmentCount +
                              (request.attachmentCount === 1 ? " file" : " files")
                            : "No files"}
                        </span>
                        <span
                          className={
                            styles.status +
                            " " +
                            styles["status_" + request.status]
                          }
                        >
                          {statusLabel(request.status)}
                        </span>
                        <strong className={styles.openRequest}>Open request →</strong>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <strong>No client requests yet.</strong>
                  <p>
                    New client submissions will appear here as soon as they are
                    received.
                  </p>
                </div>
              )
            ) : data.requests.length ? (
              <div className={styles.requestList}>
                {data.requests.map((request) => (
                  <article key={request.id} className={styles.requestRow}>
                    <div>
                      <strong>
                        {request.title || requestTypeLabel(request.request_type)}
                      </strong>
                      <span>
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(request.created_at))}
                      </span>
                    </div>
                    <span
                      className={styles.status + " " + styles["status_" + request.status]}
                    >
                      {statusLabel(request.status)}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <strong>No requests yet.</strong>
                <p>
                  Submitted website changes will appear here with one of three
                  simple statuses: Received, Working on it, or Complete.
                </p>
              </div>
            )}
          </section>

          <section className={styles.panel} id="services">
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.eyebrow}>Services</p>
                <h2>Your service</h2>
              </div>
            </div>

            {data.role === "admin" ? (
              <div className={styles.emptyState}>
                <strong>Administrator preview</strong>
                <p>
                  A client&apos;s active Aaland service will appear here first
                  when you test with a client account.
                </p>
              </div>
            ) : data.service ? (
              <div className={styles.serviceCard}>
                <span>Active</span>
                <strong>{data.service.service_name}</strong>
                {data.service.client_visible_summary ? (
                  <p>{data.service.client_visible_summary}</p>
                ) : null}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <strong>No active service listed.</strong>
                <p>Contact Aaland Web Design if this does not look right.</p>
              </div>
            )}
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.eyebrow}>
                  {data.role === "admin" ? "Files" : "Website"}
                </p>
                <h2>
                  {data.role === "admin" ? "Request files" : "Your website"}
                </h2>
              </div>
              {data.role === "admin" ? (
                <span className={styles.quietBadge}>{adminFileCount}</span>
              ) : null}
            </div>

            {data.role === "admin" ? (
              <div className={styles.emptyState}>
                <strong>
                  {adminFileCount
                    ? adminFileCount + (adminFileCount === 1 ? " file received" : " files received")
                    : "No request files yet."}
                </strong>
                <p>
                  Photos and other attachments will appear with their client
                  request once we build the upload flow.
                </p>
              </div>
            ) : data.website ? (
              <div className={styles.websiteCard}>
                <div>
                  <strong>{data.website.name}</strong>
                  <span>{data.website.url}</span>
                </div>
                <a href={data.website.url} target="_blank" rel="noreferrer">
                  Visit site ↗
                </a>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <strong>No website listed yet.</strong>
                <p>Your primary website will appear here once it is added.</p>
              </div>
            )}
          </section>

          <section className={styles.panel + " " + styles.billingPanel} id="billing">
            <div className={styles.panelHeading}>
              <div>
                <p className={styles.eyebrow}>Billing</p>
                <h2>Billing</h2>
              </div>
              <span className={styles.phaseBadge}>Phase 2</span>
            </div>
            <p className={styles.panelText}>
              Billing will live here later. For the MVP, website requests,
              files, and service information come first.
            </p>
          </section>
        </div>

        <section className={styles.accountSection} id="account">
          <div>
            <p className={styles.eyebrow}>Account</p>
            <h2>Signed in securely</h2>
          </div>
          <div>
            <strong>{data.email}</strong>
            <span>
              {data.role === "admin"
                ? "Portal administrator access"
                : "Approved Aaland client access"}
            </span>
          </div>
        </section>
      </section>
    </main>
  );
}

function Brand() {
  return (
    <Link href="/portal/dashboard" className={styles.brand}>
      <Image
        src="/rebecca-aaland-logo.png"
        alt=""
        width={48}
        height={48}
        className={styles.logo}
        priority
      />
      <div>
        <strong>Aaland Web Design</strong>
        <span>&amp; Site Care</span>
      </div>
    </Link>
  );
}

function DashboardSkeleton() {
  return (
    <main className={styles.loadingPage} aria-label="Loading portal dashboard">
      <div className={styles.loadingSidebar}>
        <div className={styles.skeleton + " " + styles.skeletonBrand} />
        <div className={styles.skeleton + " " + styles.skeletonNav} />
        <div className={styles.skeleton + " " + styles.skeletonNav} />
        <div className={styles.skeleton + " " + styles.skeletonNav} />
        <div className={styles.skeleton + " " + styles.skeletonNav} />
      </div>
      <div className={styles.loadingContent}>
        <div className={styles.skeleton + " " + styles.skeletonHeading} />
        <div className={styles.skeleton + " " + styles.skeletonHero} />
        <div className={styles.loadingGrid}>
          <div className={styles.skeleton + " " + styles.skeletonPanel} />
          <div className={styles.skeleton + " " + styles.skeletonPanel} />
        </div>
      </div>
    </main>
  );
}
