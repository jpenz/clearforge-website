export interface Blueprint {
  name: string;
  description: string;
}

/** Build patterns from past systems. Names are illustrative. */
export const BLUEPRINTS: Blueprint[] = [
  {
    name: "Inbound quote to order",
    description: "Turns inbound quote requests into structured orders.",
  },
  {
    name: "Sales playbook generator",
    description: "Drafts account-specific playbooks from CRM records.",
  },
  {
    name: "Field service dispatch triage",
    description: "Sorts incoming service requests and routes each crew.",
  },
  {
    name: "Portfolio adoption scoreboard",
    description: "Tracks weekly-active usage across portfolio companies.",
  },
  {
    name: "Quote desk agent",
    description: "Drafts quotes from inbound specs for human review.",
  },
  {
    name: "Eval harness starter",
    description: "Checks AI outputs against a test set before release.",
  },
];
