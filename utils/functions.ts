import { ChatCompletionCreateParams } from "openai/resources/chat/index";

export const runtime = "edge";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        key: process.env.GREYNOISE_API_KEY!
    }
};

const vpn_list = [
    "ANONINE_XPN",
    "ANONYMOUS_VPN",
    "APROVPN_VPN",
    "ASTRILL_VPN",
    "AZIREVPN_VPN",
    "BLACKBERRY_VPN",
    "BLACKVPN_VPN",
    "BOXPN_VPN",
    "CELO_VPN",
    "CHEAPNEWS_VPN",
    "CLOUDVPN_VPN",
    "CRYPTOSTORM_VPN",
    "CYBERGHOST_VPN",
    "DEEPWEB_VPN",
    "ELITE_VPN",
    "EXPRESS_VPN",
    "FASTESTVPN_VPN",
    "FREEDOME_VPN",
    "FREESSTVPN_VPN",
    "FREEVPN_VPN",
    "FROS_VPN",
    "HIDEIP_VPN",
    "HIDEME_VPN",
    "HIDE_MY_ASS_VPN",
    "HOTSPOT_VPN",
    "IBVPN_VPN",
    "IPREDATOR_VPN",
    "IPVANISH_VPN",
    "IRONSOCKET_VPN",
    "IVACY_VPN",
    "LIQUID_VPN",
    "LUNA_VPN",
    "MONSTER_VPN",
    "MULLVAD_VPN",
    "NAMECHEAP_VPN",
    "NORD_VPN",
    "OCTANE_VPN",
    "OPERA_VPN",
    "PHANTOM_AVIRA_VPN",
    "PIA_VPN",
    "PRIVATETUNNEL_VPN",
    "PRIVATEVPN_VPN",
    "PROTON_VPN",
    "PROX_VPN",
    "PURE_VPN",
    "SAFER_VPN",
    "SLICK_VPN",
    "STRONG_VPN",
    "SURFSHARK_VPN",
    "SWITCH_VPN",
    "TOR_GAURD_VPN",
    "TOTAL_VPN",
    "TOUCH_VPN",
    "TRUST_ZONE_VPN",
    "TUNNELBEAR_VPN",
    "USAIP_VPN",
    "VIRTUAL_SHEILD_VPN",
    "VPNBARON_VPN",
    "VPNBOOK_VPN",
    "VPNGATE_VPN",
    "VPNJANTIT_VPN",
    "VPNSECURE_VPN",
    "VPNTUNNEL_VPN",
    "VPNUNLIMITED_VPN",
    "VPN_HT_VPN",
    "VPN_MONSTER_VPN",
    "VYPR_VPN",
    "WINDSCRIBE_VPN",
    "ZENDESK_VPN",
    "ZORRO_VPN"
]

export const functions: ChatCompletionCreateParams.Function[] = [
    {
        name: "get_ip_noise",
        description:
            "Get the ip data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                limit: {
                    type: "string",
                    description: "The ip to get the data from",
                },
            },
            required: ["ip"],
        },
    },
    {
        name: "run_greynoise_query",
        description:
            "Run an ip query on greynoise.io",
        parameters: {
            type: "object",
            properties: {
                ip: {
                    type: "string",
                    description: "The ip to get the data from",
                },
            },
            required: ["ip"],
        },
    },
    {
        name: "get_malicious_from_country",
        description:
            "Get the malicious ip addresses from a country",
        parameters: {
            type: "object",
            properties: {
                country: {
                    type: "string",
                    description: "The country to get the data from",
                },
            },
            required: ["country"],
        },
    },
    {
        name: "get_mal_tor",
        description:
            "Get the malicious ip addresses using tor",
        parameters: {
            type: "object",
            properties: {},
            required: [],
        },
    },
    {
        name: "get_category_with_classification",
        description:
            "Get the ip addresses with a specific category and classification",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                category: {
                    type: "string",
                    description: "The category to get the data from, eg. business, isp, hosting, education, or mobile network",
                },
            },
            required: ["classification", "category"],
        },
    },
    {
        name: "get_bot_data",
        description:
            "Get the bot data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                useragent: {
                    type: "string",
                    description: "The useragent to get the data from eg. Googlebot",
                },
            },
            required: ["classification", "useragent"],
        },
    },
    {
        name: "get_vpn_with_classification",
        description:
            "Get the vpn data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                vpn_service: {
                    type: "string",
                    description: `The vpn service to get the data from eg. ${vpn_list.join(", ")}`,
                },
            },
            required: ["classification", "vpn_service"],
        },
    },
    {
        name: "get_organisation_with_classification",
        description:
            "Get the organisation data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                organisation: {
                    type: "string",
                    description: "The organisation to get the data from eg. Google",
                },
            },
            required: ["classification", "organisation"],
        },
    },
    {
        name: "get_malicious_ports",
        description:
            "Get the malicious ports from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                port: {
                    type: "string",
                    description: "The port to get the data from eg. 22",
                },
            },
            required: ["port"],
        },
    },
    {
        name: "get_country_with_classification",
        description:
            "Get the country data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                country: {
                    type: "string",
                    description: "The country to get the data from eg. India",
                },
            },
            required: ["classification", "country"],
        },
    },
    {
        name: "port_search_with_os",
        description:
            "Get the port data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                os: {
                    type: "string",
                    description: "The os to get the data from eg. Linux",
                },
                port: {
                    type: "string",
                    description: "The port to get the data from eg. 22",
                },
            },
            required: ["os", "port"],
        },
    },
    {
        name: "city_search_with_classification",
        description:
            "Get the city data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                city: {
                    type: "string",
                    description: "The city to get the data from eg. Mumbai",
                },
            },
            required: ["classification", "city"],
        },
    },
    {
        name: "get_rdns_data",
        description:
            "Get the rdns data from greynoise.io, which includes searching for tlds of country sites like *.in, *.us, etc",
        parameters: {
            type: "object",
            properties: {
                classification: {
                    type: "string",
                    description: "The classification to get the data from eg. malicious or benign",
                },
                rdns: {
                    type: "string",
                    description: "The rdns to get the data from eg. google.com, *.gov.*, *.edu.*, *.google.com",
                },
            },
            required: ["classification", "country", "spoofable", "rdns"],
        },
    },
    {
        name: "get_path_with_cve",
        description:
            "Get the path data from greynoise.io",
        parameters: {
            type: "object",
            properties: {
                path: {
                    type: "string",
                    description: "The path to get the data from eg. /wp-login.php",
                },
                cve: {
                    type: "string",
                    description: "The cve to get the data from eg. CVE-2019-11510",
                },
            },
            required: ["path", "cve"],
        },
    },
];

async function get_ip_noise(ip: string) {
    const res = await fetch(`https://api.greynoise.io/v2/noise/context/${ip}`, options)
    const data = await res.json()
    return data
}

async function run_greynoise_query(ip: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=${ip}&size=20`, options)
    const data = await res.json()
    return data
}

async function get_mal_tor() {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:malicious%20metadata.tor:true&size=20`, options)
    const data = await res.json()
    return data
}

async function get_category_with_classification(classification: string, category: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20metadata.category:${category}&size=20`, options)
    const data = await res.json()
    return data
}

async function get_bot_data(classification: string, useragent: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20raw_data.web.useragents:${useragent}%20bot:true&size=2`, options)
    const data = await res.json()
    return data
}

async function get_vpn_with_classification(classification: string, vpn_service: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20vpn:true%20vpn_service:${vpn_service}&size=8`, options)
    const data = await res.json()
    return data
}

async function get_organisation_with_classification(classification: string, organisation: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20organization:${organisation}&size=20`, options)
    const data = await res.json()
    return data
}

async function get_malicious_ports(port: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:malicious%20raw_data.scan.port:${port}&size=3`, options)
    const data = await res.json()
    return data
}

async function get_country_with_classification(classification: string, country: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20metadata.country:${country}&size=10`, options)
    const data = await res.json()
    return data
}

async function port_search_with_os(os: string, port: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=raw_data.scan.port:${port}%20os:${os}&size=20`, options)
    const data = await res.json()
    return data
}

async function city_search_with_classification(classification: string, city: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20metadata.city:${city}&size=20`, options)
    const data = await res.json()
    return data
}

async function get_rdns_data(classification: string, rdns: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:${classification}%20rdns:${rdns}&size=20`, options)
    const data = await res.json()
    return data
}

async function get_path_with_cve(path: string, cve: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=cve:${cve}%20raw_data.web.paths:${path}&size=5`, options)
    const data = await res.json()
    return data
}

export async function runFunction(name: string, args: any) {
    switch (name) {
        case "get_ip_data":
            return get_ip_noise(args["ip"]);
        case "run_greynoise_query":
            return run_greynoise_query(args["ip"]);
        case "get_mal_tor":
            return get_mal_tor();
        case "get_category_with_classification":
            return get_category_with_classification(args["classification"], args["category"]);
        case "get_bot_data":
            return get_bot_data(args["classification"], args["useragent"]);
        case "get_vpn_with_classification":
            return get_vpn_with_classification(args["classification"], args["vpn_service"]);
        case "get_organisation_with_classification":
            return get_organisation_with_classification(args["classification"], args["organisation"]);
        case "get_malicious_ports":
            return get_malicious_ports(args["port"]);
        case "get_country_with_classification":
            return get_country_with_classification(args["classification"], args["country"]);
        case "port_search_with_os":
            return port_search_with_os(args["os"], args["port"]);
        case "city_search_with_classification":
            return city_search_with_classification(args["classification"], args["city"]);
        case "get_rdns_data":
            return get_rdns_data(args["classification"], args["rdns"]);
        case "get_path_with_cve":
            return get_path_with_cve(args["path"], args["cve"]);
        default:
            return null;
    }
}