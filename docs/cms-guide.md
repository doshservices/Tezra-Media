# TEZRA website — content manager guide

How to add and change content on the TEZRA website. Written for the people who
will use it, not for developers.

---

## Signing in

Go to **/admin** on the website address and sign in with the email and password
you were given.

If you have forgotten your password, use the forgotten-password link on the
sign-in screen, or ask an Administrator to reset it for you.

---

## The two account types

TEZRA asked for two levels of access, and that is what the site has.

**Administrator** can do everything: write content, publish it, change the site
settings and create accounts for other people.

**Editor** can write and change content and save it as a draft, but cannot
publish. When an Editor finishes something, an Administrator reviews it and
publishes it.

A few things follow from that, and they are deliberate:

- An Editor cannot publish, even through a direct link. The site refuses it.
- An Editor cannot change something that is already published. That stops the
  publishing rule being sidestepped by editing a live page.
- An Editor cannot change their own account type.

If an Editor needs something published, an Administrator opens it, checks it and
changes **Draft** to **Published**.

---

## Draft and Published

Everything you write starts as a **Draft**. Drafts are not on the website —
nobody outside the team can see them. You can save a draft as many times as you
like.

**Published** means live on the website. It appears within a minute — the site
keeps a copy of each page for up to sixty seconds so visitors get an instant
load, then picks up your change. If you have just published something and do not
see it, wait a moment and reload.

The setting is in the right-hand column when you are editing. Only an
Administrator can change it.

Published something by mistake? Change it back to Draft. It comes off the site
straight away.

---

## Adding a news article

**News articles → Create new.**

| Field | What to put in it |
| --- | --- |
| Title | The headline. |
| Summary | One or two sentences. This is what shows on the News page and in Google results, so make it read well on its own. |
| Category | One of the fifteen TEZRA categories. |
| Format | Latest News, Analysis, Features, Interviews or Insights. |
| Image | The lead picture. Optional — the News page handles articles without one. |
| Body | The article itself. |
| Published date | Leave empty and it fills in when the article goes live. |
| Author | Who wrote it. Starts on whoever is signed in. |
| Byline | Only for a writer with no account here. |
| Featured | Tick to show it on the homepage. |

**The byline.** The article shows "By <name>" under the headline, with the date
and the reading time beside it. The name comes from the **Author** box, which
starts on whoever is signed in, so most of the time there is nothing to do.

Use the **Byline** box instead when the writer has no account in the CMS — a
guest contributor, a wire service, or a shared credit such as "Tezra News
staff". Anything typed there replaces the author's name. Leave it empty
otherwise.

**Web address** is in the right-hand column. It fills in from the title, and
whatever you type is tidied into lower case with hyphens — type "New Beach" and
it saves as "new-beach". Once an article is published, leave it alone — changing
it breaks any link anyone has already shared.

Each article gets its own page at `/news/<web address>`, with the related
articles in the same category shown underneath.

---

## Adding an artwork

**Artworks → Create new.**

Add at least one image. The first one is used in the catalogue grid, so make it
the best view of the work.

Fill in the artist's name, and the year, medium and dimensions where you have
them. The artist biography shows on the artwork's own page.

**Availability** is one of: available (enquire), sold, not for sale, or on loan
or exhibition.

**Price** is under a collapsed section. You can record a price without showing
it: leave **Show price publicly** unticked and the site says "Price on request"
instead. The website takes enquiries only — it does not take payments, which is
what TEZRA asked for. Online payment can be added later.

Each work gets its own page at `/arts/<web address>`, so a single piece can be
sent to a buyer as a direct link. Both buttons on that page carry the work's
title into the contact form, so an enquiry arrives knowing which piece it is
about.

---

## Adding a project to Our Work

**Projects → Create new.**

Title, summary, category and which part of TEZRA delivered it. Add a client only
if TEZRA has permission to name them.

**You cannot publish a project until Verified by TEZRA is ticked.** The site
refuses the save and tells you why. That is on purpose: TEZRA was explicit that
no invented or unverified project, case study or result goes on the website. Tick
it only once someone has actually confirmed the project, its results and any
client named are accurate.

---

## Adding a client or partner logo

**Clients and partners → Create new.**

Name, logo file and whether they are a client, partner, sponsor or institutional
collaborator.

**You cannot publish a logo until Permission to display the logo is ticked.**
Showing a company's logo without permission is a legal problem, so the site will
not let it happen by accident.

Use **Order** to control the sequence in the logo wall. Lower numbers come first.

Logos appear in the scrolling wall on the homepage and on the Clients & Partners
page. Until there is at least one approved logo, that wall stays as empty
placeholders with a note explaining why.

---

## Adding a leadership profile

**Leadership → Create new.** Name, position, photograph and biography. **Order**
controls the sequence on the page.

The Leadership page is reached from the About page rather than from the main
menu, which is how TEZRA asked for it.

---

## Images

**Media** holds every picture on the site. You can upload from there, or upload
while filling in any image field.

**Alt text is required.** It is a plain description of what is in the picture —
"Two people in conversation at a conference table", not a caption. Screen
readers read it aloud, and Google uses it. The site will not accept an image
without it.

Upload the biggest version you have. The site makes its own smaller copies and
serves whichever fits the visitor's screen, so a large original costs nothing and
a small one cannot be improved later.

**TEZRA's own photograph** — tick this only for TEZRA's own photography. Stock
pictures are allowed as background and atmosphere, but must never be presented as
TEZRA's own work, people, clients or artworks.

**Credit** is the photographer or source. Whatever is typed there is printed
under the picture wherever it appears, so fill it in for anything that has to be
credited.

### Captions on a picture inside an article

Drop an image into the body of an article and a small toolbar appears over it.
The **pencil** opens a box for a **Caption** — the line printed underneath.

The caption belongs to that one placement, so the same photograph can carry a
different line in a different article. The credit belongs to the picture itself
and follows it everywhere. If both are filled in they print together, caption
first.

Pictures in a body are shown at the width of the article, and a tall one is
capped so it cannot take over the page.

---

## Site settings

**Settings → Site settings.** Administrators only, because these affect every
page.

**Contact** — email and phone are confirmed. The physical address is still to be
provided; leave it empty and nothing is shown. There is no placeholder anywhere
on the site.

**Social** — add one row per account: which part of TEZRA it belongs to, the
platform, the handle and the full web address. The footer icons appear as soon as
there is at least one complete row. TEZRA has confirmed four handles
(@tezragroup, @tezra.media, @tezranews, @tezraarts) but not which platforms they
are on, so nothing is linked yet.

**Legal** — the Privacy Policy and Terms of Use. Each one appears in the footer
once its wording is filled in. An empty policy page is worse than no link, so
nothing shows until there is real text.

---

## Things to know

**The site is hidden from Google on purpose.** It stays out of search results
until TEZRA approves launch in writing. Nothing in the content manager changes
that — it is a deployment setting.

**Featured.** Ticking Featured on an article, project or artwork puts it on the
homepage. It controls what leads, rather than the homepage always showing
whatever is newest.

**What you cannot do from here.** Page layout, menu structure, fonts and colours
are not editable in the content manager. Those are development changes.

**If a save is refused**, read the message. It will say exactly what is missing —
usually a verification tick, a permission tick, or that you need an Administrator
to publish.

---

## Who to ask

For content questions, ask whoever holds Administrator access.

For anything the content manager will not let you do, or anything that looks
broken, contact the development team.
