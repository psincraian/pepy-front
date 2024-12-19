import Link from "next/link";

const LINK_CSS = "underline hover:bg-accent hover:text-accent-foreground p-0.5 rounded-sm";

export const NEWS = {
  NEW_FEATURE_CI_DOWNLOADS_FILTER: {
    id: "new-feature-ci-downloads-filter",
    title: "🎉 The new CI Downloads Filter is now live!",
    description: "Enjoy more precise and detailed stats.",
    link: {
      text: "Learn more",
      url: "https://x.com/psincraian/status/1864028393856999621"
    },
    expiryDate: "2024-12-11"
  },
  CHRISTMAS_GIVEWAY_2024: {
    id: "christmas-giveway-2024",
    title: <>🎄🎁 Win one month FREE subscription! Follow the rules on this post on <Link className={LINK_CSS} href="https://x.com/psincraian/status/1869821027934490672">X</Link> or <Link className={LINK_CSS} href="https://www.threads.net/@petrurares/post/DDxWCnBofGY?xmt=AQGzXKuhgcpi97TF5xkquRM_qElnjlp2bN-oZVzThIgc_g">Threads</Link></>,
    expiryDate: "2024-12-26"
  }
} as const;
