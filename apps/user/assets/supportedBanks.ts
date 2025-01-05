export type Bank = {
  name: string;
  redirectUrl: string;
};

export const SUPPORTED_BANKS: Bank[] = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
  {
    name: "State Bank of India",
    redirectUrl: "https://www.onlinesbi.com/",
  },
  {
    name: "ICICI Bank",
    redirectUrl: "https://www.icicibank.com/",
  },
  {
    name: "Punjab National Bank",
    redirectUrl: "https://www.pnbindia.in/",
  },
  {
    name: "Kotak Mahindra Bank",
    redirectUrl: "https://www.kotak.com/",
  },
  {
    name: "Bank of Baroda",
    redirectUrl: "https://www.bankofbaroda.in/",
  },
  {
    name: "IDFC First Bank",
    redirectUrl: "https://www.idfcfirstbank.com/",
  },
  {
    name: "Yes Bank",
    redirectUrl: "https://www.yesbank.in/",
  },
  {
    name: "Canara Bank",
    redirectUrl: "https://www.canarabank.com/",
  },
  {
    name: "Union Bank of India",
    redirectUrl: "https://www.unionbankofindia.co.in/",
  },
  {
    name: "Bank of India",
    redirectUrl: "https://www.bankofindia.co.in/",
  },
  {
    name: "Indian Bank",
    redirectUrl: "https://www.indianbank.in/",
  },
  {
    name: "Federal Bank",
    redirectUrl: "https://www.federalbank.co.in/",
  },
  {
    name: "RBL Bank",
    redirectUrl: "https://www.rblbank.com/",
  },
  {
    name: "IDBI Bank",
    redirectUrl: "https://www.idbibank.in/",
  }
]
