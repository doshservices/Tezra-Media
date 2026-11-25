import "./load-env";
import { getPayload } from "payload";
import config from "@payload-config";

/** One-off import of the November 2026 Tezra News batch. Safe to re-run: it skips existing slugs. */

type Article = {
  title: string;
  slug: string;
  summary: string;
  category: string[];
  format: string;
  filename: string;
  body: string[];
};

const para = (text: string) => ({
  type: "paragraph",
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr" as const,
  textFormat: 0,
  children: [
    { type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 },
  ],
});

const richText = (paragraphs: string[]) => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: paragraphs.map(para),
  },
});

const articles: Article[] = [
  {
    title: "Nvidia CEO Jensen Huang steps down after 33 years",
    slug: "nvidia-ceo-jensen-huang-steps-down",
    summary:
      "Jensen Huang is stepping down as chief executive of the chipmaker he co-founded, with CFO Colette Kress named interim CEO. The board has hired Wachtell Lipton to investigate intelligence allegations.",
    category: ["Technology", "Business & Economy", "Leadership"],
    format: "Latest News",
    filename: "nvidia-jensen-huang-steps-down.jpg",
    body: [
      "Nvidia CEO Jensen Huang is stepping down as CEO of the chipmaker he co-founded 33 years ago and built into a $4 trillion company that powered the artificial intelligence boom, the company announced Thursday.",
      "CFO Colette Kress has been named interim CEO.",
      "After a meteoric rise to fame due to Nvidia's central role in AI, Huang's dramatic fall has been even more rapid, following a series of stinging revelations about his romantic ties to a woman believed by the U.S. intelligence community to be a Chinese spy.",
      "Huang, 63, apologized on Sunday for being “unfaithful to my wife,” though he provided no details about the affair with businesswoman Alice Huang, who has worked for a Chinese company and Nvidia customer called Megaspeed. On Thursday, The New York Times reported that the Nvidia CEO also had a separate affair, this one with Kimberly Powell, vice president of health care at the chipmaker. Later that afternoon The Times and other outlets reported that Nvidia's board met to discuss the company's future.",
      "Jensen Huang denied allegations that he had compromised national security or Nvidia secrets after reports of the Alice Huang affair.",
      "The news sparked concerns that Nvidia knew companies based in Singapore and Malaysia had been evading U.S. export controls in accessing its technology. The board said on Tuesday that it had hired Wachtell Lipton to investigate the intelligence allegations.",
      "Huang's downfall also puts the spotlight on President Donald Trump, who formed a particularly close relationship with the CEO of what, until recently, was the world's most valuable company.",
    ],
  },
  {
    title: "Dangote refinery extends ₦2.15 trillion IPO to October 27 to widen African ownership",
    slug: "dangote-refinery-extends-ipo-to-october-27",
    summary:
      "Nigeria's SEC has approved a two-week extension to the Dangote Petroleum Refinery IPO, moving the deadline from October 13 to October 27, 2026, to widen access across African markets.",
    category: ["Business & Economy"],
    format: "Latest News",
    filename: "dangote-refinery-ipo-extension.jpg",
    body: [
      "Dangote Petroleum Refinery and Petrochemicals has extended the closing date of its initial public offering (IPO) by two weeks, giving investors until October 27, 2026, to apply for shares in one of Africa's most ambitious industrial ventures.",
      "The extension, approved by Nigeria's Securities and Exchange Commission, moves the original deadline of October 13 to October 27. The refinery said the additional time would support efforts to expand access to the offer across African markets, strengthen distribution channels and introduce depositary receipt programmes to facilitate cross border investment.",
      "The offer comprises 4.1 billion ordinary shares priced at ₦525 each, representing a potential offer value of approximately ₦2.15 trillion. With a minimum subscription of 10 shares, investors can apply from ₦5,250, excluding any applicable fees and charges.",
      "The company said it had received strong interest from eligible investors across Africa and other international markets.",
    ],
  },
  {
    title: "Reohob Group kicks off full operation with subsidiaries in Energy, Media, Tech and Finance",
    slug: "reohob-group-kicks-off-full-operation",
    summary:
      "Reohob Group has commenced full-scale operations with a portfolio spanning Reohob Energy, Tezra Media, Reis Factor and Zuritan Capital, across energy, media, technology and finance.",
    category: ["Business & Economy", "Leadership"],
    format: "Latest News",
    filename: "reohob-group-full-operation.jpg",
    body: [
      "Reohob Group has commenced full-scale operations with a diversified portfolio of companies positioned across four strategic sectors of the modern economy.",
      "Reohob Energy Limited covers energy and sustainable power; Tezra Media covers media and digital communications; Reis Factor Limited covers technology and innovation; and Zuritan Capital Limited covers finance and capital solutions.",
      "Built around a long-term vision of sustainable businesses, strategic diversification and lasting value creation, Reohob Group is developing a portfolio designed to operate across critical growth industries while creating opportunities for clients, partners and investors.",
      "This is more than the launch of a group of companies. It is the beginning of an enterprise platform built for scale.",
      "Reohob Group is building sustainable businesses and creating lasting value.",
    ],
  },
  {
    title: "Mr Eazi acquires 17.3% of Ghanaian drug manufacturer in $2.7 million bet on healthcare",
    slug: "mr-eazi-acquires-stake-in-intravenous-infusions",
    summary:
      "Through Zagadat Capital, Oluwatosin Ajibade has acquired a 17.31% stake in Ghanaian pharmaceutical manufacturer Intravenous Infusions Plc, in a move shaped by his mother's long illness.",
    category: ["Business & Economy", "Health"],
    format: "Latest News",
    filename: "mr-eazi-intravenous-infusions-stake.jpg",
    body: [
      "Nigerian entrepreneur and music executive Oluwatosin Ajibade, popularly known as Mr Eazi, has acquired a 17.31% stake in Ghanaian pharmaceutical manufacturer Intravenous Infusions Plc, turning a deeply personal experience into a strategic investment in healthcare.",
      "The investment was made through Zagadat Capital GH Ltd, the investment company Mr Eazi founded in 2017, where he serves as Chief Investment Officer. The firm acquired 47,514,775 shares through a series of open market transactions on the Ghana Alternative Exchange, valuing the stake at approximately $2.7 million.",
      "Ajibade said his decision was shaped by what he witnessed during the three years his mother was ill. His experience in hospitals exposed him to the difficulty many people face accessing essential medicines, including the high cost of treatment and the availability of substandard or counterfeit drugs.",
      "He said he had previously tried to address the problem by giving financial assistance, but concluded that a larger investment could create a more sustainable impact. The investment is focused on helping drive down the cost of essential medicines while working with the existing management of Intravenous Infusions to expand production capacity and grow exports across West Africa.",
      "The company operates a manufacturing plant in Koforidua, producing intravenous fluids, saline solutions and injectable medicines. It reportedly holds about half of Ghana's market for intravenous fluids, employs more than 300 people and exports to countries including Ivory Coast, Burkina Faso and Togo.",
      "Zagadat Capital has also made clear that the acquisition is not a takeover attempt. Because the shares were purchased through open market transactions, the money went to existing shareholders rather than directly into the pharmaceutical company.",
    ],
  },
  {
    title: "Emmanuel N. Nnorom appointed Chairman of UBA as Tony Elumelu steps down",
    slug: "emmanuel-nnorom-appointed-uba-chairman",
    summary:
      "Tony Elumelu will retire as Group Chairman of UBA on August 21, 2026, on reaching the CBN's 12-year tenure limit for non-executive directors. Emmanuel N. Nnorom succeeds him.",
    category: ["Business & Economy", "Leadership"],
    format: "Latest News",
    filename: "uba-nnorom-chairman.jpg",
    body: [
      "Tony Elumelu is to retire as UBA chairman after reaching the Central Bank of Nigeria's 12-year tenure limit.",
      "Billionaire investor and philanthropist Tony Elumelu will retire as Group Chairman of UBA on August 21, 2026, after completing the 12-year tenure limit for non-executive directors set by the CBN.",
      "Under his leadership, UBA expanded into a pan-African banking powerhouse with operations in 20 African countries and four global financial centres, serving more than 50 million customers.",
      "The Board has named Emmanuel N. Nnorom, a long-serving Non-Executive Director and seasoned banking executive, as his successor.",
    ],
  },
  {
    title: "Flutterwave announces Ripple investment in Series E round at $3.2 billion valuation",
    slug: "flutterwave-announces-ripple-investment",
    summary:
      "Flutterwave's chief executive has confirmed a strategic investment by Ripple as part of a Series E round that values the payments company at $3.2 billion.",
    category: ["Technology", "Business & Economy", "Innovation"],
    format: "Latest News",
    filename: "flutterwave-ripple-series-e.jpg",
    body: [
      "The CEO of Flutterwave confirmed that Ripple made a strategic investment in their company as part of a Series E fundraising round. In his post on social media he said this is a reflection of a shared belief that the future of money will be faster, more open, and more global than the systems we inherited.",
      "Ripple, an enterprise blockchain and cryptocurrency company that provides financial infrastructure for global payments, custody, and treasury management, was founded in 2012 and is headquartered in San Francisco, California. Best known for developing the XRP Ledger, it made the investment that took the valuation of Flutterwave to $3.2 billion.",
      "Mr Olugbenga, the Founder and CEO of Flutterwave, said in his post that the next decade of Flutterwave will be about building the rails that power trade, entrepreneurship, and economic opportunity across Africa and between Africa and the world.",
    ],
  },
  {
    title: "Elon Musk officially becomes a trillionaire after SpaceX IPO",
    slug: "elon-musk-becomes-trillionaire-after-spacex-ipo",
    summary:
      "A successful SpaceX IPO has taken Elon Musk's net worth to $1.1 trillion as of June 12, 2026, making him the first person in history to reach the milestone.",
    category: ["Business & Economy", "Technology"],
    format: "Latest News",
    filename: "elon-musk-trillionaire-spacex-ipo.jpg",
    body: [
      "A successful IPO for SpaceX has propelled Elon Musk's net worth to $1.1 trillion as of June 12, 2026, making him the first person in history to reach the milestone.",
      "The listing marks a defining moment for SpaceX, the world's most valuable private space company, and further cements its role as a key driver of Musk's fortune alongside Tesla.",
      "The milestone caps years of rapid growth in the commercial space sector, transforming SpaceX from an ambitious rocket startup into the company that helped create the world's first trillionaire.",
    ],
  },
  {
    title: "Xenophobia: about 270 Nigerians to be evacuated from South Africa",
    slug: "270-nigerians-to-be-evacuated-from-south-africa",
    summary:
      "At least 270 Nigerians affected by renewed xenophobic attacks in South Africa are expected to return home on a government-coordinated flight from Johannesburg to Lagos.",
    category: ["World Affairs", "Society", "Politics"],
    format: "Latest News",
    filename: "nigerians-evacuated-south-africa.jpg",
    body: [
      "At least 270 Nigerians affected by recent xenophobic attacks in South Africa are expected to return home as the Federal Government intensifies efforts to evacuate and support citizens caught up in the crisis.",
      "According to the Ministry of Foreign Affairs, the evacuees are scheduled to arrive in Lagos aboard a government-coordinated flight from Johannesburg. Upon arrival, they are expected to undergo documentation and profiling procedures before receiving assistance and being reunited with their families.",
      "The repatriation exercise forms part of Nigeria's response to growing concerns over the safety and welfare of its citizens abroad following reports of renewed xenophobic violence.",
      "Xenophobia remains a recurring challenge in parts of South Africa, with foreign nationals often becoming targets of attacks that have led to displacement, loss of livelihoods, and, in some cases, loss of lives.",
      "As the first batch of returnees heads home, attention will also be on the support systems available to help affected Nigerians rebuild their lives and transition back into their communities.",
      "Beyond the numbers are real people, families, businesses, and dreams disrupted by violence. Their safe return is a reminder of the importance of protecting human dignity, promoting tolerance, and ensuring that every individual can live and work free from fear, regardless of nationality.",
    ],
  },
  {
    title: "Google agrees to pay SpaceX $920 million a month for cloud compute",
    slug: "google-to-pay-spacex-for-cloud-compute",
    summary:
      "A multi-year agreement running from October 2026 to June 2029 gives Google access to 110,000 Nvidia GPUs, CPUs and memory for its Gemini Enterprise platform, worth over $30 billion if it runs to term.",
    category: ["Technology", "Business & Economy"],
    format: "Latest News",
    filename: "google-spacex-cloud-compute.jpg",
    body: [
      "Google has agreed to pay SpaceX $920 million per month under a multi-year cloud compute agreement running from October 2026 through June 2029. The massive leasing deal grants Google access to 110,000 Nvidia GPUs, CPUs, and memory to meet surging demand for its Gemini Enterprise AI platform.",
      "Totalling over $30 billion if it runs to term, the deal is worth about $11 billion annually.",
    ],
  },
  {
    title: "Jesus + Nothing grows from church conference into a global faith movement",
    slug: "jesus-plus-nothing-becomes-global-faith-movement",
    summary:
      "LOGIC Church's flagship conference, led by Apostle Dr Flourish Peters, drew a worldwide audience from May 27 to 31, bringing together church leaders, gospel ministers and believers across sectors.",
    category: ["Culture", "Society"],
    format: "Features",
    filename: "jesus-plus-nothing-logic-church.jpg",
    body: [
      "What began as a church conference is rapidly evolving into a global faith movement.",
      "Hosted by LOGIC Church under the leadership of Apostle Dr. Flourish Peters, the 2026 edition of Jesus + Nothing drew a worldwide audience from May 27–31, attracting thousands of online viewers and bringing together church leaders, gospel ministers, and believers across diverse sectors.",
      "Centered on a singular message, the finished work of Jesus Christ and the sufficiency of His grace, the conference has distinguished itself through four consecutive years of excellence, consistency, and a roster of respected Bible teachers.",
      "With the 2027 dates already announced, Jesus + Nothing continues to strengthen its position as one of the fastest growing faith-based gatherings, expanding its global reach while remaining committed to its core message.",
    ],
  },
  {
    title: "CBN Governor Olayemi Cardoso takes chairmanship of Africa Finance Corporation board",
    slug: "cardoso-takes-chairmanship-of-africa-finance-corporation",
    summary:
      "Olayemi Cardoso has been appointed Chairman of the Board of the Africa Finance Corporation, placing Nigeria at the head of one of the continent's major infrastructure financing institutions.",
    category: ["Business & Economy", "Leadership", "Politics"],
    format: "Latest News",
    filename: "cardoso-africa-finance-corporation.jpg",
    body: [
      "Central Bank of Nigeria Governor Olayemi Cardoso has been appointed Chairman of the Board of Directors of the Africa Finance Corporation (AFC), placing Nigeria at the head of the board of one of the continent's major infrastructure financing institutions.",
      "The appointment strengthens Nigeria's representation in an organisation that mobilises capital for projects designed to address Africa's infrastructure deficit. The AFC finances investments across sectors including energy, transport, telecommunications, natural resources and industrial development.",
      "Cardoso's appointment comes as African economies face growing pressure to secure long term financing for infrastructure, expand productive capacity and attract private investment. Reliable power, efficient transport networks and stronger industrial systems remain essential to improving competitiveness and supporting sustainable economic growth across the continent.",
    ],
  },
];

const run = async () => {
  const payload = await getPayload({ config });

  // restrictPublishToAdmin reads req.user, so the create has to carry one.
  const admins = await payload.find({
    collection: "users",
    where: { role: { equals: "administrator" } },
    limit: 1,
  });
  if (admins.totalDocs === 0) {
    console.error("ABORT: no administrator user found — nothing can be published.");
    process.exitCode = 1;
    return;
  }
  const user = admins.docs[0];
  console.log(`publishing as ${user.email}\n`);

  // Newest first on /news: article 1 gets the latest stamp.
  const base = Date.now();
  let created = 0;

  for (const [i, a] of articles.entries()) {
    const existing = await payload.find({
      collection: "news",
      where: { slug: { equals: a.slug } },
      limit: 1,
      draft: true,
    });
    if (existing.totalDocs > 0) {
      console.log(`skip   ${a.slug} (already exists)`);
      continue;
    }

    const media = await payload.find({
      collection: "media",
      where: { filename: { equals: a.filename } },
      limit: 1,
    });
    if (media.totalDocs === 0) {
      console.error(`ABORT  ${a.slug}: media ${a.filename} not found`);
      process.exitCode = 1;
      return;
    }

    await payload.create({
      collection: "news",
      data: {
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        category: a.category,
        format: a.format,
        image: media.docs[0].id,
        body: richText(a.body),
        byline: "Tezra News",
        publishedAt: new Date(base - i * 3600_000).toISOString(),
        _status: "published",
      } as never,
      user,
    });
    created += 1;
    console.log(`create ${a.slug}`);
  }

  console.log(`\n${created} created, ${articles.length - created} skipped.`);
  process.exit(0);
};

void run();
