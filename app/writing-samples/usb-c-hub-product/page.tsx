import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { PortfolioHeader } from "@/components/portfolio-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "NorthDock 8-Port USB-C Hub | Product Writing Sample",
  description:
    "Product content demonstration showing customer-facing technical copy, specifications, compatibility notes, and FAQ content for a fictional USB-C hub.",
  path: "/writing-samples/usb-c-hub-product",
});

const specs = [
  ["Host connection", "USB-C with DisplayPort Alt Mode support for video output"],
  ["HDMI", "Up to 4K at 60 Hz on supported host devices and displays"],
  ["Ethernet", "Gigabit Ethernet, up to 1 Gbps"],
  ["USB-A", "2 × USB-A data ports, up to 5 Gbps each"],
  ["USB-C data", "1 × USB-C data port, up to 5 Gbps"],
  ["Card readers", "SD and microSD, UHS-I"],
  ["Power delivery", "USB-C PD pass-through, up to 100 W input"],
  ["Housing", "Aluminum enclosure with integrated 18 cm host cable"],
  ["Operating systems", "Windows 11, macOS, and ChromeOS"],
] as const;

export default function UsbCHubProductSamplePage() {
  return (
    <>
      <PortfolioHeader />
      <main className="business-main service-theme-tech">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Writing Sample · Product Content</p>
          <h1>NorthDock 8-Port USB-C Hub</h1>
          <p>
            Turn one USB-C port into the connections your desk actually needs —
            without making every feature sound more complicated than it is.
          </p>
        </section>

        <article className="legal-copy shell">
          <p>
            <strong>Portfolio demonstration:</strong> NorthDock is a fictional product.
            The name and specifications below were created for this writing sample and
            are not claims about a product for sale.
          </p>

          <h2>One cable. Eight useful connections.</h2>
          <p>
            The NorthDock 8-Port USB-C Hub is designed for laptops that travel light but
            still need a full desk when the workday starts. Connect an external display,
            wired network, keyboard, storage device, or camera card through one compact
            hub, then add USB-C power so your laptop can charge while you work.
          </p>
          <p>
            It is a practical fit for home offices, shared workspaces, classrooms, and
            anyone who is tired of choosing between charging the laptop and plugging in
            the device they actually need.
          </p>

          <h2>What the ports do for you</h2>
          <ul>
            <li>
              <strong>Connect a 4K display.</strong> The HDMI port supports up to 4K at
              60 Hz when the laptop and display support the required video mode.
            </li>
            <li>
              <strong>Use a stable wired network.</strong> Gigabit Ethernet gives you a
              direct network connection when Wi-Fi is crowded, weak, or simply not your
              preference.
            </li>
            <li>
              <strong>Keep everyday USB devices connected.</strong> Two USB-A ports and
              one USB-C data port support keyboards, mice, flash drives, external storage,
              and other compatible peripherals.
            </li>
            <li>
              <strong>Move photos without an extra adapter.</strong> Built-in SD and
              microSD slots make it easier to transfer files from cameras, recorders, and
              other card-based devices.
            </li>
            <li>
              <strong>Charge through the hub.</strong> Connect a compatible USB-C power
              adapter to the PD input for up to 100 W of pass-through power input. Actual
              power delivered to the laptop depends on the charger, host device, cable,
              and power used by the hub itself.
            </li>
          </ul>

          <h2>Technical specifications</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {specs.map(([label, value]) => (
                  <tr key={label}>
                    <th style={{ textAlign: "left", padding: "14px 18px 14px 0", verticalAlign: "top" }}>
                      {label}
                    </th>
                    <td style={{ padding: "14px 0", color: "var(--text-soft)" }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Compatibility matters</h2>
          <p>
            A USB-C connector tells you what the plug looks like; it does not tell you
            every feature the laptop supports. For HDMI output, the host USB-C port must
            support DisplayPort Alt Mode or another compatible video-output method. A
            laptop with a charge-only or data-only USB-C port will not gain video output
            just because the hub has an HDMI connector.
          </p>
          <p>
            The same principle applies to charging. USB-C Power Delivery must be supported
            by the laptop, charger, and cable. If your laptop came with a higher-wattage
            power adapter, use a charger appropriate for that device rather than assuming
            any USB-C charger will provide the same performance.
          </p>

          <h2>Shared bandwidth, explained simply</h2>
          <p>
            The hub&apos;s data ports share the bandwidth available through the host USB-C
            connection. That usually is not noticeable when you are using a keyboard,
            mouse, card reader, and an occasional flash drive. If you are transferring
            large files through several high-speed devices at the same time, however,
            individual devices may not all reach their maximum advertised speed.
          </p>
          <p>
            That is not a defect in the hub; it is a limitation of the connection carrying
            all of that traffic back to the computer. Stating that up front gives customers
            a more useful expectation than listing maximum speeds without context.
          </p>

          <h2>What&apos;s in the box</h2>
          <ul>
            <li>NorthDock 8-Port USB-C Hub</li>
            <li>Integrated USB-C host cable</li>
            <li>Quick-start card</li>
          </ul>
          <p>
            USB-C power adapter, HDMI cable, Ethernet cable, memory cards, and peripheral
            devices are not included.
          </p>

          <h2>Frequently asked questions</h2>
          <p>
            <strong>Will it work with any laptop that has USB-C?</strong><br />
            Not necessarily. Basic USB data functions may work on many USB-C systems, but
            HDMI and Power Delivery depend on features supported by the host device. Check
            the laptop manufacturer&apos;s specifications before purchase.
          </p>
          <p>
            <strong>Can I use the hub without a charger connected?</strong><br />
            Yes. The data, card-reader, Ethernet, and supported video functions can operate
            from the host connection. Connecting a compatible USB-C PD charger adds laptop
            charging through the hub.
          </p>
          <p>
            <strong>Why am I not getting 4K at 60 Hz?</strong><br />
            Confirm that the laptop, USB-C port, HDMI cable, and display all support the
            required resolution and refresh rate. The final output is limited by the least
            capable part of that connection.
          </p>
          <p>
            <strong>Do I need to install a driver?</strong><br />
            The fictional product brief assumes driver-free core operation on the listed
            operating systems. Network or device behavior can still depend on the host
            system and attached peripherals.
          </p>

          <h2>Why this sample is written this way</h2>
          <p>
            Technical product copy has two jobs: help someone understand why the product
            is useful and keep the specifications honest. Instead of repeating a feature
            list, this sample translates each specification into a customer use case and
            explains the compatibility limits that could otherwise turn into support
            questions later.
          </p>

          <p>
            <Link className="text-link" href="/writing-samples">
              ← Back to writing samples
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
