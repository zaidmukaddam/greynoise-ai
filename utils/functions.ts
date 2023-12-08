import { ChatCompletionCreateParams } from "openai/resources/chat/index";

export const runtime = "edge";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        key: process.env.GREYNOISE_API_KEY!
    }
};

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

async function get_malicious_from_country(country: string) {
    const res = await fetch(`https://api.greynoise.io/v2/experimental/gnql?query=classification:malicious%20metadata.country:${country}&size=20`, options)
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

export async function runFunction(name: string, args: any) {
    switch (name) {
        case "get_ip_data":
            return get_ip_noise(args["ip"]);
        case "run_greynoise_query":
            return run_greynoise_query(args["ip"]);
        case "get_malicious_from_country":
            return get_malicious_from_country(args["country"]);
        case "get_mal_tor":
            return get_mal_tor();
        case "get_category_with_classification":
            return get_category_with_classification(args["classification"], args["category"]);
        case "get_bot_data":
            return get_bot_data(args["classification"], args["useragent"]);
        default:
            return null;
    }
}