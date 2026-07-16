# Nebor · Framer embed bundles

Each file here is a complete, self-contained section: paste the WHOLE file
into a Framer Embed element (type: HTML). Fonts, styles and animations are
inside; images load from the Netlify preview site.

## How to paste
1. In Framer: Insert > Embed, place it where the section goes, set width to fill.
2. In the right panel, set Type to HTML.
3. Open the file below on GitHub, click Raw, select all, copy, paste into the HTML box.
4. Set the embed frame height per breakpoint (table below). Everything else is automatic.

## crm-hero.html · CRM & RevOps hero cards (3)
| Framer breakpoint | Embed height |
| --- | --- |
| Desktop (1440+)   | 630 |
| Desktop 2 (1200-1439) | 610 |
| Tablet (810-1199) | 890 |
| Phone (0-809)     | 1330 |

Cards float, hover-lift and reveal their body text; all card animations play
on their own. The "See the full workflow" button is NOT in the embed: keep it
as a native Framer button under the section.

## crm-caps.html · CRM nine-capability console (interactive)
Includes the "Nine capabilities, one foundation" heading. Click a capability
in the rail and the view swaps: that all works inside the embed.
| Framer breakpoint | Embed height |
| --- | --- |
| Desktop (1200+)   | 960 |
| Tablet (810-1199) | 990 |
| Phone (0-809)     | 895 |

## crm-workflow.html · CRM living workflow (interactive flywheel)
The full section 04: header copy, step rail, flywheel canvas, why-note, spur.
Step clicks, popovers and the wheel all run inside the embed.
| Framer breakpoint | Embed height |
| --- | --- |
| Desktop (1200+)   | 1930 |
| Tablet (810-1199) | 2040 |
| Phone (0-809)     | 2130 |

Heights are measured at the breakpoint edges; if a strip of blank space shows
at some width, adjust the frame height, the content is height-stable per width.
