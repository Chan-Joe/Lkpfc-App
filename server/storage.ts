import { type App, type InsertApp } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllApps(): Promise<App[]>;
  getApp(id: string): Promise<App | undefined>;
  createApp(app: InsertApp): Promise<App>;
  updateApp(id: string, app: Partial<InsertApp>): Promise<App | undefined>;
  deleteApp(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private apps: Map<string, App>;

  constructor() {
    this.apps = new Map();
    this.seedApps();
  }

  private seedApps() {
    const appsData: Omit<App, "id">[] = [
      {
        name: "iClass",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/e5/00/07/e5000774-73c3-c6b1-9885-67bf18f5614a/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 12:31"),
      },
      {
        name: "Microsoft PowerPoint",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e0/5a/c7/e05ac7e9-41a8-feee-bdca-b1d2587f2676/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-0-0-0-85-220.png/100x100bb.jpg",
        version: "2.102.2",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 12:31"),
      },
      {
        name: "Google 雲端硬碟",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/72/e8/1f/72e81f6f-4d24-2cc9-af87-a167becd5a36/logo_drive_universal-0-0-1x_U007epad-0-0-0-1-0-0-0-0-85-220.png/100x100bb.jpg",
        version: "4.2542.11202",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 12:32"),
      },
      {
        name: "Microsoft Word",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b8/04/e6/b804e665-2ca1-c450-bd02-d091a21acb8a/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-0-0-0-85-220.png/100x100bb.jpg",
        version: "2.102.2",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "ClassDojo",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2c/43/f3/2c43f366-0b5a-fda7-f6eb-24f6e39b3e50/AppIcon-0-1x_U007epad-0-1-0-sRGB-85-220-0.png/100x100bb.jpg",
        version: "17.31.0",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "EduVenture X",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/67/da/25/67da2574-69b4-d93d-d3e0-7ebb1434b073/AppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/100x100bb.jpg",
        version: "1.7.5",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Socrative Student",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/91/5c/79/915c79ba-9d6f-7f58-ddee-0e687bf2c724/AppIcon-0-0-1x_U007epad-0-85-220.png/100x100bb.jpg",
        version: "4.8.1",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "TED",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1b/25/28/1b252852-3470-aea4-97a3-85bcd8c2876c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Microsoft Excel",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d7/ac/6d/d7ac6d0c-f441-14af-07aa-903d1f9b123f/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-0-0-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Plickers",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/eb/60/2d/eb602dc4-d57c-dec6-b7b4-d7953a984457/AppIcon-0-0-1x_U007emarketing-0-0-0-4-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Nearpod",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/61/be/9f/61be9fbf-4e87-d3a8-5f5b-074a06f4d816/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Educreations Whiteboard",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/88/6d/ef/886defd2-f2b0-2e79-c201-a5395f0a8a8b/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "EduCalc Classic",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/8a/50/15/8a50157f-d3f1-8496-e1c1-bf72da962803/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Socrative Teacher",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/51/9a/b7/519ab79a-d444-2603-1161-f7bbf8291545/AppIcon-1x_U007epad-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Dropbox: 雲端硬碟 | PDF 檔案,照片,影片",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/70/1c/7d/701c7d38-967b-a5d6-259c-747c452557c8/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "YouTube",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a8/04/6e/a8046e10-3434-b99a-29cc-383e82049de2/logo_youtube_2024_q4_color-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220-0.png/100x100bb.jpg",
        version: "20.40.4",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "MyObservatory",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f0/1a/21/f01a2181-36c2-38b3-c64c-de7021657bbe/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Microsoft OneDrive",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cf/78/b3/cf78b39d-0e61-5230-b8ed-a048f7dbb158/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/100x100bb.jpg",
        version: "14.20.2",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "FotoRus -Camera & Photo Editor",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/c0/9e/be/c09ebe1b-5bed-42f3-729a-f58d3e7951a1/AppIcon-0-1x_U007emarketing-0-85-220-4.png/100x100bb.jpg",
        version: "7.2.2",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Google Chrome",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e1/fe/0a/e1fe0a49-447f-30ff-b70c-7eec50ed5cd1/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-85-220.png/100x100bb.jpg",
        version: "140.7339.122",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "OALD 9th edition",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/5e/53/ce/5e53ce7b-88f2-0c4c-105c-fb0a9ac7f3a0/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220.png/100x100bb.jpg",
        version: "3.53.764",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Dictionary.com for iPad",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/19/26/61/19266107-f348-55fc-22e3-0784a0f2e410/AppIcon-Free-0-0-1x_U007emarketing-0-0-5-0-85-220.jpeg/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "QR Code Reader by Scan",
        iconUrl: "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/9b/8b/37/9b8b373d-1291-8511-ae1f-2133bf18a22e/source/100x100bb.jpg",
        version: "1.8",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "課堂",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/69/c8/4a/69c84a18-56fc-34b1-1863-c5428a11425b/AppIcon-0-1x_U007emarketing-0-0-5-0-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Schoology",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/a7/53/b5a753af-1dfc-0ab5-157f-8b127ce74d37/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Google Classroom",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/da/c5/e3/dac5e3f8-2c2e-5dd4-6b71-730419bcb1d3/AppIcon-0-1x_U007epad-0-0-0-1-0-0-0-85-220-0.png/100x100bb.jpg",
        version: "3.41.300041000",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "GeoGebra Classic",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b9/76/d9/b976d981-b955-af48-3945-8c74ac3c27cf/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Kahoot! 遊玩 & 建立測驗",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/be/aa/80/beaa8026-6bff-6ef0-bb08-3c78104a9b40/AppIcon-0-0-1x_U007epad-0-1-0-0-sRGB-85-220.png/100x100bb.jpg",
        version: "6.2.1",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Google 翻譯",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6f/88/ab/6f88ab97-b806-f563-8ccf-0f13cb08d931/logo_translate_color-0-1x_U007epad-0-0-0-1-0-0-0-85-220-0.png/100x100bb.jpg",
        version: "7.15.0",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Google 試算表",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bb/7f/04/bb7f0448-43aa-72a9-0b0f-3d77a1e7e6cc/logo_sheets_2024q3_color-0-1x_U007epad-0-0-0-1-0-0-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "AI英语-每日英语听力视频",
        iconUrl: "https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/89/63/5c/89635c3a-6082-639f-d9cc-5fdb129f947c/source/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "VOA Learning English - Conservation daily report",
        iconUrl: "https://is2-ssl.mzstatic.com/image/thumb/Purple62/v4/7e/ca/68/7eca682d-b1d6-57b1-edaf-769d72b640dc/pr_source.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:25"),
      },
      {
        name: "Ultimate Word Search Go",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ec/70/77/ec707741-ab0b-2a69-8fa2-476a17ad14ec/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Spell Grid : Word Jumble",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0a/64/b0/0a64b006-5249-61c8-a1d4-b91b271ffc44/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/100x100bb.jpg",
        version: "1.18",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Keynote",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e8/53/fa/e853fa1b-fe4d-4156-a224-07ec2af1a909/AppIcon-0-1x_U007epad-0-0-0-11-0-0-P3-0-0-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Numbers",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b3/07/8c/b3078c1d-64c9-0b9e-5e3e-a32e0ef2503d/AppIcon-0-1x_U007epad-0-0-0-11-0-0-P3-0-0-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Pages",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/59/2e/6d/592e6db6-5640-f562-d8c0-9ad3a9852d40/AppIcon-0-0-1x_U007epad-0-0-0-11-0-0-P3-0-0-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "iMovie",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0e/cc/74/0ecc74b6-54f6-f43b-b3d9-e2ba1d81ebc6/AppIcon-0-1x_U007epad-0-1-0-85-220-0.png/100x100bb.jpg",
        version: "3002",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Wind Tunnel Free",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/3f/b4/d9/3fb4d9b6-ffeb-9d3c-a9ab-1ed04b3ca48f/mzm.bpucshuw.jpg/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "GarageBand",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e2/0a/db/e20adbdb-50a1-a3de-5caf-c0ce52edda1e/AppIcon-0-1x_U007epad-0-0-0-1-0-0-P3-85-220-0.png/100x100bb.jpg",
        version: "2.3.16",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Pinterest",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/3a/e6/92/3ae6921b-8ba4-f4cd-72b5-82b116f20f8a/AppIcon-0-0-1x_U007epad-0-1-0-0-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Bamboo Paper",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/59/cf/68/59cf6867-12e4-30f5-4369-730686e22ab5/AppIcon-1x_U007emarketing-0-5-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "數學之王",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e7/c4/4e/e7c44e15-785e-b706-fa76-990da6d513c0/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/100x100bb.jpg",
        version: "1.3.15",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Mind Map Maker - Mindomo",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f2/35/22/f23522ad-dc75-e406-c73a-6c44aa15e23a/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Quizlet：使用單詞卡學習",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/23/f2/9b/23f29b08-033c-e510-8377-3c9377b1d851/AppIcon-production-0-0-1x_U007emarketing-0-8-0-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Mathspace",
        iconUrl: "https://is3-ssl.mzstatic.com/image/thumb/Purple128/v4/79/13/87/79138725-6996-03e0-86a7-cd2defe95bda/source/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Protractor+",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/de/31/ff/de31ff25-2838-37f6-dec0-8f48c64da922/Protractor_Icon_Set-1x_U007emarketing-0-8-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Desmos Graphing Calculator",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/20/8c/0c/208c0cc3-394d-03de-f1ef-040b75f88233/AppIcon-Desmos-0-0-1x_U007emarketing-0-6-85-220.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "eSchool.hk 電子校園",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/25/bd/f0/25bdf04f-dd81-64a8-079f-f841cbbd1614/AppIcon-0-0-1x_U007emarketing-0-2-0-0-85-220.png/100x100bb.jpg",
        version: "3.3",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Google 文件",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fd/2a/d4/fd2ad4e1-0342-8795-1f14-df73d60f315e/logo_docs_2024q3_color-0-1x_U007epad-0-0-0-1-0-0-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "CamMeasure Lite - 用你的相機測量任何高度、寬度、距離和面積！",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple62/v4/00/f1/ba/00f1ba52-e58f-5c8d-f78e-961418a8425b/mzl.owesaxsc.png/100x100bb.jpg",
        version: "3.5.2",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Google 簡報",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ac/b3/78/acb37815-3c83-5629-2ae7-c512b415f73a/logo_slides_2024q3_color-0-1x_U007epad-0-0-0-1-0-0-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Poll Everywhere",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/94/41/f3/9441f371-a14e-e5a9-f79e-e069b9138c0d/AppIcon-1x_U007epad-0-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Sketchbook®",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8d/70/ad/8d70adfb-1a6e-cd81-e1ab-01c20a71bceb/AppIcon-0-0-1x_U007epad-0-1-0-0-85-220.png/100x100bb.jpg",
        version: "6.1.0",
        installed: true,
        isLatest: true,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Video Stopwatch",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/d4/c8/e1/d4c8e199-b414-ab5b-7b51-6f5777089b4d/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
      {
        name: "Swift Playground",
        iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d2/a0/f2/d2a0f2b2-136b-78a8-e0aa-eaec1890e89c/PlaygroundsAppIcon-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-85-220-0.png/100x100bb.jpg",
        version: null,
        installed: false,
        isLatest: false,
        createdAt: new Date("2019-12-10 16:26"),
      },
    ];

    appsData.forEach((appData) => {
      const id = randomUUID();
      const app: App = { id, ...appData };
      this.apps.set(id, app);
    });
  }

  async getAllApps(): Promise<App[]> {
    return Array.from(this.apps.values());
  }

  async getApp(id: string): Promise<App | undefined> {
    return this.apps.get(id);
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const id = randomUUID();
    const app: App = { 
      id,
      name: insertApp.name,
      iconUrl: insertApp.iconUrl,
      version: insertApp.version ?? null,
      installed: insertApp.installed ?? false,
      isLatest: insertApp.isLatest ?? false,
      createdAt: new Date()
    };
    this.apps.set(id, app);
    return app;
  }

  async updateApp(id: string, updateData: Partial<InsertApp>): Promise<App | undefined> {
    const existingApp = this.apps.get(id);
    if (!existingApp) return undefined;

    const updatedApp: App = { ...existingApp, ...updateData };
    this.apps.set(id, updatedApp);
    return updatedApp;
  }

  async deleteApp(id: string): Promise<boolean> {
    return this.apps.delete(id);
  }
}

export const storage = new MemStorage();
