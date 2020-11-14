import { PrismaClient as BasePrismaClient } from "@prisma/client"
import { Page } from "puppeteer"

export type PageLogic = (page: Page, delay?: number) => Promise<any>
export type PrismaClient = BasePrismaClient

export type ScrapeResult = {
  url: string
  html: string
}
