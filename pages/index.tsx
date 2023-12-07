import classNames from "classnames"
import Head from "next/head"
import { Popover } from "@headlessui/react"
import type { InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { ArrowRightCircleIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { ArrowPathIcon } from "@heroicons/react/20/solid"
import React, { useRef, useState } from "react"
import Markdown from 'react-markdown'
import TextareaAutosize from "react-textarea-autosize"
import { useCompletion } from 'ai/react'
import { getRandomExamples } from "../utils/data"
import Image from "next/image"

export default function Home({
  initialExamples,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [examples, setExamples] = useState(initialExamples)
  const [showCursor, setShowCursor] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { input, setInput, isLoading, completion, setCompletion, handleSubmit, handleInputChange, complete } = useCompletion({
    api: "/api/generate",
    onResponse: (res) => {
      if (res.status === 200) {
        setShowCursor(true)
        buttonRef.current?.focus()
      }
    },
    onFinish: () => {
      setShowCursor(false)
    }
  })

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleExampleClick = (text: string) => {
    setInput(text)
    buttonRef.current?.focus()
  }

  const handleRefreshExamples = () => {
    setExamples(getRandomExamples())
  }

  const handleClearResults = () => {
    setInput("")
    setCompletion("")
  }

  const reSubmit = () => {
    complete(input)
  }

  const handleCopy = (text: string) => () => {
    navigator.clipboard.writeText(text)
  }

  const renderMarkdownWithCursor = () => {
    const markdownContent = completion + (showCursor ? ' 🔵' : '');
    return (
      <div className="border border-gray-200 rounded-lg p-4 flex flex-row">
        <Markdown className="prose prose-md prose-p:text-black prose-ul:text-black">
          {markdownContent}
        </Markdown>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>greynoise.ai :: Let AI get info about any IP address.</title>
        <meta
          name="description"
          content="Let AI get info about any IP address. Powered by GreyNoise Enterprise API and OpenAI's GPT-4 Turbo x Function Calling."
        />
        <meta property="og:title" content="greynoise.ai :: Let AI get info about any IP address." />
        <meta
          property="og:description"
          content="Let AI get info about any IP address. Powered by GreyNoise Enterprise API and OpenAI's GPT-4 Turbo x Function Calling."
        />
        <meta property="og:image" content="https://greynoiseai.za16.fyi/preview.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="greynoise.ai :: Let AI get info about any IP address." />
        <meta
          name="twitter:description"
          content="Let AI get info about any IP address. Powered by GreyNoise Enterprise API and OpenAI's GPT-4 Turbo x Function Calling."
        />
        <meta name="twitter:image" content="https://greynoiseai.za16.fyi/preview.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://greynoiseai.za16.fyi/favicon.ico" />
      </Head>

      <div className="mx-auto p-4 lg:p-6 max-w-screen-sm min-h-screen">
        <div className="mb-8">
          <div className="mb-2 flex items-center space-x-2">
            <Image src="/logo.svg" alt="Vercel Logo" width={40} height={40} priority={true} className="rounded-xs" />
            <Link
              href="/"
              className="text-2xl leading-none font-bold tracking-tight hover:underline"
            >
              GreyNoise<span className="font-serif text-3xl text-cyan-500">.</span>AI
            </Link>
          </div>
          <p className="mt-2">
            greynoise.ai is an AI tool that can get info about any IP address and their malicious activity.
          </p>
        </div>

        <div className="mb-12 lg:mb-14">
          <form className="flex flex-col w-full pl-2 py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
            <TextareaAutosize
              rows={1}
              maxRows={5}
              placeholder="Type your IP query here..."
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-9 focus:ring-0 focus-visible:ring-0"
              style={{ overflowY: "hidden" }}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 disabled:hover:bg-transparent"
            >
              <ArrowRightCircleIcon className="h-5 w-5" />
            </button>
          </form>
        </div>

        {!completion && !isLoading && (
          <div className="grid gap-12 lg:gap-14">
            <section>
              <div className="flex items-baseline justify-between">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wider">
                  Examples:
                </h2>
                <Button isSmall={true} onClick={handleRefreshExamples}>
                  <ArrowPathIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                {examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleExampleClick(ex)}
                  >
                    <span className="select-none">“</span>
                    {ex}
                    <span className="select-none">”</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wider">How does it work?</h2>
              <p>
                <strong>greynoise.ai</strong> is a tool that uses AI to get info about any IP address.
                It uses <a href="https://greynoise.io">Greynoise Enterprise API</a> to get info about the IP address and then uses <a href="https://openai.com/blog/function-calling-and-other-api-updates">OpenAI&apos;s GPT-4 Turbo x Function Calling</a> to generate what you&apos;re looking for.
              </p>
            </section>
          </div>
        )}

        {isLoading && !completion && (
          <div className="animate-pulse">
            <div className="mb-3 h-5 bg-gray-200 rounded-full w-48 lg:w-64"></div>
            <div className="mb-5 p-4 border-2 border-gray-200 rounded-lg">
              <div className="h-3 bg-gray-200 rounded-full w-5/6 mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full w-6/6 mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
              <div className="h-3 bg-gray-200 rounded-full w-5/6 mb-2.5 mt-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full w-6/6 mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
              <div className="h-3 bg-gray-200 rounded-full w-5/6 mb-2.5 mt-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full w-6/6 mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full w-4/6"></div>
            </div>
          </div>
        )}

        {completion && (
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider">Ouput:</h2>
            {!showCursor && (
              <div className="my-4 flex space-x-2">
                <Button onClick={handleClearResults}>Clear results</Button>
                <Button onClick={reSubmit}>Submit again</Button>
              </div>
            )}
            <div className="relative">
              <div>
                <div className="mb-4">
                  {renderMarkdownWithCursor()}
                  <div className="more-menu-container absolute top-1 right-1">
                    <Popover className="relative inline-block">
                      <Popover.Button className="flex p-0.5 text-gray-500 rounded-md hover:bg-gray-100">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                      </Popover.Button>
                      <Popover.Panel className="absolute right-0 z-10 mt-1 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                        <div className="grid grid-cols-1 divide-y divide-gray-100 text-xs">
                          <Popover.Button
                            className="px-4 py-2 w-full text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                            onClick={handleCopy(input + `\n` + completion)}
                          >
                            Copy result
                          </Popover.Button>
                          <Popover.Button
                            className="px-4 py-2 w-full text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                            as="a"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={makeTweetUrl(input + `\n` + completion)}
                          >
                            Share on Twitter
                          </Popover.Button>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="sticky top-[100vh] pt-6 md:pt-10 flex md:justify-center space-x-8 text-xs">
          <a href="https://twitter.com/zaidmukaddam" className="hover:underline">
            Made by <strong>@zaidmukaddam</strong>
          </a>
          <a href="https://github.com/zaidmukaddam/greynoise-ai" className="hover:underline">
            Code on GitHub
          </a>
        </footer>
      </div>
    </>
  )
}


export async function getServerSideProps() {
  return {
    props: {
      key: Date.now(), // so that state resets when clicking header link to refresh
      initialExamples: getRandomExamples(),
    },
  }
}

function Button({
  children,
  isSmall = false,
  onClick,
}: {
  children: React.ReactNode
  isSmall?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={classNames(
        "flex items-center text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300",
        isSmall ? "p-1" : "py-1 px-2"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function makeTweetUrl(result: string) {
  const url = window.location.origin
  const params = new URLSearchParams({ text: result, url }).toString()
  return `https://twitter.com/intent/tweet?${params}`
}
