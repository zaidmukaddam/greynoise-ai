import shuffle from "lodash.shuffle"

export const EXAMPLES = [
    "What can you tell me about 183.89.74.49?",
    "Is this IP address malicious? 8.8.8.8",
    "What is the IP address 1.1.1.1?",
    "Explore the IP address: 183.89.74.49",
    "Give me info about this IP address: 223.108.211.83",
    "Search businesses showing malicious activity",
    "Search for malicious activity in India",
    "Search for mobile devices showing malicious activity",
    "Search for malicious activity in China",
    "Show me some malicioius ip addresses using tor",
    "Show me malicious google bot activity",
    "Search for weird Twitter bot activity",
    "Find if FREEDOME VPN is being used for malicious activity",
    "is NORD VPN being used for malicious activity?",
    "Show me all compromised devices that belong to Microsoft",
    "Is any MySQL server port being used for malicious activity? Show me the most critical one.",
    "Search for normal activity in Delhi.",
    "Search for http servers showing malicious activity",
    "Show me malicious activity on Government sites.",
    "Show me /wp-login.php for CVE-2019-11510.",
]

export function getRandomExamples(count: number = 4) {
    return shuffle(EXAMPLES).slice(0, count)
}